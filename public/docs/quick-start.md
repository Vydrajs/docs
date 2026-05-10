# Quick Start

The fastest way to get started with Vydra is using our official **Command-Line Interface (CLI)**. The CLI handles the boilerplate, scaffolding, and provides a standardized project structure optimized for performance, scalability, and ease of use.

---

## 1. Installation

First, install the Vydra CLI globally using `npm`. This will give you access to the `vydra` command in your terminal, which you can use to generate and manage applications.

```bash
npm i -g @vydra-js/cli@alpha
```

You can verify the installation by running:
```bash
vydra --version
```

---

## 2. Creating an Application

In Vydra, an "Application" is typically a Single-SPA application that can run on its own or as a microfrontend within a Root App.

To create a new application, use the `new app` command. You can optionally provide a `prefix` that will be used for the basepath when running in microfrontend mode:

```bash
vydra new app <app-name> [prefix]
```

**Example:**
```bash
vydra new app sales-dashboard /sales
```

Then, navigate to the generated directory and install the dependencies using your preferred package manager (e.g., `pnpm`, `npm`, or `yarn`):

```bash
cd sales-dashboard
pnpm i
```

---

## 3. Running the Application

During development, you will often run the application in **standalone mode** (Single-SPA mode) to develop components and features in isolation.

```bash
vydra app serve
```

**Example Output:**

```txt
🚀 Starting development server...

VITE v5.4.21 ready in 1198 ms

➜ Local:   http://localhost:3002/
➜ Network: use --host to expose
➜ press h + enter to show help
```

### Running in Microfrontend Mode

When you are ready to test the application as a microfrontend or prepare it for production orchestration, you can build and preview it:

```bash
vydra app build --mode=mfe
vydra app preview
```

**Example Output:**

```txt
🚀 Starting preview server...

VITE v5.4.21 ready in 1198 ms

➜ Local:   http://localhost:3002/sales
➜ Network: use --host to expose
➜ press h + enter to show help
```

> [!NOTE]
> **Basepaths in MFE Mode**
> In microfrontend mode, the server starts with a basepath (the prefix you provided). This is because in the root orchestrator, each microfrontend lives under its own basepath to avoid URL routing collisions.

---

## 4. Creating a Root App

The **Root App** is the orchestrator that manages multiple microfrontends. It handles the shared layout (like sidebars and top navigation), global navigation, and authentication flows.

To create a new Root App:

```bash
vydra new root <root-name>
```

Navigate to the directory and start the orchestrator:

```bash
cd root-name
pnpm i
vydra root serve
```

The Root App will now serve as the shell, and you can configure it to load your previously created applications based on route definitions.

---

## What's Next?

Now that you have your project running, you might want to learn more about the core modules and how to use them to build powerful features.

[Next: Creating an Application →](/guide/essentials_application)
