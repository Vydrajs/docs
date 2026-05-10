# Components

In Lit, components are built by extending the `LitElement` base class. Because Lit is based on Web Components, each component you create is simply a custom HTML element that the browser natively understands.

---

## 1. Creating a Component

To create a component, import `LitElement` and the `html` tag from the `lit` package. Define a class that extends `LitElement` and provide a `render` method.

```typescript
import { LitElement, html } from "lit";

export class MyElement extends LitElement {
  render() {
    return html`
      <h1>Hello world</h1>
      <p>Welcome to my custom component.</p>
    `;
  }
}
```

---

## 2. Registering the Element

Before you can use your component in HTML, you must register it with the browser's `customElements` registry. 

```typescript
customElements.define("my-element", MyElement);
```

> [!TIP]
> **Scoped Elements in Vydra**
> In Vydra, we use `@open-wc/scoped-elements` to scope components specifically to a parent, avoiding global registry collisions. However, understanding standard `customElements.define` is important for foundational knowledge.

---

## 3. Using the Component

Once registered, you can use it just like any standard HTML tag.

```html
<my-element></my-element>
```

---

## 4. Component Structure

A typical Lit component contains a static `styles` property for scoped CSS and a `render` method for the HTML template.

```typescript
import { LitElement, html, css } from "lit";

export class MyElement extends LitElement {
  
  // Define scoped styles
  static styles = css`
    :host {
      display: block;
      padding: 16px;
      background-color: #f4f4f4;
      border-radius: 8px;
    }
    h1 {
      color: #333;
    }
  `;

  // Render the HTML
  render() {
    return html`
      <h1>Styled Component</h1>
    `;
  }
}
```

---

## 5. Naming Conventions

By the W3C specification, all custom element tag names **must contain a dash (`-`)**. This prevents collisions with standard HTML elements.

✅ **Good Examples:**
```txt
my-button
app-layout
user-card
```

❌ **Invalid Examples:**
```txt
button
card
app
```

---

## 6. Shadow DOM Encapsulation

Lit components use **Shadow DOM** by default. This is a critical feature that provides:

- **Style Encapsulation:** CSS written inside `static styles` cannot affect the rest of the page, and external CSS cannot unintentionally style the component's internals.
- **DOM Isolation:** The component's internal HTML structure is hidden from the main document query selectors.
- **Safer Reusable Components:** You can confidently drop the component anywhere without fear of side effects.

---

## Learn Next

Now that you know how to structure a component, let's explore how to write expressive HTML templates.

- [Templates →](/guide/lit-fundamentals_templates)
