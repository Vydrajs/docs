import { html, LitElement, css } from "lit";
import { property } from "lit/decorators.js";
import { ScopedElementsMixin } from "@open-wc/scoped-elements/lit-element.js";
import SlIcon from "@shoelace-style/shoelace/dist/components/icon/icon.component.js";
import SlButton from "@shoelace-style/shoelace/dist/components/button/button.component.js";

export class GuideLayout extends ScopedElementsMixin(LitElement) {
  static scopedElements = {
    "sl-icon": SlIcon,
    "sl-button": SlButton,
  };

  @property({ type: String, attribute: "active-page" })
  activePage = "introduction";

  get items() {
    return [
      {
        label: "Introduction",
        page: "introduction",
      },
      {
        label: "Concepts",
        page: "concepts",
      },
      {
        label: "Quick Start",
        page: "quick-start",
      },
    ];
  }

  @property({ type: Object })
  toc: {
    level: number;
    title: string;
    slug: string;
  }[] = [];

  private leftNav = [
    {
      title: "Getting started",
      children: [
        {
          title: "Introduction",
          page: "introduction",
        },
        {
          title: "Concepts",
          page: "concepts",
        },
        {
          title: "Quick Start",
          page: "quick-start",
        },
      ],
    },
    {
      title: "Essentials",
      children: [
        {
          title: "Creating an Application",
          page: "essentials_application",
        },
        {
          title: "Routing",
          page: "essentials_routing",
        },
        {
          title: "DI",
          page: "essentials_di",
        },
        {
          title: "Navigation",
          page: "essentials_navigation",
        },
        {
          title: "i18n",
          page: "essentials_i18n",
        },
      ],
    },
    {
      title: "Lit fundamentals",
      children: [
        {
          title: "Why Lit?",
          page: "lit-fundamentals_why-lit",
        },
        {
          title: "Components",
          page: "lit-fundamentals_components",
        },
        {
          title: "Templates",
          page: "lit-fundamentals_templates",
        },
        {
          title: "Reactivity",
          page: "lit-fundamentals_reactivity",
        },
        {
          title: "Events",
          page: "lit-fundamentals_events",
        },
        {
          title: "Slots",
          page: "lit-fundamentals_slots",
        },
        {
          title: "Lifecycle",
          page: "lit-fundamentals_lifecycle",
        },
      ],
    },
    {
      title: "Advanced",
      children: [
        {
          title: "Best Practices",
          page: "best-practices",
        },
      ],
    },
    {
      title: "Community",
      children: [
        {
          title: "Contributing",
          page: "contributing",
        },
      ],
    },
  ];

  static styles = css`
    :host {
      display: block;
      min-height: 100vh;
      background: var(--sl-color-neutral-0);
      color: var(--sl-color-neutral-900);
      font-family: "Inter", system-ui, sans-serif;
    }

    :host-context(.sl-theme-dark) {
      background: var(--sl-color-neutral-200);
      color: var(--sl-color-neutral-900);
    }

    aside {
      display: none;
    }

    @media (min-width: 1200px) {
      aside {
        display: block;
      }
    }

    .layout-container {
      display: flex;
      max-width: 1400px;
      margin: 0 auto;
      padding: 0 2rem;
    }

    .sidebar {
      padding: 0.5rem;
      box-sizing: border-box;
    }

    /* Root lists */
    .sidebar-list,
    .sidebar-items {
      list-style: none;
      margin: 0;
      padding: 0;
    }

    /* Group */
    .sidebar-group {
      margin-bottom: 1rem;
    }

    .sidebar-group-header {
      padding: 0.5rem 0.75rem;

      font-size: 1rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.04em;

      color: var(--sl-color-neutral-500);
    }

    /* Nested items */
    .sidebar-items {
      margin-left: 0.25rem;
      padding-left: 0.75rem;

      border-left: 1px solid var(--sl-color-neutral-200);
    }

    /* Item */
    .sidebar-item {
      margin-bottom: 0.2rem;
    }

    /* Link */
    .sidebar-link {
      position: relative;

      display: flex;
      align-items: center;
      justify-content: flex-start;

      width: 100%;

      padding: 0.45rem 0.75rem;
      border-radius: 0.5rem;

      box-sizing: border-box;

      color: var(--sl-color-neutral-700);
      text-decoration: none;

      font-size: 0.8rem;
      font-weight: 500;

      transition:
        background 0.2s ease,
        color 0.2s ease;
    }

    /* Hover */
    .sidebar-link:hover {
      background: var(--sl-color-neutral-100);
      color: var(--sl-color-neutral-900);
    }

    /* Active */
    .sidebar-link.active {
      background: var(--sl-color-primary-50);
      color: var(--sl-color-primary-700);
      font-weight: 600;
    }

    /* Optional active indicator */
    .sidebar-link.active::before {
      content: "";

      position: absolute;
      left: -0.8rem;
      top: 50%;

      width: 3px;
      height: 65%;

      border-radius: 999px;

      background: var(--sl-color-primary-500);

      transform: translateY(-50%);
    }

    /* Smaller nested links */
    .sidebar-link.sublink {
      font-size: 0.85rem;
      opacity: 0.85;
    }

    /* Optional title/text wrapper */
    .sidebar-link-text {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .main-content {
      flex: 1;
      min-width: 0;
    }

    @media (min-width: 1200px) {
      .main-content {
        padding: 2rem 2rem 4rem 3rem;
      }
    }

    .right-sidebar {
      width: 200px;
      padding: 2rem 0 2rem 1rem;
      position: sticky;
      top: 70px;
      height: calc(100vh - 70px);
      overflow-y: auto;
      display: none;
    }

    @media (min-width: 1200px) {
      .right-sidebar {
        display: block;
      }
    }

    .right-sidebar-title {
      font-size: 0.85rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--sl-color-neutral-900);
      margin-bottom: 1rem;
    }

    :host-context(.sl-theme-dark) .right-sidebar-title {
      color: var(--sl-color-neutral-800);
    }

    .right-sidebar-link {
      display: block;
      font-size: 0.85rem;
      color: var(--sl-color-neutral-500);
      text-decoration: none;
      padding: 0.3rem 0;
      transition: color 0.2s ease;
    }

    .right-sidebar-link:hover {
      color: var(--sl-color-neutral-900);
    }

    :host-context(.sl-theme-dark) .right-sidebar-link:hover {
      color: var(--sl-color-neutral-900);
    }
  `;

  render() {
    // change to ul li system
    return html` <div class="layout-container">
      <aside>
        <nav class="sidebar" aria-label="Documentation navigation">
          <ul class="sidebar-list">
            ${this.leftNav.map(
              (group) => html`
                <li class="sidebar-group">
                  <div class="sidebar-group-header">${group.title}</div>

                  <ul class="sidebar-items">
                    ${group.children.map(
                      (item) => html`
                        <li class="sidebar-item">
                          <a
                            href="/guide/${item.page}"
                            class="sidebar-link ${this.activePage === item.page
                              ? "active"
                              : ""}"
                          >
                            <span class="sidebar-link-text">
                              ${item.title}
                            </span>

                            ${this.activePage === item.page
                              ? html`
                                  <span class="sidebar-active-indicator"></span>
                                `
                              : null}
                          </a>
                        </li>
                      `,
                    )}
                  </ul>
                </li>
              `,
            )}
          </ul>
        </nav>
      </aside>

      <main class="main-content">
        <slot></slot>
      </main>

      <aside class="right-sidebar">
        <div class="right-sidebar-title">On this page</div>
        <slot name="toc"></slot>
      </aside>
    </div>`;
  }
}
