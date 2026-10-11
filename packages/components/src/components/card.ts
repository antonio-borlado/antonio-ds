import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { base } from '../styles.js';

/**
 * @slot header - Title area
 * @slot - Body
 * @slot footer - Actions
 * @csspart card - The card container
 */
@customElement('ds-card')
export class DsCard extends LitElement {
  static styles = [
    base,
    css`
      :host {
        display: block;
      }
      .card {
        display: flex;
        flex-direction: column;
        gap: var(--ds-space-md);
        padding: var(--ds-space-lg);
        border-radius: var(--ds-radius-container);
        border: var(--ds-border-width-thin) solid var(--ds-color-border-default);
        background: var(--ds-color-bg-surface);
        color: var(--ds-color-content-primary);
      }
      :host([elevated]) .card {
        box-shadow: var(--ds-shadow-sm);
      }
      ::slotted([slot='header']) {
        margin: 0;
        font-size: var(--ds-typography-size-h3);
        line-height: var(--ds-font-line-height-snug);
        font-family: var(--ds-font-family-heading);
        font-weight: var(--ds-font-weight-medium);
        letter-spacing: var(--ds-font-tracking-heading);
      }
      ::slotted([slot='footer']) {
        display: flex;
        gap: var(--ds-space-xs);
        flex-wrap: wrap;
      }
    `,
  ];

  @property({ type: Boolean, reflect: true }) elevated = false;

  render() {
    return html`<div class="card" part="card">
      <slot name="header"></slot>
      <slot></slot>
      <slot name="footer"></slot>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ds-card': DsCard;
  }
}
