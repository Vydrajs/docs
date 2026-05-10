import { html, LitElement, css } from "lit";
import { property, state, query } from "lit/decorators.js";
import { ScopedElementsMixin } from "@open-wc/scoped-elements/lit-element.js";
import { i18n, I18nMixin } from "@vydra-js/i18n";
import { Inject, VydraNavigationService } from "@vydra-js/core";
import { RootService } from "../services/root.bus";
import SlIcon from "@shoelace-style/shoelace/dist/components/icon/icon.component.js";
import SlButton from "@shoelace-style/shoelace/dist/components/button/button.component.js";
import SlIconButton from "@shoelace-style/shoelace/dist/components/icon-button/icon-button.component.js";
import SlDropdown from "@shoelace-style/shoelace/dist/components/dropdown/dropdown.component.js";
import SlMenu from "@shoelace-style/shoelace/dist/components/menu/menu.component.js";
import SlMenuItem from "@shoelace-style/shoelace/dist/components/menu-item/menu-item.component.js";
import SlMenuLabel from "@shoelace-style/shoelace/dist/components/menu-label/menu-label.component.js";
import SlDrawer from "@shoelace-style/shoelace/dist/components/drawer/drawer.component.js";
import SlDivider from "@shoelace-style/shoelace/dist/components/divider/divider.component.js";
import { appConfig } from "../config/app.config";

export class MainLayout extends I18nMixin(ScopedElementsMixin(LitElement)) {
  static scopedElements = {
    "sl-icon": SlIcon,
    "sl-button": SlButton,
    "sl-icon-button": SlIconButton,
    "sl-dropdown": SlDropdown,
    "sl-menu": SlMenu,
    "sl-menu-item": SlMenuItem,
    "sl-menu-label": SlMenuLabel,
    "sl-drawer": SlDrawer,
    "sl-divider": SlDivider,
  };

  @property({ type: String })
  activePath = "/guide/introduction";

  @state()
  private _isDarkMode = false;

  @state()
  private _language = "es";

  @query(".mobile-drawer")
  private _drawer!: SlDrawer;

  private rootService = Inject(RootService);
  private navigationService = Inject(VydraNavigationService);

  connectedCallback() {
    super.connectedCallback();
    this._isDarkMode = localStorage.getItem("theme") === "dark";
    document.documentElement.classList.toggle(
      "sl-theme-dark",
      this._isDarkMode,
    );
    this._language = i18n.getCurrentLang();
  }

  private _handleThemeToggle() {
    this._isDarkMode = !this._isDarkMode;
    document.documentElement.classList.toggle(
      "sl-theme-dark",
      this._isDarkMode,
    );
    localStorage.setItem("theme", this._isDarkMode ? "dark" : "light");
  }

  private _handleLanguageToggle(e: CustomEvent<{ item: SlMenuItem }>) {
    const { item } = e.detail;
    this._language = item.value || "es";
    this.rootService.setLang(this._language);
  }

  private _openMobileMenu() {
    this._drawer.show();
  }

  private _closeMobileMenu() {
    this._drawer.hide();
  }

