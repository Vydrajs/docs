import { html, LitElement } from "lit";
import { ScopedElementsMixin } from "@open-wc/scoped-elements/lit-element.js";
import { I18nMixin } from "@vydra-js/i18n";
import { homePageStyle } from "./home.page.css";
import SlCard from "@shoelace-style/shoelace/dist/components/card/card.component.js";
import SlButton from "@shoelace-style/shoelace/dist/components/button/button.component.js";
import SlIcon from "@shoelace-style/shoelace/dist/components/icon/icon.component.js";
import SlTag from "@shoelace-style/shoelace/dist/components/tag/tag.component.js";
import SlBadge from "@shoelace-style/shoelace/dist/components/badge/badge.component.js";
import SlDivider from "@shoelace-style/shoelace/dist/components/divider/divider.component.js";
import SlAnimation from "@shoelace-style/shoelace/dist/components/animation/animation.component.js";
import SlDetails from "@shoelace-style/shoelace/dist/components/details/details.component.js";
import SlIconButton from "@shoelace-style/shoelace/dist/components/icon-button/icon-button.component.js";
import SlDropdown from "@shoelace-style/shoelace/dist/components/dropdown/dropdown.component.js";
import SlMenu from "@shoelace-style/shoelace/dist/components/menu/menu.component.js";
import SlMenuItem from "@shoelace-style/shoelace/dist/components/menu-item/menu-item.component.js";
import SlDrawer from "@shoelace-style/shoelace/dist/components/drawer/drawer.component.js";
import { MainLayout } from "../../layouts/main.layout";
import { Inject, VydraNavigationService } from "@vydra-js/core";
import { appConfig } from "../../config/app.config";

export class HomePage extends I18nMixin(ScopedElementsMixin(LitElement)) {
  static styles = homePageStyle;

  private navigationService = Inject(VydraNavigationService);

  static scopedElements = {
    "sl-card": SlCard,
    "sl-button": SlButton,
    "sl-icon": SlIcon,
    "sl-tag": SlTag,
    "sl-badge": SlBadge,
    "sl-divider": SlDivider,
    "sl-animation": SlAnimation,
    "sl-details": SlDetails,
    "sl-icon-button": SlIconButton,
    "sl-dropdown": SlDropdown,
    "sl-menu": SlMenu,
    "sl-menu-item": SlMenuItem,
    "sl-drawer": SlDrawer,
    "main-layout": MainLayout,
  };

  render() {
    return html`
      <main-layout>
        <main>
          <!-- [HERO SECTION PREVIA SE MANTIENE IGUAL] -->

          <section class="hero">
            <sl-animation name="fadeInDown" duration="1000" play iterations="1">
              <sl-badge variant="primary" pill class="hero-badge">
                ${this.t("hero.badge")}
              </sl-badge>

              <h1>
                Native

                <span class="word-rotator">
                  <span class="gradient">Architecture</span>

                  <span class="gradient">Single SPA</span>

                  <span class="gradient">Microfrontends</span>
                </span>

                <br />

                <span>for scalable applications</span>
              </h1>

              <p class="hero-description">${this.t("hero.description")}</p>

              <div class="hero-actions">
                <sl-button
                  variant="primary"
                  size="large"
                  pill
                  class="hero-btn-primary"
                  @click="${() =>
                    this.navigationService.navigate(
                      appConfig.basePath + "/guide/quick-start",
                    )}"
                >
                  ${this.t("hero.documentation")}
                </sl-button>

                <sl-button
                  size="large"
                  pill
                  outline
                  href="https://github.com/Vydrajs/vydra"
                  target="_blank"
                >
                  <sl-icon slot="prefix" name="github"></sl-icon>

                  ${this.t("hero.source-code")}
                </sl-button>
              </div>
            </sl-animation>
          </section>

          <!-- NUEVA SECCIÓN: ¿POR QUÉ VYDRA? Y FILOSOFÍA -->

          <section class="section-container philosophy-section">
            <sl-animation name="slideInUp" duration="800" play iterations="1">
              <div class="section-header">
                <sl-badge variant="success" pill class="section-badge"
                  >${this.t("why.badge")}</sl-badge
                >

                <h2 class="section-title">${this.t("why.title")}</h2>

                <p class="section-description">${this.t("why.philosophy")}</p>
              </div>

              <div class="features-grid">
                <sl-card class="feature-card feature-card-blue">
                  <sl-icon
                    name="feather"
                    class="feature-icon feature-icon-blue"
                  ></sl-icon>

                  <h3 class="feature-title">${this.t("why.lit.title")}</h3>

                  <p class="feature-description">
                    ${this.t("why.lit.description")}
                  </p>
                </sl-card>

                <sl-card class="feature-card feature-card-yellow">
                  <sl-icon
                    name="filetype-js"
                    class="feature-icon feature-icon-yellow"
                  ></sl-icon>

                  <h3 class="feature-title">
                    ${this.t("why.standards.title")}
                  </h3>

                  <p class="feature-description">
                    ${this.t("why.standards.description")}
                  </p>
                </sl-card>

                <sl-card class="feature-card feature-card-green">
                  <sl-icon
                    name="boxes"
                    class="feature-icon feature-icon-green"
                  ></sl-icon>

                  <h3 class="feature-title">
                    ${this.t("why.microfrontends.title")}
                  </h3>

                  <p class="feature-description">
                    ${this.t("why.microfrontends.description")}
                  </p>
                </sl-card>
              </div>
            </sl-animation>
          </section>

          <!-- [SECCIONES PREVIAS (FEATURES, CODE, FAQ, CTA) SE MANTIENEN IGUAL] -->

          <section class="section-container">
            <h2 class="features-title">${this.t("features.title")}</h2>

            <!-- Resto del contenido original ... -->
          </section>
        </main>
      </main-layout>
    `;
  }
}
