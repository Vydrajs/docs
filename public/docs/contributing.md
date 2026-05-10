# Contributing to Vydra

First off, thank you for considering contributing to Vydra! It's people like you that make Vydra a great framework for everyone.

This document provides guidelines and instructions for contributing to the Vydra repository.

---

## Code of Conduct

By participating in this project, you are expected to uphold our Code of Conduct. Please treat all maintainers and contributors with respect. We are committed to providing a welcoming and inspiring community for all.

---

## How Can I Contribute?

### Reporting Bugs
Bugs are tracked as GitHub issues. When creating an issue, please provide:
1. A clear and descriptive title.
2. The version of Vydra and the environment (Browser, Node version, OS).
3. Steps to reproduce the behavior.
4. A code sandbox or minimal repository demonstrating the issue, if possible.

### Suggesting Enhancements
Enhancement suggestions are also tracked as GitHub issues. Please include:
1. A detailed description of the proposed enhancement.
2. The rationale behind the feature (what problem does it solve?).
3. Potential alternatives you have considered.

### Pull Requests
1. **Fork the repo** and create your branch from `main`.
2. **Install dependencies** using `pnpm i`.
3. **Run tests** locally before committing to ensure nothing is broken.
4. **Follow the styleguides** for commit messages and code formatting.
5. **Issue that PR!**

---

## Development Setup

To set up the Vydra project locally:

1. Clone your fork:
   ```bash
   git clone https://github.com/your-username/vydra-js.git
   ```
2. Navigate to the project root and install dependencies:
   ```bash
   cd vydra-js
   pnpm install
   ```
3. The project uses a monorepo structure. You can build all packages using:
   ```bash
   pnpm run build
   ```

---

## Styleguides

### Git Commit Messages
We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification. 

Examples:
- `feat(router): add support for wildcard routes`
- `fix(core): resolve memory leak in component destruction`
- `docs: update quick start guide`

### TypeScript
- Always use strict typing. Avoid `any` whenever possible.
- Prefer `interface` over `type` for public APIs.
- Export all public types and interfaces.

### Web Components
- Ensure all Lit components use proper encapsulation.
- Document public properties and events using JSDoc.

---

Thank you for contributing!
