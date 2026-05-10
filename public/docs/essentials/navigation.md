# Navigation

While declarative routing is handled by the `VydraRouter` component configuration, Vydra provides the `VydraNavigationService` for **programmatic routing** between pages.

The `VydraNavigationService` is deeply integrated with the framework and can be easily injected into any component using the Dependency Injection system.

---

## 1. Injecting the Navigation Service

Use the `Inject()` function to access the navigation service inside your Lit components or other services.

```typescript
import { html, LitElement } from "lit";
import { ScopedElementsMixin } from "@open-wc/scoped-elements/lit-element.js";
import { Inject, VydraNavigationService } from "@vydra-js/core";

export class MyElement extends ScopedElementsMixin(LitElement) {
  // Inject the service
  private navigationService = Inject(VydraNavigationService);

  private goToQuickStart() {
    this.navigationService.navigate("/guide/quick-start");
  }

  render() {
    return html`
      <button @click="${this.goToQuickStart}">
        Navigate to Quick Start
      </button>
    `;
  }
}
```

---

## 2. Navigation with Query Parameters

When you need to pass query parameters during navigation, you must encode them manually using the native `URLSearchParams` API. This ensures URLs are safely encoded.

```typescript
private goToProfile() {
  const params = new URLSearchParams({
    userId: "123",
    tab: "settings"
  }).toString();
  
  this.navigationService.navigate(`/profile?${params}`);
}
```

**Generated URL:**
```txt
/profile?userId=123&tab=settings
```

---

## 3. Reading Route Parameters & Query Strings

Page components automatically receive route properties when rendered by the `VydraOutlet`. These properties update dynamically when the current route or query string changes.

- `params`: An object containing dynamic path segments (e.g., `/user/:id` provides `{ id: "..." }`).
- `queryParams`: An object containing the parsed URL query string parameters.

### Accessing Parameters in a Component

```typescript
import { property } from "lit/decorators.js";
import { html, LitElement } from "lit";
import { ScopedElementsMixin } from "@open-wc/scoped-elements/lit-element.js";

export class UserProfilePage extends ScopedElementsMixin(LitElement) {
  // Define properties to receive route data
  @property({ type: Object }) params: Record<string, string> = {};
  @property({ type: Object }) queryParams: Record<string, string> = {};

  render() {
    return html`
      <h1>User ID: ${this.params.id}</h1>
      <p>Active Tab: ${this.queryParams.tab || 'overview'}</p>
    `;
  }
}
```

---

## 4. Reacting to Route Changes

Because `params` and `queryParams` are standard Lit `@property` fields, you can listen for route updates using Lit's built-in lifecycle hooks.

### `willUpdate()`
Runs before the component renders. Ideal for transforming state synchronously before drawing the UI.

```typescript
willUpdate(changedProperties: Map<string | number | symbol, unknown>) {
  if (changedProperties.has("params")) {
    console.log("New User ID:", this.params.id);
  }
}
```

### `updated()`
Runs after the component has updated and rendered. Ideal for triggering side effects like fetching data from an API based on the new ID.

```typescript
updated(changedProperties: Map<string | number | symbol, unknown>) {
  if (changedProperties.has("params") || changedProperties.has("queryParams")) {
    this.fetchUserData(this.params.id);
  }
}
```

---

## Best Practices

- **Use Programmatic Navigation for Actions:** Use the `VydraNavigationService` for actions triggered by code, such as form submissions, authentication redirects, or dynamic button clicks.
- **Prefer Standard Anchor Tags for Links:** For standard links where the user just clicks to go to another page, prefer standard `<a href="...">` tags. The router automatically intercepts link clicks globally.
- **Safely Encode Queries:** Always use `URLSearchParams` to generate safe query strings to avoid malformed URLs.
- **Fetch Data Reactively:** Instead of fetching data only in `connectedCallback`, fetch data in `updated()` when `params` change, ensuring your component stays synchronized if the user navigates between the same route with different IDs (e.g. from `/user/1` to `/user/2`).
