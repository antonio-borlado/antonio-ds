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
        --_bg: var(--ds-badge-neutral-bg);
        --_fg: var(--ds-badge-neutral-fg);
        display: inline-flex;
        align-items: center;
        gap: var(--ds-space-2xs);
        padding: var(--ds-space-3xs) var(--ds-badge-padding-x);
        border-radius: var(--ds-badge-radius);
        background: var(--_bg);
        color: var(--_fg);
        font-size: var(--ds-typography-size-caption);
        font-weight: var(--ds-font-weight-medium);
        line-height: var(--ds-font-line-height-normal);
        white-space: nowrap;
      }
      :host([variant='accent']) {
        --_bg: var(--ds-badge-accent-bg);
        --_fg: var(--ds-badge-accent-fg);
      }
      :host([variant='success']) {
        --_bg: var(--ds-badge-success-bg);
        --_fg: var(--ds-badge-success-fg);
      }
      :host([variant='warning']) {
        --_bg: var(--ds-badge-warning-bg);
        --_fg: var(--ds-badge-warning-fg);
      }
      :host([variant='danger']) {
        --_bg: var(--ds-badge-danger-bg);
        --_fg: var(--ds-badge-danger-fg);
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
