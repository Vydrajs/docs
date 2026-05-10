import { html, LitElement, css } from "lit";
import { property, state } from "lit/decorators.js";
import { ScopedElementsMixin } from "@open-wc/scoped-elements/lit-element.js";

import SlIcon from "@shoelace-style/shoelace/dist/components/icon/icon.component.js";
import SlButton from "@shoelace-style/shoelace/dist/components/button/button.component.js";
import SlDrawer from "@shoelace-style/shoelace/dist/components/drawer/drawer.component.js";

import { appConfig } from "../../../config/app.config";

export class GuideLayout extends ScopedElementsMixin(LitElement) {
  static scopedElements = {
    "sl-icon": SlIcon,
    "sl-button": SlButton,
    "sl-drawer": SlDrawer,
  };

  @property({ type: String, attribute: "active-page" })
  activePage = "introduction";

  @property({ type: Object })
  toc: {
    level: number;
    title: string;
    slug: string;
  }[] = [];

  @state()
  private mobileMenuOpen = false;

  @state()
  private tocOpen = false;

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

    .layout-container {
      display: block;
      max-width: 1400px;
      margin: 0 auto;
      padding: 0 1rem;
      box-sizing: border-box;
    }

    .mobile-header {
      position: sticky;
      top: 0;
      z-index: 20;

      display: flex;
      align-items: center;
      gap: 0.75rem;

      height: 64px;
      padding: 0 1rem;

      background: var(--sl-color-neutral-0);
      border-bottom: 1px solid var(--sl-color-neutral-200);
    }

    :host-context(.sl-theme-dark) .mobile-header {
      background: var(--sl-color-neutral-200);
      border-bottom-color: var(--sl-color-neutral-300);
    }

    .mobile-title {
      font-size: 0.95rem;
      font-weight: 700;
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
      width: 100%;
      max-width: 860px;
      min-width: 0;

      margin: 0 auto;
      padding: 1.5rem 0 4rem;

      box-sizing: border-box;
    }

    .mobile-toc {
      margin-bottom: 1.5rem;

      border: 1px solid var(--sl-color-neutral-200);
      border-radius: 0.75rem;

      overflow: hidden;
    }

    :host-context(.sl-theme-dark) .mobile-toc {
      border-color: var(--sl-color-neutral-300);
    }

    .mobile-toc-button {
      display: flex;
      align-items: center;
      justify-content: space-between;

      width: 100%;

      padding: 0.9rem 1rem;

      border: none;
      background: transparent;

      cursor: pointer;

      font-size: 0.9rem;
      font-weight: 600;

      color: inherit;
    }

    .mobile-toc-content {
      padding: 0 1rem 1rem;
    }

    .desktop-sidebar {
      display: none;
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

    @media (min-width: 1200px) {
      aside {
        display: block;
      }

      .layout-container {
        display: flex;
        padding: 0 2rem;
      }

      .mobile-header,
      .mobile-toc {
        display: none;
      }

      .desktop-sidebar {
        display: block;
      }

      .main-content {
        flex: 1;
        padding: 2rem 2rem 4rem 3rem;
        margin: 0;
      }

      .right-sidebar {
        display: block;
      }
    }
  `;

  private renderSidebar() {
    return html`
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
                          href="${appConfig.basePath}/guide/${item.page}"
                          class="sidebar-link ${this.activePage === item.page
                            ? "active"
                            : ""}"
                          @click=${() => {
                            this.mobileMenuOpen = false;
                          }}
                        >
                          <span class="sidebar-link-text"> ${item.title} </span>

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
    `;
  }

  render() {
    return html`
      <!-- MOBILE HEADER -->
      <header class="mobile-header">
        <sl-button
          size="small"
          circle
          @click=${() => (this.mobileMenuOpen = true)}
        >
          <sl-icon name="list"></sl-icon>
        </sl-button>

        <div class="mobile-title">Documentation</div>
      </header>

      <!-- MOBILE DRAWER -->
      <sl-drawer
        label="Navigation"
        placement="start"
        .open=${this.mobileMenuOpen}
        @sl-after-hide=${() => (this.mobileMenuOpen = false)}
      >
        ${this.renderSidebar()}
      </sl-drawer>

      <div class="layout-container">
        <!-- DESKTOP LEFT SIDEBAR -->
        <aside class="desktop-sidebar">${this.renderSidebar()}</aside>

        <!-- MAIN -->
        <main class="main-content">
          <!-- MOBILE TOC -->
          <div class="mobile-toc">
            <button
              class="mobile-toc-button"
              @click=${() => (this.tocOpen = !this.tocOpen)}
            >
              <span>On this page</span>

              <sl-icon
                name=${this.tocOpen ? "chevron-up" : "chevron-down"}
              ></sl-icon>
            </button>

            ${this.tocOpen
              ? html`
                  <div class="mobile-toc-content">
                    <slot name="toc"></slot>
                  </div>
                `
              : null}
          </div>

          <slot></slot>
        </main>

        <!-- DESKTOP RIGHT SIDEBAR -->
        <aside class="right-sidebar">
          <div class="right-sidebar-title">On this page</div>

          <slot name="toc"></slot>
        </aside>
      </div>
    `;
  }
}
