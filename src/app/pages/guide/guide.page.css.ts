import { css } from "lit";

export const guidePageStyle = css`
  .vydra-code-block,
  .vydra-terminal {
    margin: 1.5rem 0;

    border-radius: 16px;
    overflow: hidden;

    /* border: 1px solid var(--sl-color-neutral-200); */

    background: var(--sl-color-neutral-600);
  }

  :host-context(.sl-theme-dark) .vydra-code-block {
    border: 1px solid var(--sl-color-neutral-200);

    background: var(--sl-color-neutral-100);
  }

  :host-context(.sl-theme-dark) .vydra-terminal {
    border: 1px solid var(--sl-color-neutral-200);

    background: var(--sl-color-neutral-100);
  }
  /* 
    :host-context(.sl-theme-dark) .vydra-code-block,
    :host-context(.sl-theme-dark) .vydra-terminal {
      border-color: var(--sl-color-neutral-800);
    } */

  .vydra-code-header {
    display: flex;
    align-items: center;

    padding: 0.75rem 1rem;

    font-size: 0.8rem;
    font-weight: 600;

    text-transform: lowercase;

    color: #94a3b8;

    background: var(--sl-color-neutral-300);

    border-bottom: 1px solid var(--sl-color-neutral-400);
  }

  /* dark mode */
  :host-context(.sl-theme-dark) .vydra-code-header {
    background: var(--sl-color-neutral-300);
    border-bottom: 1px solid var(--sl-color-neutral-400);
  }

  :host-context(.sl-theme-dark) .vydra-terminal-header {
    border-bottom: 1px solid var(--sl-color-neutral-400);
    background: var(--sl-color-neutral-300);
  }
  /*  */

  .vydra-terminal-header {
    border-bottom: 1px solid var(--sl-color-neutral-300);
    background: var(--sl-color-neutral-300);
  }

  .flex {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }

  .vydra-terminal-dots {
    display: flex;
    gap: 8px;

    padding: 0.85rem 1rem;

    background: var(--sl-color-neutral-300);
  }

  .vydra-terminal-dots span {
    width: 12px;
    height: 12px;

    border-radius: 999px;
  }

  .vydra-terminal-dots span:nth-child(1) {
    background: #ff5f56;
  }

  .vydra-terminal-dots span:nth-child(2) {
    background: #ffbd2e;
  }

  .vydra-terminal-dots span:nth-child(3) {
    background: #27c93f;
  }

  .shiki {
    margin: 0 !important;

    padding: 1.25rem;

    overflow-x: auto;

    background: transparent !important;

    font-size: 0.9rem;
    line-height: 1.7;

    font-family: "Fira Code", monospace;
  }

  .shiki code {
    background: transparent !important;
    padding: 0 !important;
  }

  hr {
    border: none;

    border-top: 1px solid var(--sl-color-neutral-200);

    margin: 3rem 0;
  }

  :host-context(.sl-theme-dark) hr {
    border-top-color: var(--sl-color-neutral-800);
  }

  sl-alert {
    --sl-panel-background-color: var(--sl-color-neutral-50);
    border-radius: 12px;
    box-shadow:
      0 4px 6px -1px rgb(0 0 0 / 0.1),
      0 2px 4px -2px rgb(0 0 0 / 0.1);
  }

  sl-alert::part(base) {
    border-width: 0;
    border-left: 4px solid currentColor;
  }

  sl-alert::part(message) {
    padding: 1rem;
    color: var(--sl-color-neutral-800);
  }

  sl-alert strong {
    font-size: 1.05rem;
    margin-bottom: 0.25rem;
    display: inline-block;
  }

  :host-context(.sl-theme-dark) sl-alert {
    --sl-panel-background-color: var(--sl-color-neutral-300);
    box-shadow:
      0 4px 6px -1px rgb(0 0 0 / 0.5),
      0 2px 4px -2px rgb(0 0 0 / 0.5);
  }

  :host-context(.sl-theme-dark) sl-alert::part(message) {
    color: var(--sl-color-neutral-800);
  }

  .toc {
    padding: 0.5rem;
  }

  .toc-list,
  .toc-sublist {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .toc-item {
    margin-bottom: 0.25rem;
  }

  .toc-sublist {
    margin-left: 1rem;
    padding-left: 0.75rem;
    border-left: 1px solid var(--sl-color-neutral-200);
  }

  .sidebar-link {
    width: 100%;
    justify-content: flex-start;
    border-radius: 0.5rem;
  }

  .sidebar-link::part(base) {
    justify-content: flex-start;
  }

  .sublink {
    font-size: 0.85rem;
    opacity: 0.85;
  }

  .sidebar-link.active {
    background: var(--sl-color-primary-50);
    color: var(--sl-color-primary-700);
    font-weight: 600;
  }

  .vydra-alert {
    margin: 2rem 0;
  }

  .vydra-table-wrapper {
    overflow-x: auto;

    margin: 1.5rem 0;

    border: 1px solid var(--sl-color-neutral-200);
    border-radius: 14px;

    background: var(--sl-color-neutral-0);
  }

  .vydra-table {
    width: 100%;
    border-collapse: collapse;

    font-size: 0.95rem;
  }

  .vydra-table-head {
    background: var(--sl-color-neutral-100);
  }

  .vydra-table-th {
    text-align: left;

    padding: 1rem;

    font-weight: 600;

    color: var(--sl-color-neutral-900);

    border-bottom: 1px solid var(--sl-color-neutral-200);
  }

  .vydra-table-td {
    padding: 1rem;

    border-bottom: 1px solid var(--sl-color-neutral-100);

    color: var(--sl-color-neutral-700);
  }

  .vydra-table-row:last-child .vydra-table-td {
    border-bottom: none;
  }

  .vydra-table code {
    font-size: 0.85rem;

    padding: 0.2rem 0.45rem;

    border-radius: 6px;

    background: var(--sl-color-neutral-100);

    color: var(--sl-color-primary-700);
  }
`;
