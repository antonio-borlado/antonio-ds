import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { base } from '../styles.js';

export type BadgeVariant = 'neutral' | 'accent' | 'success' | 'warning' | 'danger';

/** @slot - Label */
@customElement('ds-badge')
export class DsBadge extends LitElement {
  static styles = [
    base,
    css`
      :host {
        --_bg: var(--ds-color-bg-subtle);
        --_fg: var(--ds-color-content-secondary);
        display: inline-flex;
        align-items: center;
        gap: var(--ds-space-2xs);
        padding: var(--ds-space-3xs) var(--ds-space-xs);
        border-radius: var(--ds-radius-full);
        background: var(--_bg);
        color: var(--_fg);
        font-size: var(--ds-typography-size-caption);
        font-weight: var(--ds-font-weight-medium);
        line-height: var(--ds-font-line-height-normal);
        white-space: nowrap;
      }
      :host([variant='accent']) {
        --_bg: var(--ds-color-bg-accent-subtle);
        --_fg: var(--ds-color-content-accent);
      }
      :host([variant='success']) {
        --_bg: var(--ds-color-bg-success-subtle);
        --_fg: var(--ds-color-content-success);
      }
      :host([variant='warning']) {
        --_bg: var(--ds-color-bg-warning-subtle);
        --_fg: var(--ds-color-content-warning);
      }
      :host([variant='danger']) {
        --_bg: var(--ds-color-bg-danger-subtle);
        --_fg: var(--ds-color-content-danger);
      }
    `,
  ];

  @property({ reflect: true }) variant: BadgeVariant = 'neutral';

  render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ds-badge': DsBadge;
  }
}
