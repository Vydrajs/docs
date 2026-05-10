import { css } from "lit";

export const homePageStyle = css`
  :host {
    /* Nuevas Variables Basadas en el Logo Violeta */
    --vydra-primary: #7b61ff;
    --vydra-primary-hover: #6540f5;
    --vydra-dark: #0f172a;
    --vydra-gradient: linear-gradient(135deg, #7b61ff 0%, #3a208a 100%);
    --container-max: 1200px;
    --color-neutral: var(--sl-color-neutral-200);
    display: block;
    font-family: "Inter", system-ui, sans-serif;
    color: var(--sl-color-neutral-900);
  }

  :host-context(.sl-theme-dark) {
    --vydra-primary: #7b61ff;
    --vydra-primary-hover: #6540f5;
    /* change in dark mode */
    --vydra-dark: #f3f4f6;
    --vydra-gradient: linear-gradient(135deg, #7b61ff 0%, #3a208a 100%);
    --container-max: 1200px;
    --color-neutral: var(--sl-color-neutral-800);

    display: block;
    font-family: "Inter", system-ui, sans-serif;
    color: var(--sl-color-neutral-800);
    --sl-panel-background-color: var(--sl-color-neutral-200);
  }
  .desktop-only {
    display: none !important;
  }
  .mobile-only {
    display: block;
  }

  @media (min-width: 768px) {
    .desktop-only {
      display: flex !important;
    }
    .mobile-only {
      display: none !important;
    }
  }

  /* Navbar Refinado */
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    position: sticky;
    top: 0;
    /* background: rgba(255, 255, 255, 0.85); */
    backdrop-filter: blur(12px);
    z-index: 1000;
    border-bottom: 1px solid var(--color-neutral);
  }

  .navbar-logo-container {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .mobile-menu-icon {
    font-size: 2rem;
    color: var(--sl-color-neutral-800);
  }

  .nav-links {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .nav-divider {
    height: 1.5rem;
  }

  .nav-icon {
    font-size: 1.5rem;
  }

  .sl-theme-dark .navbar {
    border-bottom: 1px solid var(--color-neutral);
  }

  .drawer-nav {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 2rem;
  }

  .drawer-nav-btn {
    text-align: left;
    width: 100%;
    justify-content: flex-start;
  }

  .drawer-nav-btn-primary {
    width: 100%;
  }

  .drawer-nav-icons {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  .drawer-nav-icon {
    font-size: 1.8rem;
  }

  footer {
    background: var(--sl-color-neutral-100);
    color: var(--sl-color-neutral-900);
    padding: 4rem 2rem;
  }

  /* Layout Containers */
  .section-container {
    max-width: var(--container-max);
    margin: 0 auto;
    padding: 4rem 2rem;
  }

  /* Hero Modernizado */
  .hero {
    padding: 2rem 2rem 2rem;
    text-align: center;
    position: relative;
    overflow: hidden;
  }

  /* on desktop add justify-content left for hero */
  @media (min-width: 1200px) {
    .hero {
      padding: 6rem 2rem 6rem;
    }
  }

  .hero::before {
    content: "";
    position: absolute;
    top: -10%;
    left: 50%;
    transform: translateX(-50%);
    width: 600px;
    height: 600px;
    background: radial-gradient(
      circle,
      rgba(123, 97, 255, 0.1) 0%,
      transparent 70%
    );
    z-index: -1;
  }

  .hero-badge {
    margin-bottom: 2rem;
  }

  .hero h1 {
    font-size: clamp(2.4rem, 4vw, 4.4rem);
    font-weight: 800;
    line-height: 1;
    margin-bottom: 1.5rem;
    color: var(--vydra-dark);
    text-align: center;
  }

  /* on desktop add justify-content center for h1 */
  @media (min-width: 1200px) {
    .hero h1 {
      font-size: clamp(3rem, 8vw, 5rem);
    }
  }

  .hero span.gradient {
    background: var(--vydra-gradient);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .hero-description {
    font-size: 1.4rem;
    color: var(--sl-color-neutral-600);
    max-width: 700px;
    margin: 0 auto 3rem;
  }

  .hero-actions {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
  }

  .hero-btn-primary {
    width: 200px;
  }

  .philosophy-section {
    background: var(--sl-color-neutral-50);
    border-radius: 32px;
    margin-bottom: 4rem;
  }

  :host-context(.sl-theme-dark) .philosophy-section {
    background: var(--sl-color-neutral-400);
  }

  .section-header {
    text-align: center;
    max-width: 800px;
    margin: 0 auto 4rem;
  }

  .section-badge {
    margin-bottom: 1rem;
  }

  .section-title {
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
  }

  .section-description {
    font-size: 1.2rem;
    color: var(--sl-color-neutral-600);
    line-height: 1.6;
  }

  /* Features Grid Optimizado */
  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
  }

  .feature-card {
    padding: 1rem;
    border-radius: var(--sl-border-radius-large);
    transition: all 0.3s ease;
    border: 1px solid var(--sl-color-neutral-100);
  }
  /* dark mode */
  :host-context(.sl-theme-dark) .feature-card {
    border: 1px solid var(--sl-color-neutral-600);
  }

  .feature-card-blue {
    border-top: 4px solid #325cff;
  }

  .feature-card-yellow {
    border-top: 4px solid #ffd700;
  }

  .feature-card-green {
    border-top: 4px solid #4caf50;
  }

  .feature-card:hover {
    border-color: var(--vydra-primary);
    box-shadow: 0 20px 25px -5px rgba(123, 97, 255, 0.1);
  }

  .feature-icon {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }

  .feature-icon-blue {
    color: #325cff;
  }

  .feature-icon-yellow {
    color: #ffd700;
  }

  .feature-icon-green {
    color: #4caf50;
  }

  .feature-title {
    margin-top: 0.5rem;
    font-size: 1.3rem;
  }

  .feature-description {
    color: var(--sl-color-neutral-500);
    margin-top: 1rem;
  }

  .features-title {
    text-align: center;
    font-size: 2.5rem;
    margin-bottom: 3rem;
  }

  .word-rotator {
    position: relative;
    display: inline-block;
    min-width: 350px; /* ajusta según el texto */
    height: 1em;
    overflow: hidden;
    vertical-align: bottom;
    text-align: center;
  }

  @media (min-width: 1200px) {
    .word-rotator {
      text-align: left;
      min-width: 650px; /* ajusta según el texto */
    }
  }

  .word-rotator .gradient {
    position: absolute;
    inset: 0;
    opacity: 0;
    animation: rotateWords 9s infinite;
    white-space: nowrap;
  }

  /* palabra 1 */
  .word-rotator .gradient:nth-child(1) {
    animation-delay: 0s;
  }

  /* palabra 2 */
  .word-rotator .gradient:nth-child(2) {
    animation-delay: 3s;
  }

  /* palabra 3 */
  .word-rotator .gradient:nth-child(3) {
    animation-delay: 6s;
  }

  @keyframes rotateWords {
    0% {
      opacity: 0;
      transform: translateY(100%);
    }

    5% {
      opacity: 1;
      transform: translateY(0);
    }

    30% {
      opacity: 1;
      transform: translateY(0);
    }

    35% {
      opacity: 0;
      transform: translateY(-100%);
    }

    100% {
      opacity: 0;
    }
  }
`;
