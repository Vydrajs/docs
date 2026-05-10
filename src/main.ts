import "@webcomponents/scoped-custom-element-registry";
import { VydraRouter } from "@vydra-js/router";
import { VydraOutlet } from "./app/app.component";
import { routes } from "./app/router/app.router";
import { RootService } from "./app/services/root.bus";
import { Inject } from "@vydra-js/core";
import { i18n } from "@vydra-js/i18n";
import { setBasePath } from "@shoelace-style/shoelace";

setBasePath("/node_modules/@shoelace-style/shoelace/dist");

const rootService = Inject(RootService);
rootService.setConfig({ lang: "en" });
await i18n.load("en");

const mountPoint = document.getElementById("app")!;

if (!customElements.get(VydraOutlet.is)) {
  customElements.define(VydraOutlet.is, VydraOutlet);
}

const outlet = document.createElement(VydraOutlet.is) as any;
mountPoint.appendChild(outlet);

const router = new VydraRouter({
  basePath: "/",
  mountPoint,
  outlet,
  routes,
});
router.init();
