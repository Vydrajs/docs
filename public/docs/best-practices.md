# Best Practices

When building applications with Vydra, adhering to best practices ensures your codebase remains maintainable, performant, and scalable across multiple teams.

---

## Architecture & Structure

### 1. Embrace Microfrontends Only When Necessary
Do not split your application into microfrontends prematurely. If a single team manages the entire codebase and it isn't massive, a Single-SPA architecture is sufficient and easier to maintain. Only split when you have distinct teams with independent deployment lifecycles.

### 2. Keep the Root App Dumb
The Root App (Orchestrator) should know as little as possible about the business logic of the microfrontends. Its only responsibilities should be:
- Routing at the basepath level
- Global layout (Header/Sidebar)
- Global authentication state
- Shared Event Bus initialization

### 3. Isolated Dependencies
Whenever possible, avoid sharing dependencies via the Root App. Let Vite handle tree-shaking within each microfrontend's bundle. Sharing dependencies globally can lead to version conflicts and tight coupling.

---

## Component Design

### 1. Smart vs. Dumb Components
Separate your components into two categories:
- **Smart Components (Pages/Views):** These inject services, handle API calls, dispatch global events, and manage complex state.
- **Dumb Components (UI Elements):** These only receive `@property` inputs and emit `CustomEvent` outputs. They should contain no business logic and be highly reusable.

### 2. Use Scoped Elements
To prevent tag name collisions in a microfrontend environment, always use `@open-wc/scoped-elements`. This ensures that `vydra-button` in Team A's app doesn't conflict with `vydra-button` in Team B's app.

### 3. Keep `render()` Pure
Never mutate state or perform DOM queries inside the `render()` method. Lit expects `render()` to be a pure function that returns a template based solely on current properties. If you need side effects, use `updated()` or `willUpdate()`.

---

## State Management & Services

### 1. Use Dependency Injection (DI)
Use Vydra's `@Injectable()` and `Inject()` system for all shared state, API calls, and utility functions. Do not use global variables or massive singleton objects attached to `window`.

### 2. Event Bus Sparingly
The `Bus` is powerful for cross-microfrontend communication, but overusing it leads to "spaghetti events" where it becomes impossible to trace what triggered a state change. 
- Use the Bus for global events (e.g., `user:logout`, `theme:changed`).
- Do not use the Bus for parent-to-child component communication. Use properties and standard `CustomEvent` dispatching instead.

---

## Performance

### 1. Lazy Load Routes
Always use `componentLoader: () => import(...)` in your router configurations. Never statically import a page component at the top of a router file.

### 2. Immutable Data for Reactivity
Lit's reactivity system relies on reference equality checks. Always use immutable data patterns when updating arrays or objects to ensure Lit detects the change and triggers a re-render.

```typescript
// Good
this.users = [...this.users, newUser];

// Bad
this.users.push(newUser);
this.requestUpdate();
```

### 3. Clean up Listeners
If you attach an event listener to `window`, `document`, or a global `Bus` inside a component, you **must** remove it in the `disconnectedCallback()` to prevent memory leaks.
