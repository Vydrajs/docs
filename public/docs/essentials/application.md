# Creating a Vydra Application

Understanding how a Vydra application bootstraps is crucial. Whether you are building a standalone app or a microfrontend, the fundamental concepts remain the same.

---

## The Application Instance

Every Vydra application starts in the root file. This is usually `main.ts` for Single-SPA applications or `bootstrap.ts` for microfrontends. The core responsibility of this entry file is to initialize the **VydraRouter instance** via the `init` function.

```typescript
import { VydraRouter } from "@vydra-js/router";
import { routes } from "./router/app.router";

// Create the router instance
const router = new VydraRouter({
  basePath: "/",
  mountPoint: document.getElementById("app")!,
  outlet: document.createElement("app-outlet"),
  routes,
});

// Initialize the application
router.init();
```

Let's break down each configuration parameter:

### 1. `basePath`

The `basePath` defines the **root path** of the application. All routing within this application will be relative to this base path.

```typescript
const basePath = "/";
```

> [!IMPORTANT]
> **Base Path Context**
> When you deploy a Single-SPA app on the root domain, set the `basePath` to `/`. However, when deployed in a subdirectory or inside another application as a microfrontend, you MUST set the `basePath` to the corresponding prefix (e.g., `/sales`).

### 2. `mountPoint`

The `mountPoint` is a reference to the **HTML element** in the DOM where the application will attach itself. All components will be rendered inside this container.

```typescript
const mountPoint = document.getElementById("app")!;
```

In your `index.html`, it typically looks like this:

```html
<body>
  <div id="app"></div>
</body>
```

### 3. `outlet`

The `outlet` is a special web component that acts as the container for resolving and rendering the matched routes. It extends `VydraOutletBase`.

```typescript
const outlet = document.createElement(VydraOutlet.is) as any;
```

Here is an example of how you define an Outlet component:

```typescript
import { html, TemplateResult } from "lit";
import { VydraOutletBase } from "@vydra-js/core";

export class VydraOutlet extends VydraOutletBase {
  static is = "vydra-app-outlet";

  protected override render(): TemplateResult | string {
    if (!this.pageTag) return "";

    // Handle special internal route states
    if (this.pageTag === "__not_found__") return this.renderNotFound();
    if (this.pageTag === "__forbidden__") return this.renderForbidden();

    // Render the active route component
    return html`${this.renderPage()}`;
  }

  protected renderNotFound(): TemplateResult {
    return html`<h1>404 - Page Not Found</h1>`;
  }

  protected renderForbidden(): TemplateResult {
    return html`<h1>403 - Forbidden</h1>`;
  }
}
```

### 4. `routes`

The `routes` array defines the route configuration for your application. This is typically maintained in a separate file like `src/app/router/app.router.ts`.

```typescript
import { VydraRoute } from "@vydra-js/router";

export const routes: VydraRoute[] = [
  {
    path: "/",
    title: "Home",
    componentTag: "home-page",
    componentLoader: async () => {
      return (await import("../pages/home/home.page")).HomePage;
    },
  },
  {
    path: "/docs",
    title: "Documentation",
    componentTag: "docs-page",
    componentLoader: async () => {
      return (await import("../pages/docs/docs.page")).DocsPage;
    },
  },
];
```

---

## Architectural Considerations

When building an application with Vydra, you should always design with the future in mind. 

If you are creating a standalone SPA, the setup above is sufficient. However, if your long-term goal is to migrate to a **microfrontend architecture**, keep in mind that the `basePath` and routing structure will eventually be orchestrated by a Root App. Ensure your assets, i18n JSON files, and HTTP requests handle dynamic base URLs smoothly.
