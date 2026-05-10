# Introduction

Welcome to the **Vydra Framework** documentation!

Vydra is a native web framework designed to create single-spa and microfrontend applications with ease, leveraging the full power of modern web standards. Our mission is to provide a seamless development experience for large-scale enterprise applications where modularity, performance, and scalability are paramount.

---

## What is Vydra?

Vydra is built on top of **Web Components**, **Lit**, and **Vite**. It is designed to scale within large organizations where multiple teams need to work on the same platform without stepping on each other's toes.

By using the browser's native capabilities, we minimize the amount of code shipped to the user and maximize runtime efficiency.

### Core Strengths

One of its core strengths is the use of **scoped elements**, which ensures perfect style and logic isolation between different parts of your application or different microfrontends. This means you can have multiple versions of the same component library running side-by-side without conflicts — a common challenge in microfrontend architectures.

> [!TIP]
> **Architecture First**
> Vydra embraces native browser APIs and modern standards instead of introducing heavy abstractions or custom runtimes.

---

## Core Features

Vydra provides a robust set of core libraries to handle every aspect of modern application development. Each module is designed to be lightweight and tree-shakable, ensuring your application stays fast as it grows.

### Event Bus (`@vydra-js/bus`)
A pub/sub based communication system for seamless interaction between microfrontends and the root orchestrator. It supports scoped events and global message broadcasting.

```typescript
import { Bus } from '@vydra-js/bus';

Bus.emit("user:login", user);
Bus.on("user:login", (user) => console.log(user));
```

### Core Mixins & DI (`@vydra-js/core`)
Essential mixins, utilities, and helpers to speed up the creation of both microfrontend and root applications. It includes lifecycle management and a robust Dependency Injection (DI) system.

```typescript
import { Injectable, Inject } from '@vydra-js/core';

@Injectable()
export class AuthService {
  login() { /* ... */ }
}
```

### Routing (`@vydra-js/router`)
A lightweight, powerful router designed for both single-page navigation and microfrontend orchestration. It handles nested routes, dynamic loading of modules, and route guards.

```typescript
import { Router } from '@vydra-js/router';

Router.register([
  {
    path: "/dashboard",
    componentTag: "dashboard-page",
    componentLoader: () => import("./pages/dashboard"),
  },
]);
```

### Forms (`@vydra-js/forms`)
Reactive forms inspired by Angular, bringing structured and type-safe form management to Web Components with powerful validation support.

```typescript
import { FormGroup, FormControl, Validators } from '@vydra-js/forms';

const form = new FormGroup({
  email: new FormControl("", [Validators.required, Validators.email]),
});
```

### Internationalization (`@vydra-js/i18n`)
Built-in internationalization (i18n) support to manage translations across multiple languages easily. Supports dynamic locale loading and context-based interpolation.

```typescript
// Inside a Lit component
html`<h1>${this.t("home.title")}</h1>`
```

### HTTP Client (`@vydra-js/http`)
Comprehensive HTTP services for API communication with interceptor support and request transformation.

```typescript
import { http } from '@vydra-js/http';

const response = await http.get("/api/users");
```

---

## Native by Design

Unlike traditional frameworks that rely heavily on Virtual DOM abstractions, Vydra focuses on **native browser primitives**.

This allows applications to:
- **Ship smaller bundles:** No heavy runtime required.
- **Reduce runtime overhead:** Direct DOM updates via Lit.
- **Improve startup performance:** Faster time-to-interactive.
- **Avoid framework lock-in:** Standards-based development.
- **Integrate easily:** Interoperable with virtually any frontend ecosystem.

Because Vydra is built around Web Components, your applications remain highly reusable and future-proof.

---

## Microfrontend Ready

Vydra was designed from the beginning for distributed frontend architectures.

Each application can:
- **Run independently** for easier development.
- **Be deployed separately** via separate CI/CD pipelines.
- **Use isolated dependencies** without global pollution.
- **Integrate into a Root App orchestrator** seamlessly.
- **Scale across multiple teams** in enterprise environments.

This architecture is especially useful in enterprise environments where independent teams need to ship features without coupling deployments.

> [!NOTE]
> **Scalability**
> Vydra encourages separation of concerns through independently deployable applications and isolated component scopes.

---

## Next Steps

To fully understand how Vydra works, it's important to grasp the underlying architecture and how microfrontends interact with the root orchestrator.

[Next: Concepts →](/guide/concepts)
