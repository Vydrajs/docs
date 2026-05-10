# Vydra Documentation Structure

This document outlines the recommended structure for the Vydra documentation. Each page should follow a consistent template to ensure readability and ease of maintenance.

## Recommended Page Structure

- **Guide**
  - [x] Introduction
  - [x] Concepts (Microfrontend, App, Root App)
  - [x] Quick Start
  - [ ] CLI Deep Dive
  - [ ] Configuration
- **Core Modules**
  - [ ] @vydra-js/bus
  - [ ] @vydra-js/core
  - [ ] @vydra-js/router
  - [ ] @vydra-js/forms
  - [ ] @vydra-js/i18n
  - [ ] @vydra-js/http
- **Advanced**
  - [ ] Performance Optimization
  - [ ] Deployment Strategies
  - [ ] Testing Web Components
  - [ ] Custom Mixins

---

## Page Template (Lit + CSS-in-TS)

Use the following template when creating new documentation pages:

```typescript
import { html, LitElement } from "lit";
import { ScopedElementsMixin } from "@open-wc/scoped-elements/lit-element.js";
import { GuideLayout } from "../components/guide-layout";
import { guidePageStyle } from "../guide.css";
import SlDivider from "@shoelace-style/shoelace/dist/components/divider/divider.component.js";
import { MainLayout } from "../../../layouts/main.layout";
import SlButton from "@shoelace-style/shoelace/dist/components/button/button.component.js";

export class NewPage extends ScopedElementsMixin(LitElement) {
  static styles = guidePageStyle;

  static scopedElements = {
    "guide-layout": GuideLayout,
    "sl-divider": SlDivider,
    "main-layout": MainLayout,
    "sl-button": SlButton,
  };

  connectedCallback() {
    super.connectedCallback();
    setTimeout(() => {
      const hash = window.location.hash;
      if (hash) {
        this.scrollToElement(hash.substring(1));
      } else {
        window.scrollTo(0, 0);
      }
    }, 150);
  }

  scrollToElement(id: string) {
    const element = this.shadowRoot?.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
    window.location.hash = id;
  }

  render() {
    return html`
      <main-layout>
        <guide-layout activePath="/guide/your-path">
          <div class="content">
            <h1>Page Title</h1>
            <p>Introduction to the topic.</p>

            <h2 id="section-1">Section 1</h2>
            <p>Detailed explanation.</p>

            <div class="tip-box">
              <div class="tip-box-title">TIP</div>
              <p>Useful tip here.</p>
            </div>

            <sl-divider style="margin: 3rem 0;"></sl-divider>

            <p>Conclusion or transition.</p>
          </div>

          <div slot="toc">
            <sl-button
              size="small"
              variant="text"
              @click="\${() => this.scrollToElement("section-1")}"
              class="right-sidebar-link"
              >Section 1</sl-button
            >
          </div>
        </guide-layout>
      </main-layout>
    `;
  }
}
```

## Styling Guidelines

- Use `guidePageStyle` for consistent typography and spacing.
- Use `.tip-box` for highlights.
- Use `.feature-grid` and `.feature-item` for listing capabilities.
- Keep the Table of Contents (TOC) updated in the `toc` slot.
