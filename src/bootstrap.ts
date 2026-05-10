import { createMicrofrontendLifecycle, Inject } from "@vydra-js/core";
import { VydraRouter } from "@vydra-js/router";
import { VydraOutlet } from "./app/app.component";
import { routes } from "./app/router/app.router";
import { VydraBus } from "@vydra-js/bus";
import { RootService } from "./app/services/root.bus";
import { appConfig } from "./app/config/app.config";
import { i18n } from "@vydra-js/i18n";

export const lifecycle = createMicrofrontendLifecycle({
  rootTag: VydraOutlet.is,
  rootComponent: VydraOutlet,
  onBootstrap: async () => {},
  onMount: async ({ mountPoint, rootConfig }, outlet) => {
    i18n.setBasePath(appConfig.localesPath);
    const rootService = Inject(RootService);
    rootService.setConfig(rootConfig);
    await i18n.load((rootConfig?.lang as string) || "en");
    mountPoint.appendChild(outlet);
    const router = new VydraRouter({
      basePath: appConfig.basePath,
      mountPoint,
      outlet,
      routes,
      onRedirectMicrofrontend: (nav) => {
        new VydraBus("global").emit("mf:switch-request", nav);
      },
    });
    await router.init();
    return () => router.destroy();
  },
});