  static styles = css`
    :host {
      /* Nuevas Variables Basadas en el Logo Violeta */
      --vydra-primary: #7b61ff;
      --vydra-primary-hover: #6540f5;
      --vydra-dark: #0f172a;
      --vydra-gradient: linear-gradient(135deg, #7b61ff 0%, #3a208a 100%);
      --container-max: 1200px;
      --color-neutral: var(--sl-color-neutral-200);
      display: block;
      font-family: "Inter", system-ui, sans-serif;
      color: var(--sl-color-neutral-900);
    }

    :host-context(.sl-theme-dark) {
      --vydra-primary: #7b61ff;
      --vydra-primary-hover: #6540f5;
      /* change in dark mode */
      --vydra-dark: #f3f4f6;
      --vydra-gradient: linear-gradient(135deg, #7b61ff 0%, #3a208a 100%);
      --container-max: 1200px;
      --color-neutral: var(--sl-color-neutral-800);

      display: block;
      font-family: "Inter", system-ui, sans-serif;
      color: var(--sl-color-neutral-800);
      --sl-panel-background-color: var(--sl-color-neutral-200);
    }
    .desktop-only {
      display: none !important;
    }
    .mobile-only {
      display: block;
    }

    @media (min-width: 768px) {
      .desktop-only {
        display: flex !important;
      }
      .mobile-only {
        display: none !important;
      }
    }

    /* Navbar Refinado */
    .navbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 2rem;
      position: sticky;
      top: 0;
      /* background: rgba(255, 255, 255, 0.85); */
      backdrop-filter: blur(12px);
      z-index: 1000;
      border-bottom: 1px solid var(--color-neutral);
    }

    /*  justify-content: space arround for desktop */
    @media (min-width: 1200px) {
      .navbar {
        justify-content: space-around;
      }
    }

    .navbar-logo-container {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .mobile-menu-icon {
      font-size: 2rem;
      color: var(--sl-color-neutral-800);
    }

    .nav-links {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .nav-divider {
      height: 1.5rem;
    }

    .nav-icon {
      font-size: 1.5rem;
    }
    /* dark mode */
    :host-context(.sl-theme-dark) .navbar {
      border-bottom: 1px solid var(--sl-color-neutral-400);
    }

    .drawer-nav {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin-top: 2rem;
    }

    .drawer-nav-btn {
      text-align: left;
      width: 100%;
      justify-content: flex-start;
    }

    .drawer-nav-btn-primary {
      width: 100%;
    }

    .drawer-nav-icons {
      display: flex;
      justify-content: space-around;
      align-items: center;
    }

    .drawer-nav-icon {
      font-size: 1.8rem;
    }

    footer {
      background: var(--sl-color-neutral-100);
      color: var(--sl-color-neutral-900);
      padding: 4rem 2rem;
    }

    /* Layout Containers */
    .section-container {
      max-width: var(--container-max);
      margin: 0 auto;
      padding: 4rem 2rem;
    }

    .footer {
      margin-top: 5rem;
      border-top: 1px solid var(--color-neutral);
      background: var(--sl-color-neutral-50);
    }

    :host-context(.sl-theme-dark) .footer {
      background: var(--sl-color-neutral-100);
      border-top: 1px solid var(--sl-color-neutral-300);
    }

    .footer-container {
      max-width: var(--container-max);
      margin: 0 auto;
      padding: 4rem 2rem 2rem;
    }

    .footer-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 3rem;
    }

    @media (min-width: 768px) {
      .footer-grid {
        grid-template-columns: 1.5fr 1fr 1fr 1fr;
      }
    }

    .footer-brand {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .footer-brand-top {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .footer-description {
      line-height: 1.7;
      color: var(--sl-color-neutral-600);
      max-width: 320px;
      font-size: 0.95rem;
    }

    :host-context(.sl-theme-dark) .footer-description {
      color: var(--sl-color-neutral-500);
    }

    .footer-title {
      font-size: 0.95rem;
      font-weight: 700;
      margin-bottom: 1rem;
      color: var(--sl-color-neutral-900);
    }

    :host-context(.sl-theme-dark) .footer-title {
      color: var(--sl-color-neutral-800);
    }

    .footer-links {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .footer-link {
      background: none;
      border: none;
      padding: 0;
      margin: 0;
      text-align: left;
      cursor: pointer;

      color: var(--sl-color-neutral-600);
      font: inherit;

      transition:
        color 0.2s ease,
        transform 0.2s ease;
    }

    .footer-link:hover {
      color: var(--vydra-primary);
      transform: translateX(2px);
    }

    :host-context(.sl-theme-dark) .footer-link {
      color: var(--sl-color-neutral-500);
    }

    .footer-bottom {
      margin-top: 3rem;
      padding-top: 1.5rem;
      border-top: 1px solid var(--color-neutral);

      display: flex;
      flex-direction: column;
      gap: 1rem;
      align-items: center;
      justify-content: space-between;
    }

    @media (min-width: 768px) {
      .footer-bottom {
        flex-direction: row;
      }
    }

    .footer-copy {
      font-size: 0.9rem;
      color: var(--sl-color-neutral-500);
    }

    .footer-socials {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .footer-social-icon {
      font-size: 1.25rem;
    }

    sl-button[variant="text"]::part(label) {
      padding-left: 0;
    }
  `;

