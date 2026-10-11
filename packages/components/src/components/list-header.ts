import { LitElement, css, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { base } from '../styles.js';
import './icon.js';

export type ListHeaderType = 'default' | 'plain' | 'prominent' | 'section';

/**
 * Header of a <ds-list> (use slot="header"). Mirrors Figma "x / List and Table / Header".
 * @slot - The title
 */
@customElement('ds-list-header')
export class DsListHeader extends LitElement {
  static styles = [
    base,
    css`
      :host {
        display: flex;
        align-items: center;
        gap: var(--ds-space-xs);
        padding: 0 var(--ds-space-md) var(--ds-space-xs);
        color: var(--ds-color-content-secondary);
        font-size: var(--ds-typography-size-caption);
        line-height: var(--ds-font-line-height-normal);
        text-transform: uppercase;
      }
      :host([type='plain']) {
        font-size: var(--ds-typography-size-body);
        font-weight: var(--ds-font-weight-medium);
        text-transform: none;
      }
      :host([type='prominent']) {
        color: var(--ds-color-content-primary);
        font-size: var(--ds-typography-size-h3);
        font-weight: var(--ds-font-weight-medium);
        line-height: var(--ds-font-line-height-snug);
        letter-spacing: var(--ds-font-tracking-heading);
        text-transform: none;
      }
      :host([type='section']) {
        padding: var(--ds-space-lg) 0 0 var(--ds-space-md);
        font-size: var(--ds-typography-size-body);
        font-weight: var(--ds-font-weight-medium);
        text-transform: none;
      }
      :host([type='section']) .title {
        border-bottom: 0.5px solid var(--ds-color-border-default);
        padding-bottom: var(--ds-space-3xs);
      }
      .title {
        flex: 1;
        min-width: 0;
      }
      ds-icon {
        color: var(--ds-color-content-accent);
      }
    `,
  ];

  @property({ reflect: true }) type: ListHeaderType = 'default';
  /** Chevron after the title (Figma "Disclosure" property). */
  @property({ type: Boolean }) disclosure = false;

  connectedCallback() {
    super.connectedCallback();
    if (!this.slot) this.slot = 'header';
  }

  render() {
    return html`<span class="title" role="heading" aria-level="3"><slot></slot></span>${this.disclosure
        ? html`<ds-icon name="chevron-right" size="sm"></ds-icon>`
        : nothing}`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ds-list-header': DsListHeader;
  }
}
