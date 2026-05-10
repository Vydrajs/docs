# Templates

Lit relies on **tagged template literals** to render HTML. Instead of introducing a custom template language like JSX or Vue templates, Lit uses the native JavaScript `html` tag.

Templates are evaluated efficiently, and Lit ensures that only the dynamic parts of the DOM are updated when state changes.

---

## 1. Basic Templates

A template is simply a JavaScript function that returns the `html` tag.

```typescript
import { LitElement, html } from "lit";

export class GreetingElement extends LitElement {
  render() {
    return html`
      <h1>Hello, World!</h1>
      <p>This is a basic template.</p>
    `;
  }
}
```

---

## 2. Dynamic Values

You can embed JavaScript expressions inside your templates using the standard `${}` syntax.

```typescript
export class UserCard extends LitElement {
  @property() title = "Admin User";

  render() {
    return html`
      <h1>${this.title}</h1>
    `;
  }
}
```

---

## 3. Rendering Lists

To render lists, you can simply `map()` over an array of items and return a template for each item. Lit handles the array natively.

```typescript
export class MenuList extends LitElement {
  @property({ type: Array }) items = ["Home", "About", "Contact"];

  render() {
    return html`
      <ul>
        ${this.items.map(item => html`<li>${item}</li>`)}
      </ul>
    `;
  }
}
```

> [!TIP]
> **Performance Optimization**
> For large lists that change frequently, consider using the `repeat` directive provided by Lit to prevent unnecessary re-rendering of DOM nodes.

---

## 4. Conditional Rendering

Because templates are just JavaScript, you can use standard conditional operators like ternaries or `if` statements.

```typescript
export class AuthBanner extends LitElement {
  @property({ type: Boolean }) loggedIn = false;

  render() {
    return html`
      ${this.loggedIn
        ? html`<p>Welcome back!</p>`
        : html`<p>Please login to continue.</p>`
      }
    `;
  }
}
```

---

## 5. Attribute Bindings

To bind a dynamic value to a standard HTML attribute, simply pass the expression inside the template.

```typescript
html`<a href="${this.url}">Click me</a>`
```

### Property Bindings

To set a JavaScript property directly on an element (useful for passing rich data objects like arrays), prefix the attribute name with a dot (`.`).

```typescript
html`<input .value="${this.name}" />`
html`<user-profile .userData="${this.user}"></user-profile>`
```

### Boolean Attributes

Some HTML attributes (like `disabled` or `checked`) are boolean. To bind these properly, prefix the attribute with a question mark (`?`).

```typescript
html`<button ?disabled="${this.isLoading}">Save</button>`
```

---

## 6. Event Listeners

To bind an event listener directly in the template, prefix the event name with an at symbol (`@`).

```typescript
export class Counter extends LitElement {
  private increment() {
    console.log("Clicked!");
  }

  render() {
    return html`
      <button @click="${this.increment}">Increment</button>
    `;
  }
}
```

Lit automatically binds the component's `this` context to the event handler, so you don't need to manually `.bind(this)`.

---

## Learn Next

Templates are just the visual output. Let's see how we can make them react to state changes.

- [Reactivity →](/guide/lit-fundamentals_reactivity)
