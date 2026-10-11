import { css } from 'lit';

/** Shared base for every component: inherits the DS font and exposes a token-driven focus ring. */
export const base = css`
  :host {
    font-family: var(--ds-font-family-body);
    letter-spacing: var(--ds-font-tracking-body);
    box-sizing: border-box;
  }
  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }
  .focus-ring:focus-visible {
    outline: var(--ds-border-width-thick) solid var(--ds-color-focus-ring);
    outline-offset: 2px;
  }
`;
