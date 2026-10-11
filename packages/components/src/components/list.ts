import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { base } from '../styles.js';

export type ListType = 'default' | 'grouped';

/**
 * List or table of rows. Mirrors Figma "List and Table" (Type=Default/Grouped, Header, Footer).
 * @slot header - A <ds-list-header>
 * @slot - <ds-list-row> elements
 * @slot footer - A <ds-list-footer>
 * @csspart rows - The rows container
 */
@customElement('ds-list')
export class DsList extends LitElement {
  static styles = [
    base,
    css`
      :host {
        display: block;
        padding-block: var(--ds-space-md);
        background: var(--ds-color-bg-canvas);
        color: var(--ds-color-content-primary);
      }
      .rows {
        display: flex;
        flex-direction: column;
        background: var(--ds-color-bg-surface);
      }
      :host([type='grouped']) .rows {
        margin-inline: var(--ds-space-md);
        border-radius: var(--ds-radius-lg);
        overflow: hidden;
      }
    `,
  ];

  @property({ reflect: true }) type: ListType = 'default';

  render() {
    return html`<slot name="header"></slot>
      <div class="rows" part="rows" role="list"><slot></slot></div>
      <slot name="footer"></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ds-list': DsList;
  }
}
