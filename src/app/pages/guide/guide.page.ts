import { html, LitElement, PropertyValues } from "lit";
import { ScopedElementsMixin } from "@open-wc/scoped-elements/lit-element.js";
import { I18nMixin } from "@vydra-js/i18n";
import { GuideLayout } from "./components/guide-layout";
import { guidePageStyle } from "./guide.page.css";
import SlDivider from "@shoelace-style/shoelace/dist/components/divider/divider.component.js";
import { MainLayout } from "../../layouts/main.layout";
import SlButton from "@shoelace-style/shoelace/dist/components/button/button.component.js";
import { Inject } from "@vydra-js/core";
import { MdService } from "../../services/md.service";
import { property, state } from "lit/decorators.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import SlAlert from "@shoelace-style/shoelace/dist/components/alert/alert.component.js";
import SlIcon from "@shoelace-style/shoelace/dist/components/icon/icon.component.js";
import SlCopyButton from "@shoelace-style/shoelace/dist/components/copy-button/copy-button.component.js";

export class GuidePage extends I18nMixin(ScopedElementsMixin(LitElement)) {
  static styles = guidePageStyle;

  static scopedElements = {
    "guide-layout": GuideLayout,
    "sl-divider": SlDivider,
    "main-layout": MainLayout,
    "sl-button": SlButton,
    "sl-copy-button": SlCopyButton,
    "sl-alert": SlAlert,
    "sl-icon": SlIcon,
  };

  @property({ type: Object })
  private params: {
    guideName: string;
  } = {
    guideName: "",
  };

  private mdService = Inject(MdService);

  @state() private content: string = "";
  @state() private hasInit: boolean = false;
  @state() private toc: any[] = [];
  @state() private routeHash: string = window.location.hash;

  constructor() {
    super();
  }

  loadScrollEvents() {
    const sections = [
      ...this.shadowRoot!.querySelectorAll<HTMLElement>(
        "h1[id], h2[id], h3[id]",
      ),
    ];

    const onScroll = () => {
      let current: HTMLElement | null = null;
      let closest = Number.POSITIVE_INFINITY;

      for (const section of sections) {
        const rect = section.getBoundingClientRect();

        // distancia al top
        const offset = Math.abs(rect.top - 120);

        // solo headings que ya pasaron un poco el top
        if (rect.top <= 120 && offset < closest) {
          closest = offset;
          current = section;
        }
      }

      // fallback al primero
      if (!current) {
        current = sections[0] ?? null;
      }

      if (current) {
        this.routeHash = current.id;
      }
    };

    window.addEventListener("scroll", onScroll);

    onScroll();
  }

  connectedCallback() {
    super.connectedCallback();
    // subscribe to anchor href changes
    document.addEventListener("click", this.handleAnchorClick.bind(this));
    setTimeout(() => {
      if (this.routeHash) {
        this.scrollElementIntoView(window.location.hash);
      }
    }, 500);
  }

  handleAnchorClick(event: Event) {
    const path = event.composedPath();

    const link = path.find((el) => el instanceof HTMLAnchorElement);

    if (!link) return;

    //  if path has hash
    if (link.hash) {
      event.preventDefault();

      this.scrollElementIntoView(link.hash);
      // set hash into url
      history.pushState(null, "", link.hash);
    }
  }

  scrollElementIntoView(hash: string) {
    if (!hash) return;
    const element = this.shadowRoot?.querySelector(hash);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener("click", this.handleAnchorClick.bind(this));
  }

  protected async updated(_changedProperties: PropertyValues) {
    if (_changedProperties.has("params")) {
      if (!this.params?.guideName) {
        this.content = this.mdService.render("# No guide selected").html;
        return;
      }

      const { html, toc } = await this.loadGuide(this.params.guideName);
      this.content = html;
      this.toc = toc;
      await this.updateComplete;
      this.loadScrollEvents();
    }
  }

  private async loadGuide(guideName: string) {
    const file = await fetch(`/docs/${guideName.replace("_", "/")}.md`);

    const markdown = await file.text();
    if (!this.hasInit) {
      await this.mdService.init();
      this.hasInit = true;
    }
    return this.mdService.render(markdown);
  }

  private renderToc() {
    const result: unknown[] = [];

    let currentGroup: any = null;

    for (const item of this.toc) {
      if (item.level === 1 || item.level === 2) {
        currentGroup = {
          ...item,
          children: [],
        };

        result.push(currentGroup);
      } else if (item.level === 3 && currentGroup) {
        currentGroup.children.push(item);
      }
    }

    return html`
      <nav slot="toc" class="toc">
        <ul class="toc-list">
          ${result.map(
            (item: any) => html`
              <li class="toc-item level-${item.level}">
                <sl-button
                  variant="text"
                  size="small"
                  href="#${item.slug}"
                  class="sidebar-link ${this.routeHash === item.slug
                    ? "active"
                    : ""}"
                >
                  ${item.title}
                </sl-button>

                ${item.children?.length
                  ? html`
                      <ul class="toc-sublist">
                        ${item.children.map(
                          (child: any) => html`
                            <li class="toc-subitem">
                              <sl-button
                                variant="text"
                                size="small"
                                href="#${child.slug}"
                                class="sidebar-link sublink ${this.routeHash ===
                                child.slug
                                  ? "active"
                                  : ""}"
                              >
                                ${child.title}
                              </sl-button>
                            </li>
                          `,
                        )}
                      </ul>
                    `
                  : null}
              </li>
            `,
          )}
        </ul>
      </nav>
    `;
  }

  render() {
    return html`<main-layout>
      <guide-layout active-page="${this.params?.guideName || ""}">
        <div class="content">
          ${unsafeHTML(this.content)}<br />
          <sl-button
            variant="text"
            href="https://github.com/Vydrajs/vydra/blob/main/README.md"
            target="_blank"
          >
            <sl-icon
              name="pencil-square"
              style="margin-right: 0.5rem;"
            ></sl-icon>
            Edit this page on GitHub
          </sl-button>
        </div>
        ${this.renderToc()}
      </guide-layout>
    </main-layout>`;
  }
}
