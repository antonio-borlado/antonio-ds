import { LitElement, css, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { base } from '../styles.js';

/**
 * Footnote of a <ds-list> (use slot="footer"). Mirrors Figma "x / List and Table / Footer".
 * @slot - The description
 */
@customElement('ds-list-footer')
export class DsListFooter extends LitElement {
  static styles = [
    base,
    css`
      :host {
        display: block;
        padding: var(--ds-space-xs) var(--ds-space-md) 0;
        color: var(--ds-color-content-secondary);
        font-size: var(--ds-typography-size-caption);
        line-height: var(--ds-font-line-height-normal);
      }
    `,
  ];

  connectedCallback() {
    super.connectedCallback();
    if (!this.slot) this.slot = 'footer';
  }

  render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ds-list-footer': DsListFooter;
  }
}
