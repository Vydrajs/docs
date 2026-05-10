import { VydraRoute } from "@vydra-js/router";

export const routes: VydraRoute[] = [
  {
    path: "/",
    title: "Home | Vydra",
    componentTag: "home-page",
    componentLoader: async () => {
      return (await import("../pages/home/home.page")).HomePage as any;
    },
  },
  {
    path: "/guide/:guideName",
    title: "Guide | Vydra",
    componentTag: "guide-page",
    componentLoader: async () => {
      return (await import("../pages/guide/guide.page")).GuidePage as any;
    },
  },
];
