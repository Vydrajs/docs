# Slots

Slots allow you to project HTML content from the outside into your component's template. They are a native Web Component feature that makes components highly reusable and composable.

---

## 1. The Basic Slot

To define a placeholder for external content, simply use the native `<slot>` element.

**Component Definition:**
```typescript
export class CardElement extends LitElement {
  render() {
    return html`
      <div class="card">
        <slot></slot> <!-- External content goes here -->
      </div>
    `;
  }
}
```

**Usage:**
```html
<card-element>
  <p>This paragraph is projected into the card!</p>
</card-element>
```

---

## 2. Named Slots

For more complex components (like modals or advanced layouts), you may want to project content into multiple specific locations. You can achieve this using **named slots**.

**Component Definition:**
```typescript
export class ModalElement extends LitElement {
  render() {
    return html`
      <div class="modal">
        <header>
          <slot name="header"></slot>
        </header>

        <main>
          <!-- Default slot for content without a name -->
          <slot></slot> 
        </main>

        <footer>
          <slot name="footer"></slot>
        </footer>
      </div>
    `;
  }
}
```

**Usage:**
When using the component, use the `slot` attribute to target specific placeholders.

```html
<modal-element>
  <h1 slot="header">Modal Title</h1>
  
  <p>This is the main body content.</p>
  
  <button slot="footer">Close</button>
</modal-element>
```

---

## 3. Fallback Content

You can provide default fallback content inside the `<slot>` tags. This content will be rendered *only* if the user does not provide any projected content.

```typescript
render() {
  return html`
    <slot name="title">
      <h2>Default Title</h2>
    </slot>
  `;
}
```

---

## 4. Styling Slotted Content

Because slotted content physically exists in the Light DOM (outside the component), it inherits global styles.

However, you can style projected content from *inside* the component using the `::slotted()` CSS selector.

```typescript
static styles = css`
  ::slotted(h1) {
    color: var(--primary-color);
    margin-bottom: 1rem;
  }
  
  /* Select any projected element */
  ::slotted(*) {
    font-family: inherit;
  }
`;
```

> [!NOTE]
> **::slotted Limits**
> The `::slotted()` selector only targets top-level elements projected into the slot. It cannot target nested children of those elements.

---

## Learn Next

Let's look at the lifecycle methods available to Lit components.

- [Lifecycle →](/guide/lit-fundamentals_lifecycle)
