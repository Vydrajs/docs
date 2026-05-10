# Reactivity

Lit updates the UI automatically when **reactive properties** change. This eliminates the need to manually update the DOM, ensuring your UI always reflects the current application state.

---

## 1. Public Reactive Properties

The most common way to declare a reactive property is using the `@property()` decorator. These properties map to HTML attributes, making them part of the component's public API.

```typescript
import { LitElement, html } from "lit";
import { property } from "lit/decorators.js";

export class CounterElement extends LitElement {
  // Define a reactive property
  @property({ type: Number }) count = 0;

  render() {
    return html`
      <p>Current count: ${this.count}</p>
    `;
  }
}
```

### Passing Properties via Attributes

Because it's a public property, it can be passed via HTML attributes:

```html
<counter-element count="5"></counter-element>
```

---

## 2. Internal Reactive State

Sometimes you have internal state that shouldn't be exposed as an HTML attribute (e.g., loading spinners, temporary form inputs). Use the `@state()` decorator for private reactive state.

```typescript
import { LitElement, html } from "lit";
import { state } from "lit/decorators.js";

export class DataLoader extends LitElement {
  // Private internal state
  @state() private isLoading = false;

  async loadData() {
    this.isLoading = true;
    await fetch("/api/data");
    this.isLoading = false;
  }

  render() {
    return html`
      ${this.isLoading ? html`<p>Loading...</p>` : html`<p>Data loaded!</p>`}
    `;
  }
}
```

---

## 3. The Reactive Update Cycle

When a property changes, Lit batches the updates and schedules an efficient re-render automatically.

The cycle works as follows:
1. **Mutation:** A property (`this.count++`) or state changes.
2. **Detection:** Lit intercepts the setter and marks the component as requiring an update.
3. **Scheduling:** The update is asynchronously scheduled using microtasks.
4. **Rendering:** The `render()` method runs.
5. **DOM Diffing:** Lit updates **only** the DOM nodes that actually changed.

---

## 4. Mutating Objects and Arrays

Lit's reactivity system tracks changes by checking **object references**. If you mutate the internal contents of an array or object, Lit will **not** detect the change.

❌ **Will NOT trigger an update:**
```typescript
this.userList.push(newUser); // Same array reference
this.user.name = "John"; // Same object reference
```

✅ **Correct way (Immutable updates):**
```typescript
this.userList = [...this.userList, newUser]; // New array reference
this.user = { ...this.user, name: "John" }; // New object reference
```

### Manual Updates

If you absolutely must mutate an object directly, you can manually instruct Lit to schedule an update.

```typescript
this.user.name = "John";
this.requestUpdate(); // Forces Lit to re-render
```

---

## Learn Next

Reactivity naturally pairs with handling user interactions.

- [Events →](/guide/lit-fundamentals_events)
