import { LitElement, css, html, nothing } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { base } from '../styles.js';

let nextId = 0;

/**
 * Text field with label, hint and error message. Participates in native forms.
 * @fires input - On every keystroke (bubbles from the native input)
 * @fires change - When the value is committed
 * @csspart input - The native input
 */
@customElement('ds-input')
export class DsInput extends LitElement {
  static formAssociated = true;

  static styles = [
    base,
    css`
      :host {
        display: flex;
        flex-direction: column;
        gap: var(--ds-space-2xs);
      }
      label {
        color: var(--ds-input-label);
        font-size: var(--ds-typography-size-small);
        font-weight: var(--ds-font-weight-medium);
      }
      input {
        height: var(--ds-input-height);
        padding-inline: var(--ds-input-padding-x);
        border-radius: var(--ds-input-radius);
        border: var(--ds-border-width-thin) solid var(--ds-input-border);
        background: var(--ds-input-bg);
        color: var(--ds-input-fg);
        font: inherit;
        font-size: var(--ds-typography-size-body);
        outline: none;
        transition: border-color var(--ds-duration-fast) ease-out, box-shadow var(--ds-duration-fast) ease-out;
      }
      input::placeholder {
        color: var(--ds-input-placeholder);
      }
      input:focus-visible {
        border-color: var(--ds-input-border-focus);
        box-shadow: 0 0 0 1px var(--ds-input-border-focus);
      }
      input:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
      input[aria-invalid='true'] {
        border-color: var(--ds-input-error);
      }
      .hint {
        color: var(--ds-input-hint);
        font-size: var(--ds-typography-size-caption);
      }
      .error {
        color: var(--ds-input-error);
        font-size: var(--ds-typography-size-caption);
      }
    `,
  ];

  @property() label = '';
  @property() hint = '';
  @property() error = '';
  @property() value = '';
  @property() placeholder = '';
  @property() name = '';
  @property() type: 'text' | 'email' | 'password' | 'search' | 'tel' | 'url' | 'number' = 'text';
  @property({ type: Boolean }) required = false;
  @property({ type: Boolean, reflect: true }) disabled = false;

  @query('input') private input!: HTMLInputElement;
  private internals = this.attachInternals();
  private fieldId = `ds-input-${nextId++}`;

  updated() {
    this.internals.setFormValue(this.value);
    if (this.error) this.internals.setValidity({ customError: true }, this.error, this.input);
    else if (this.required && !this.value) this.internals.setValidity({ valueMissing: true }, 'Required', this.input);
    else this.internals.setValidity({});
  }

  formResetCallback() {
    this.value = '';
  }

  focus(options?: FocusOptions) {
    this.input?.focus(options);
  }

  private onInput(e: Event) {
    this.value = (e.target as HTMLInputElement).value;
  }

  private onChange() {
    this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
  }

  render() {
    const describedBy = this.error ? `${this.fieldId}-error` : this.hint ? `${this.fieldId}-hint` : undefined;
    return html`
      ${this.label ? html`<label for=${this.fieldId}>${this.label}</label>` : nothing}
      <input
        part="input"
        id=${this.fieldId}
        .value=${this.value}
        type=${this.type}
        name=${this.name || nothing}
        placeholder=${this.placeholder || nothing}
        ?required=${this.required}
        ?disabled=${this.disabled}
        aria-invalid=${this.error ? 'true' : 'false'}
        aria-describedby=${describedBy ?? nothing}
        @input=${this.onInput}
        @change=${this.onChange}
      />
      ${this.error
        ? html`<span class="error" id="${this.fieldId}-error" role="alert">${this.error}</span>`
        : this.hint
          ? html`<span class="hint" id="${this.fieldId}-hint">${this.hint}</span>`
          : nothing}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ds-input': DsInput;
  }
}
