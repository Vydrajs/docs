import { Injectable } from "@vydra-js/core";
import MarkdownIt from "markdown-it";
import container from "markdown-it-container";
import GithubSlugger from "github-slugger";
import { createHighlighter } from "shiki";
import { appConfig } from "../config/app.config";

@Injectable()
export class MdService {
  private md!: MarkdownIt;

  async init() {
    const highlighter = await createHighlighter({
      themes: ["github-dark"],
      langs: ["ts", "js", "html", "css", "bash", "json", "txt"],
    });

    this.md = MarkdownIt({
      html: true,
      linkify: true,
      typographer: true,

      highlight(code, lang) {
        try {
          return highlighter.codeToHtml(code, {
            lang: lang || "txt",
            theme: "github-dark",
          });
        } catch {
          return `<pre><code>${code}</code></pre>`;
        }
      },
    });

    this.setupRenderer();
    this.setupTableRenderer();
    this.setupPlugins();
  }

  private setupRenderer() {
    const defaultFence = this.md.renderer.rules.fence!;

    this.md.renderer.rules.fence = (tokens, idx, options, env, self) => {
      const token = tokens[idx];

      const lang = token.info.trim() || "txt";

      const rendered = defaultFence(tokens, idx, options, env, self);

      const isTerminal = lang === "bash" || lang === "sh";

      const escapedCode = atob(
        btoa(unescape(encodeURIComponent(token.content))),
      );

      if (isTerminal) {
        return `
        <div class="vydra-terminal">
          <div class="vydra-terminal-header">
            <div class="flex">
              <div class="vydra-terminal-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>

              <sl-copy-button value="${escapedCode}"></sl-copy-button>
            </div>
          </div>

          ${rendered}
        </div>
      `;
      }

      return `
      <div class="vydra-code-block">
        <div class="vydra-code-header">
          <div class="flex">
            <div>${lang}</div>

          </div>
        </div>

        ${rendered}
      </div>
    `;
    };

    // support internal and external links
    this.md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
      const token = tokens[idx];

      const href = token.attrGet("href") || "#";

      const isExternal = href.startsWith("http");

      return `
      <sl-button
        variant="text"
        href="${appConfig.basePath}${href}"
        ${isExternal ? `target="_blank"` : ""}
      >
    `;
    };

    this.md.renderer.rules.link_close = () => {
      return `</sl-button>`;
    };

    // GitHub Alerts rendering
    this.md.renderer.rules.vydra_alert_open = (tokens, idx) => {
      const type = tokens[idx].meta.type;
      let variant = "primary";
      let icon = "info-circle";
      let title = type.charAt(0).toUpperCase() + type.slice(1).toLowerCase();

      if (type === "WARNING") {
        variant = "warning";
        icon = "exclamation-triangle";
      } else if (type === "CAUTION") {
        variant = "danger";
        icon = "exclamation-octagon";
      } else if (type === "TIP") {
        variant = "success";
        icon = "lightbulb";
      } else if (type === "NOTE") {
        variant = "neutral";
        icon = "info-circle";
      } else if (type === "IMPORTANT") {
        variant = "primary";
        icon = "exclamation-circle";
      }

      return `<div class="vydra-alert"><sl-alert variant="${variant}" open>
  <sl-icon slot="icon" name="${icon}"></sl-icon>
  <strong>${title}</strong><br />`;
    };

    this.md.renderer.rules.vydra_alert_close = () => {
      return `</sl-alert></div>`;
    };
  }

  private setupTableRenderer() {
    const renderer = this.md.renderer.rules;

    renderer.table_open = () => {
      return `
      <div class="vydra-table-wrapper">
        <table class="vydra-table">
    `;
    };

    renderer.table_close = () => {
      return `
        </table>
      </div>
    `;
    };

    renderer.thead_open = () => {
      return `<thead class="vydra-table-head">`;
    };

    renderer.tbody_open = () => {
      return `<tbody class="vydra-table-body">`;
    };

    renderer.tr_open = () => {
      return `<tr class="vydra-table-row">`;
    };

    renderer.th_open = () => {
      return `<th class="vydra-table-th">`;
    };

    renderer.td_open = () => {
      return `<td class="vydra-table-td">`;
    };
  }

  private setupPlugins() {
    // Removed legacy ::tip container, now fully handled by GitHub alerts AST parsing
  }

  render(markdown: string) {
    const slugger = new GithubSlugger();

    const toc: any[] = [];
    const tokens = this.md.parse(markdown, {});

    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];

      // Handle GitHub Alerts: > [!TIP]
      if (token.type === "blockquote_open") {
        const pOpen = tokens[i + 1];
        const inline = tokens[i + 2];
        if (pOpen?.type === "paragraph_open" && inline?.type === "inline") {
          const match = inline.content.match(
            /^\[!(TIP|NOTE|WARNING|CAUTION|IMPORTANT)\]/i,
          );
          if (match) {
            const type = match[1].toUpperCase();
            token.type = "vydra_alert_open";
            token.tag = "sl-alert";
            token.meta = { type };

            // Remove the [!TYPE] text from the inline token
            inline.content = inline.content.replace(/^\[!.*?\]\s*/i, "");
            if (inline.children && inline.children.length > 0) {
              inline.children[0].content = inline.children[0].content.replace(
                /^\[!.*?\]\s*/i,
                "",
              );
            }

            // Find matching blockquote_close
            let level = 1;
            for (let j = i + 1; j < tokens.length; j++) {
              if (tokens[j].type === "blockquote_open") level++;
              if (tokens[j].type === "blockquote_close") {
                level--;
                if (level === 0) {
                  tokens[j].type = "vydra_alert_close";
                  tokens[j].tag = "sl-alert";
                  break;
                }
              }
            }
          }
        }
      }

      if (token.type === "heading_open") {
        const level = Number(token.tag.replace("h", ""));

        const inline = tokens[tokens.indexOf(token) + 1];

        const title = inline.content;

        const slug = slugger.slug(title);

        toc.push({
          level,
          title,
          slug,
        });

        token.attrSet("id", slug);
      }
    }

    return {
      html: this.md.renderer.render(tokens, this.md.options, {}),
      toc,
    };
  }
}
