# Events

Lit uses **standard DOM events**. There is no synthetic event system. If you know how DOM events work in standard JavaScript, you already know how they work in Lit.

---

## 1. Listening to Events

You can attach event listeners directly in your HTML templates using the `@` syntax. 

```typescript
import { LitElement, html } from "lit";
import { property } from "lit/decorators.js";

export class CounterElement extends LitElement {
  @property({ type: Number }) count = 0;

  // Event handler method
  private increment() {
    this.count++;
  }

  render() {
    // Attach the handler using @click
    return html`
      <button @click="${this.increment}">Increment</button>
      <p>Count: ${this.count}</p>
    `;
  }
}
```

Lit automatically binds `this` to the component instance, so you don't have to worry about scope.

---

## 2. Accessing Event Objects

When an event handler is called, it receives the standard standard `Event` object as its first argument.

```typescript
private handleInput(event: InputEvent) {
  // Cast the target to HTMLInputElement to access .value safely
  const input = event.target as HTMLInputElement;
  console.log("User typed:", input.value);
}

render() {
  return html`
    <input type="text" @input="${this.handleInput}" />
  `;
}
```

---

## 3. Dispatching Custom Events

Components often need to communicate with their parent elements. To do this, dispatch a standard `CustomEvent`.

```typescript
private saveUser() {
  const event = new CustomEvent("user-saved", {
    detail: { userId: 123, status: "success" },
  });
  
  this.dispatchEvent(event);
}
```

The parent component can then listen to this custom event exactly the same way it listens to native events:

```html
<user-form @user-saved="${this.onUserSaved}"></user-form>
```

---

## 4. Shadow DOM and Bubbling Events

Because Lit components use Shadow DOM, events dispatched inside a component **do not bubble outside** the shadow boundary by default.

If you want an event to traverse up the DOM tree and cross the Shadow DOM boundary, you must explicitly set `bubbles` and `composed` to `true`.

```typescript
const event = new CustomEvent("global-alert", {
  detail: { message: "Error occurred!" },
  bubbles: true,   // Allows bubbling up the DOM tree
  composed: true,  // Allows crossing the Shadow DOM boundary
});

this.dispatchEvent(event);
```

> [!WARNING]
> **Use Composed Events Sparingly**
> Only use `composed: true` for events that genuinely concern the entire application. Component-specific events (like a dropdown closing or a button click) should remain encapsulated.

---

## Learn Next

Now that we understand how components communicate outwards via events, let's explore how to inject HTML content inwards using slots.

- [Slots →](/guide/lit-fundamentals_slots)
