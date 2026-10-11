import { LitElement, css, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { base } from '../styles.js';
import './icon.js';

/**
 * Row of a <ds-list>. Mirrors Figma "x / List and Table / Row" with its Leading and Trailing parts.
 * Interactive rows (with `href` or `interactive`) are focusable and show a hover state.
 * @slot leading - Image, avatar or icon before the text
 * @slot - Extra content under the label (replaces `description`)
 * @slot trailing - Controls after the text (switch, action, detail…)
 * @csspart row - The row
 */
@customElement('ds-list-row')
export class DsListRow extends LitElement {
  static styles = [
    base,
    css`
      :host {
        display: block;
      }
      .row {
        display: flex;
        align-items: center;
        min-height: var(--ds-size-48);
        padding-inline-start: var(--ds-space-md);
        color: inherit;
        text-decoration: none;
        background: var(--ds-color-bg-surface);
        transition: background-color var(--ds-duration-fast) ease-out;
      }
      .interactive {
        cursor: pointer;
      }
      .interactive:hover {
        background: var(--ds-color-bg-subtle);
      }
      .interactive:focus-visible {
        outline: var(--ds-border-width-thick) solid var(--ds-color-focus-ring);
        outline-offset: -2px;
      }
      .leading {
        display: flex;
        align-items: center;
        padding-inline-end: var(--ds-space-sm);
      }
      .leading:not(.filled) {
        display: none;
      }
      /* Inset separator: starts after the leading part, like the Figma Container stroke. */
      .container {
        flex: 1;
        min-width: 0;
        display: flex;
        align-items: center;
        gap: var(--ds-space-xs);
        align-self: stretch;
        border-bottom: 0.5px solid var(--ds-color-border-default);
      }
      :host(:last-of-type) .container,
      :host([no-separator]) .container {
        border-bottom-color: transparent;
      }
      .text {
        flex: 1;
        min-width: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding-block: var(--ds-space-sm);
      }
      .title {
        font-size: var(--ds-typography-size-body);
        line-height: var(--ds-font-line-height-normal);
        color: var(--ds-color-content-primary);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .subtitle {
        font-size: var(--ds-typography-size-small);
        line-height: var(--ds-font-line-height-normal);
        color: var(--ds-color-content-secondary);
      }
      .trailing {
        display: flex;
        align-items: center;
        gap: var(--ds-space-xs);
        padding-inline-end: var(--ds-space-md);
        color: var(--ds-color-content-secondary);
        font-size: var(--ds-typography-size-body);
        white-space: nowrap;
      }
      .chevron {
        color: var(--ds-color-content-disabled);
      }
      @media (prefers-reduced-motion: reduce) {
        .row {
          transition: none;
        }
      }
    `,
  ];

  /** Main text (Figma "Title"). */
  @property() label = '';
  /** Secondary text under the label (Figma "Subtitle"). */
  @property() description = '';
  /** Secondary value shown at the end (Figma Trailing "Label"). */
  @property() detail = '';
  /** Shows a chevron: the row navigates somewhere (Figma Trailing "Disclosure"). */
  @property({ type: Boolean, reflect: true }) disclosure = false;
  /** Makes the row a link. */
  @property() href = '';
  /** Makes the row clickable without being a link (fires `click`). */
  @property({ type: Boolean, reflect: true }) interactive = false;
  @property({ type: Boolean, reflect: true, attribute: 'no-separator' }) noSeparator = false;

  private hasLeading = false;

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'listitem');
  }

  private onLeadingChange(e: Event) {
    this.hasLeading = (e.target as HTMLSlotElement).assignedElements().length > 0;
    this.requestUpdate();
  }

  private onKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this.click();
    }
  }

  private content() {
    return html`
      <span class="leading ${this.hasLeading ? 'filled' : ''}"><slot name="leading" @slotchange=${this.onLeadingChange}></slot></span>
      <span class="container">
        <span class="text">
          <span class="title">${this.label}</span>
          <slot>${this.description ? html`<span class="subtitle">${this.description}</span>` : nothing}</slot>
        </span>
        <span class="trailing">
          ${this.detail ? html`<span>${this.detail}</span>` : nothing}
          <slot name="trailing"></slot>
          ${this.disclosure ? html`<ds-icon class="chevron" name="chevron-right" size="sm"></ds-icon>` : nothing}
        </span>
      </span>
    `;
  }

  render() {
    if (this.href) return html`<a class="row interactive" part="row" href=${this.href}>${this.content()}</a>`;
    if (this.interactive)
      return html`<div class="row interactive" part="row" role="button" tabindex="0" @keydown=${this.onKeydown}>${this.content()}</div>`;
    return html`<div class="row" part="row">${this.content()}</div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ds-list-row': DsListRow;
  }
}
