# Routing

Vydra's router is based on a **declarative configuration** using `VydraRoute` objects. It provides native support for dynamic lazy loading, nested routes, redirects, and asynchronous route guards.

---

## Defining Basic Routes

The simplest way to define routes is by exporting an array of `VydraRoute` objects.

```typescript
import { VydraRoute } from "@vydra-js/router";

export const routes: VydraRoute[] = [
  {
    path: "/",
    componentTag: "home-page",
    componentLoader: async () => {
      const module = await import("../pages/home/home.page");
      return module.HomePage;
    },
  },
];
```

### Core Route Properties

| Property | Type | Description |
|---|---|---|
| `path` | `string` | URL path pattern to match. |
| `componentTag` | `string` | The custom element tag name that will be used to render the component. |
| `componentLoader` | `() => Promise<any>` | A lazy loader function that imports and returns the web component class. |

---

## Lazy Loading

To optimize application performance and minimize the initial bundle size, Vydra heavily relies on **dynamic imports** for component loading.

```typescript
componentLoader: async () => {
  return (await import("../pages/dashboard/dashboard.page")).DashboardPage;
};
```

This guarantees that the JavaScript code for a specific page is only fetched over the network when the user navigates to that route.

---

## Nested Routes

Complex UIs often require nested route structures. You can achieve this by using the `children` property.

```typescript
export const routes: VydraRoute[] = [
  {
    path: "/docs",
    title: "Documentation | Vydra",
    children: [
      {
        path: "/introduction",
        title: "Introduction | Vydra",
        componentTag: "docs-introduction",
        componentLoader: async () => {
          return (await import("../pages/introduction/introduction.page")).IntroductionPage;
        },
      },
      {
        path: "/quick-start",
        title: "Quick Start | Vydra",
        componentTag: "docs-quick-start",
        componentLoader: async () => {
          return (await import("../pages/quick-start/quick-start.page")).QuickStartPage;
        },
      },
    ],
  },
];
```

### Generated URL Paths

Based on the configuration above, the router will resolve the nested paths sequentially:

| Route Configuration | Resulting URL Path |
|---|---|
| `/docs` + `/introduction` | `/docs/introduction` |
| `/docs` + `/quick-start` | `/docs/quick-start` |

---

## Route Metadata

Routes can attach metadata that enhances the application context or modifies the Document Object Model automatically.

### Document Title

If the `title` property is present, Vydra will automatically update the browser's `<title>` tag when the route becomes active.

```typescript
{
  path: "/docs",
  title: "Guide | Vydra",
}
```

---

## Redirects

You can instruct the router to automatically redirect from one path to another using the `redirect` property.

```typescript
export const routes: VydraRoute[] = [
  {
    path: "/",
    redirect: "/docs/introduction",
  },
];
```

Navigating to `/` will instantly redirect the user to `/docs/introduction`, triggering the component load for the target path instead.

---

## Route Guards

**Guards** allow you to control access to routes before they are loaded. They are extremely useful for authentication, authorization, or preventing access based on application state.

A guard is simply an asynchronous function that must return a boolean.

```typescript
const authGuard = async (): Promise<boolean> => {
  const token = localStorage.getItem("auth_token");
  return !!token; // Returns true if authenticated
};

export const routes: VydraRoute[] = [
  {
    path: "/protected",
    componentTag: "protected-page",
    guard: authGuard,
    componentLoader: async () => {
      return (await import("../pages/protected/protected.page")).ProtectedPage;
    },
  },
];
```

### Guard Behavior

| Return Value | Behavior |
|---|---|
| `true` | Allows navigation to proceed. |
| `false` | Blocks navigation. The outlet receives the `__forbidden__` tag. |

> [!TIP]
> **Handle Forbidden Routes**
> When a guard returns `false`, your `VydraOutlet` implementation should catch the `__forbidden__` state and render an appropriate 403 page or trigger a redirect to a login screen.

---

## Best Practices

1. **Always Use Lazy Loading:** Never import page components statically at the top of your router file. Use dynamic `import()` to ensure optimal bundle splitting.
2. **Keep Routes Modular:** If your application grows large, separate your routes into domain-specific files (e.g., `dashboard.routes.ts`, `settings.routes.ts`) and compose them in the main router file.
3. **Use Guards for Security:** Do not rely on hiding UI elements. Always protect sensitive routes using guards.
