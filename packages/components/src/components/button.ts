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
        --_bg: var(--ds-button-primary-bg);
        --_bg-hover: var(--ds-button-primary-bg-hover);
        --_fg: var(--ds-button-primary-fg);
        --_border: transparent;
        all: unset;
        box-sizing: border-box;
        flex: 1;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: var(--ds-space-xs);
        height: var(--ds-button-height-md);
        padding-inline: var(--ds-button-padding-x-md);
        border-radius: var(--ds-button-radius);
        border: var(--ds-border-width-thin) solid var(--_border);
        background: var(--_bg);
        color: var(--_fg);
        font: inherit;
        font-size: var(--ds-typography-size-body);
        font-weight: var(--ds-button-font-weight);
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
        --_bg: var(--ds-button-secondary-bg);
        --_bg-hover: var(--ds-button-secondary-bg-hover);
        --_fg: var(--ds-button-secondary-fg);
        --_border: var(--ds-button-secondary-border);
      }
      :host([variant='ghost']) button {
        --_bg: var(--ds-button-ghost-bg);
        --_bg-hover: var(--ds-button-ghost-bg-hover);
        --_fg: var(--ds-button-ghost-fg);
      }
      :host([variant='danger']) button {
        --_bg: var(--ds-button-danger-bg);
        --_bg-hover: var(--ds-button-danger-bg-hover);
        --_fg: var(--ds-button-danger-fg);
      }
      :host([size='sm']) button {
        height: var(--ds-button-height-sm);
        padding-inline: var(--ds-button-padding-x-sm);
        font-size: var(--ds-typography-size-small);
      }
      :host([size='lg']) button {
        height: var(--ds-button-height-lg);
        padding-inline: var(--ds-button-padding-x-lg);
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
