import { html, TemplateResult } from "lit";
import { Inject, VydraOutletBase } from "@vydra-js/core";
import { i18n, I18nAdapter, i18nContext } from "@vydra-js/i18n";
import { provide } from "@lit/context";
import { RootService } from "./services/root.bus";

export class VydraOutlet extends VydraOutletBase {
  static is = "vydra-docs-app-outlet";
  i18nAdapter = new I18nAdapter();
  rootBus = Inject(RootService);
  
  @provide({ context: i18nContext })
  i18n = this.i18nAdapter;

  constructor() {
    super();
    this.rootBus.onSetLangRequested((lang) => {
      this.setLanguage(lang);
    });
  }

  async setLanguage(lang: string) {
    await i18n.load(lang);
    i18n.setLanguage(lang);
  }

  protected override render(): TemplateResult | string {
    if (!this.pageTag) return "";

    if (this.pageTag === "__not_found__") return this.renderNotFound();
    if (this.pageTag === "__forbidden__") return this.renderForbidden();

    return html`${this.renderPage()}`;
  }

  protected renderNotFound(): TemplateResult {
    return html` <div
      style="display:flex;flex-direction:column;align-items:center;padding:4rem;font-family:sans-serif"
    >
      <h1 style="font-size:5rem;margin:0;color:#e5e7eb">404</h1>
      <p style="color:#6b7280">Page not found</p>
    </div>`;
  }

  protected renderForbidden(): TemplateResult {
    return html` <div
      style="display:flex;flex-direction:column;align-items:center;padding:4rem;font-family:sans-serif"
    >
      <h1 style="font-size:5rem;margin:0;color:#e5e7eb">403</h1>
      <p style="color:#6b7280">Access denied</p>
    </div>`;
  }
}
