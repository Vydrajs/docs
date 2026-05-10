# Why Lit?

**Lit** is a lightweight, high-performance library for building fast and reusable Web Components using modern browser APIs. It serves as the foundation for the UI components in the Vydra framework.

Instead of building massive runtime abstractions, Lit provides a very thin wrapper over the native Web Components standard, offering:

- Reactive rendering
- Efficient DOM updates
- Scoped styles via Shadow DOM
- Declarative templates
- Native browser interoperability

Lit is built **on top of the platform** instead of replacing it.

---

## 1. Native Web Components

Lit embraces browser standards rather than proprietary abstractions:
- **Custom Elements** (`customElements.define`)
- **Shadow DOM** (`attachShadow`)
- **ES Modules**
- **HTML Templates** (`<template>`)

This means your components can work across frameworks or without frameworks altogether. A Lit component is simply a standard HTMLElement with superpowers.

---

## 2. Small and Fast

Lit is extremely lightweight compared to many UI frameworks (typically around ~5KB minified and gzipped). 

Because the heavy lifting is done by the browser natively, Lit focuses only on component rendering and reactivity, keeping your bundle sizes exceptionally small.

---

## 3. Simple Mental Model

Building a Lit component is straightforward. You extend a base class, define reactive properties, and provide a `render` method that returns HTML.

```typescript
import { LitElement, html } from "lit";

export class MyElement extends LitElement {
  render() {
    return html`<h1>Hello World</h1>`;
  }
}
```

---

## 4. Reactive Updates

When reactive state changes, Lit updates *only* the necessary DOM parts rather than diffing an entire Virtual DOM.

```typescript
import { LitElement, html } from "lit";
import { property } from "lit/decorators.js";

export class CounterElement extends LitElement {
  @property({ type: Number }) count = 0;

  increment() {
    this.count++;
  }

  render() {
    return html`
      <button @click="${this.increment}">
        Clicked ${this.count} times
      </button>
    `;
  }
}
```

In the example above, only the specific text node containing `${this.count}` is updated when the button is clicked.

---

## 5. Great Developer Experience

Lit provides a fantastic ecosystem for modern web development:
- **TypeScript Support:** Excellent type inference and decorators.
- **Scoped CSS:** Write real CSS using tagged template literals, fully isolated to the component.
- **Declarative Templates:** No JSX required, just standard HTML syntax with embedded expressions.
- **Excellent Performance:** Lit templates are compiled and cached efficiently.

---

## When should you use Lit?

Lit is ideal for:
- **Design Systems:** Build once, use anywhere (React, Vue, Angular, Vanilla).
- **Reusable UI Libraries:** Create agnostic component toolkits.
- **Microfrontends:** Ensuring isolated styles and logic per application.
- **Dashboard Applications:** High-performance, reactive interfaces.

---

## Learn Next

Ready to start writing components? Let's dive into the fundamentals.

- [Components →](/guide/lit-fundamentals_components)
