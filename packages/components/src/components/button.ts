import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { base } from '../styles.js';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

/**
 * @slot - Label
 * @slot start - Leading icon
 * @slot end - Trailing icon
 * @csspart button - The native button
 */
@customElement('ds-button')
export class DsButton extends LitElement {
  static formAssociated = true;

  static styles = [
    base,
    css`
      :host {
        display: inline-flex;
      }
      :host([full-width]) {
        display: flex;
      }
      button {
        --_bg: var(--ds-color-bg-accent);
        --_bg-hover: var(--ds-color-bg-accent-hover);
        --_fg: var(--ds-color-content-on-accent);
        --_border: transparent;
        all: unset;
        box-sizing: border-box;
        flex: 1;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: var(--ds-space-xs);
        height: var(--ds-size-40);
        padding-inline: var(--ds-space-md);
        border-radius: var(--ds-radius-control);
        border: var(--ds-border-width-thin) solid var(--_border);
        background: var(--_bg);
        color: var(--_fg);
        font: inherit;
        font-size: var(--ds-typography-size-body);
        font-weight: var(--ds-font-weight-medium);
        line-height: 1;
        white-space: nowrap;
        cursor: pointer;
        user-select: none;
        transition: background-color var(--ds-duration-fast) ease-out, transform var(--ds-duration-fast) ease-out;
      }
      button:hover:not(:disabled) {
        background: var(--_bg-hover);
      }
      button:active:not(:disabled) {
        transform: scale(0.98);
      }
      button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
      :host([variant='secondary']) button {
        --_bg: var(--ds-color-bg-surface);
        --_bg-hover: var(--ds-color-bg-subtle);
        --_fg: var(--ds-color-content-primary);
        --_border: var(--ds-color-border-strong);
      }
      :host([variant='ghost']) button {
        --_bg: transparent;
        --_bg-hover: var(--ds-color-bg-accent-subtle);
        --_fg: var(--ds-color-content-accent);
      }
      :host([variant='danger']) button {
        --_bg: var(--ds-color-bg-danger-default);
        --_bg-hover: var(--ds-color-bg-danger-hover);
        --_fg: var(--ds-color-content-on-accent);
      }
      :host([size='sm']) button {
        height: var(--ds-size-32);
        padding-inline: var(--ds-space-sm);
        font-size: var(--ds-typography-size-small);
      }
      :host([size='lg']) button {
        height: var(--ds-size-48);
        padding-inline: var(--ds-space-lg);
      }
      @media (prefers-reduced-motion: reduce) {
        button {
          transition: none;
        }
        button:active:not(:disabled) {
          transform: none;
        }
      }
    `,
  ];

  @property({ reflect: true }) variant: ButtonVariant = 'primary';
  @property({ reflect: true }) size: ButtonSize = 'md';
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: Boolean, reflect: true, attribute: 'full-width' }) fullWidth = false;
  @property() type: 'button' | 'submit' | 'reset' = 'button';

  private internals = this.attachInternals();

  private handleClick() {
    const form = this.internals.form;
    if (!form || this.disabled) return;
    if (this.type === 'submit') form.requestSubmit();
    if (this.type === 'reset') form.reset();
  }

  render() {
    return html`<button part="button" class="focus-ring" type="button" ?disabled=${this.disabled} @click=${this.handleClick}>
      <slot name="start"></slot><slot></slot><slot name="end"></slot>
    </button>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ds-button': DsButton;
  }
}