  private _goToGuide(name: string) {
    this.navigationService.navigate(`/guide/${name}`);
  }

  private _goToHome() {
    this.navigationService.navigate("/");
  }

  render() {
    const basePath = appConfig.basePath;
    return html`
      <nav class="navbar">
        <div class="navbar-logo-container">
          <img
            @click="${this._goToHome}"
            src="${basePath}/assets/img/vydra.png"
            alt="Logo"
            width="30"
            height="30"
          />

          <img
            @click="${this._goToHome}"
            src="${basePath}/assets/img/vydra-name.png"
            alt="Logo"
            height="30"
            class="desktop-only"
          />
        </div>

        <!-- Botón Hamburguesa (Mobile) -->

        <sl-icon-button
          name="list"
          class="mobile-only mobile-menu-icon"
          @click="${this._openMobileMenu}"
        ></sl-icon-button>

        <!-- Enlaces de Navegación (Desktop) -->

        <div class="nav-links desktop-only">
          <sl-dropdown>
            <sl-button variant="text" slot="trigger" caret
              >${this.t("nav.docs")}</sl-button
            >
            <sl-menu>
              <sl-menu-item @click="${() => this._goToGuide("introduction")}"
                >Introduction</sl-menu-item
              >
              <sl-menu-item @click="${() => this._goToGuide("quick-start")}"
                >Quick Start</sl-menu-item
              >
              <sl-menu-item @click="${() => this._goToGuide("concepts")}"
                >Concepts</sl-menu-item
              >
            </sl-menu>
          </sl-dropdown>

          <sl-divider vertical class="nav-divider"></sl-divider>

          <sl-icon-button
            name="${this._isDarkMode ? "brightness-high" : "moon"}"
            class="nav-icon"
            @click="${this._handleThemeToggle}"
          ></sl-icon-button>

          <sl-dropdown>
            <sl-icon-button
              slot="trigger"
              caret
              name="translate"
              class="nav-icon"
            ></sl-icon-button>

            <sl-menu @sl-select="${this._handleLanguageToggle}">
              <sl-menu-item
                ?checked=${this._language === "es"}
                value="es"
                type="checkbox"
                ?disabled=${this._language === "es"}
                >${this.t("lang.es")}</sl-menu-item
              >

              <sl-menu-item
                ?checked=${this._language === "en"}
                value="en"
                type="checkbox"
                ?disabled=${this._language === "en"}
                >${this.t("lang.en")}</sl-menu-item
              >
            </sl-menu>
          </sl-dropdown>

          <sl-icon-button
            name="github"
            class="nav-icon"
            href="https://github.com/Vydrajs"
            target="_blank"
          ></sl-icon-button>
          <sl-icon-button
            name="twitter-x"
            class="nav-icon"
            href="https://x.com/jsvydra"
            target="_blank"
          ></sl-icon-button>
        </div>
      </nav>

      <!-- Drawer Menú (Mobile) -->

      <sl-drawer label="Menú" class="mobile-drawer" placement="start">
        <div class="drawer-nav">
          <sl-menu>
            <sl-menu-label>${this.t("nav.docs")}</sl-menu-label>

            <sl-menu-item @click="${() => this._goToGuide("introduction")}"
              >Introduction</sl-menu-item
            >
            <sl-menu-item @click="${() => this._goToGuide("quick-start")}"
              >Quick Start</sl-menu-item
            >
            <sl-menu-item @click="${() => this._goToGuide("concepts")}"
              >Concepts</sl-menu-item
            >
          </sl-menu>

          <sl-divider></sl-divider>

          <div class="drawer-nav-icons">
            <sl-icon-button
              name="${this._isDarkMode ? "brightness-high" : "moon"}"
              class="drawer-nav-icon"
              @click="${this._handleThemeToggle}"
            ></sl-icon-button>

            <sl-dropdown>
              <sl-icon-button
                slot="trigger"
                caret
                name="translate"
                class="nav-icon"
              ></sl-icon-button>

              <sl-menu @sl-select="${this._handleLanguageToggle}">
                <sl-menu-item
                  ?checked=${this._language === "es"}
                  value="es"
                  type="checkbox"
                  ?disabled=${this._language === "es"}
                  >${this.t("lang.es")}</sl-menu-item
                >

                <sl-menu-item
                  ?checked=${this._language === "en"}
                  value="en"
                  type="checkbox"
                  ?disabled=${this._language === "en"}
                  >${this.t("lang.en")}</sl-menu-item
                >
              </sl-menu>
            </sl-dropdown>

            <sl-icon-button
              name="github"
              class="drawer-nav-icon"
              href="https://github.com/Vydrajs"
              target="_blank"
            ></sl-icon-button>
          </div>
        </div>
      </sl-drawer>

      <main class="main-content">
        <slot></slot>
      </main>

      <footer class="footer">
        <div class="footer-container">
          <div class="footer-grid">
            <!-- Brand -->

            <div class="footer-brand">
              <div class="footer-brand-top">
                <img
                  src="${basePath}/assets/img/vydra.png"
                  alt="Vydra Logo"
                  width="36"
                  height="36"
                />

                <img
                  src="${basePath}/assets/img/vydra-name.png"
                  alt="Vydra"
                  height="28"
                />
              </div>

              <p class="footer-description">
                A modern frontend framework powered by Lit, focused on
                simplicity, performance and scalable architecture for modern web
                applications.
              </p>
            </div>

            <!-- Docs -->

            <div>
              <div class="footer-title">Docs</div>

              <div class="footer-links">
                <button
                  class="footer-link"
                  @click="${() => this._goToGuide("introduction")}"
                >
                  Introduction
                </button>

                <button
                  class="footer-link"
                  @click="${() => this._goToGuide("quick-start")}"
                >
                  Quick Start
                </button>

                <button
                  class="footer-link"
                  @click="${() => this._goToGuide("concepts")}"
                >
                  Concepts
                </button>
              </div>
            </div>

            <!-- About -->

            <div>
              <div class="footer-title">About</div>

              <div class="footer-links">
                <button class="footer-link">FAQ</button>

                <button class="footer-link">Community Guide</button>

                <button class="footer-link">Code of Conduct</button>
              </div>
            </div>

            <!-- Help -->

            <div>
              <div class="footer-title">Help</div>

              <div class="footer-links">
                <a
                  class="footer-link"
                  href="https://github.com/Vydrajs"
                  target="_blank"
                >
                  GitHub
                </a>

                <a
                  class="footer-link"
                  href="https://x.com/jsvydra"
                  target="_blank"
                >
                  Twitter X
                </a>
              </div>
            </div>
          </div>

          <div class="footer-bottom">
            <div class="footer-copy">
              © ${new Date().getFullYear()} Vydra. All rights reserved. Released
              under the
              <sl-button
                variant="text"
                size="small"
                href="https://opensource.org/license/MIT"
                target="_blank"
                >MIT License</sl-button
              >.
            </div>

            <div class="footer-socials">
              <sl-icon-button
                name="github"
                class="footer-social-icon"
                href="https://github.com/Vydrajs"
                target="_blank"
              ></sl-icon-button>

              <sl-icon-button
                name="twitter-x"
                class="footer-social-icon"
                href="https://x.com/jsvydra"
                target="_blank"
              ></sl-icon-button>
            </div>
          </div>
        </div>
      </footer>
    `;
  }
}
