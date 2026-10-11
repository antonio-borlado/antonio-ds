import { LitElement, css, html } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { base } from '../styles.js';
import './icon.js';

/**
 * Compact pop-up menu showing the current choice. Mirrors Figma "Pop-up Button".
 * Uses a native <select> underneath, so the menu, keyboard and screen readers behave natively.
 * @slot - <option> elements
 * @fires change - When the user picks an option
 */
@customElement('ds-select')
export class DsSelect extends LitElement {
  static formAssociated = true;

  static styles = [
    base,
    css`
      :host {
        position: relative;
        display: inline-flex;
        align-items: center;
        gap: var(--ds-space-2xs);
        color: var(--ds-color-content-accent);
        font-size: var(--ds-typography-size-body);
        line-height: var(--ds-font-line-height-normal);
      }
      select {
        position: absolute;
        inset: 0;
        width: 100%;
        opacity: 0;
        cursor: pointer;
        font: inherit;
      }
      :host(:focus-within) {
        outline: var(--ds-border-width-thick) solid var(--ds-color-focus-ring);
        outline-offset: 2px;
        border-radius: var(--ds-radius-sm);
      }
      :host([disabled]) {
        color: var(--ds-color-content-disabled);
      }
      slot {
        display: none;
      }
    `,
  ];

  @property() value = '';
  @property() name = '';
  /** Accessible name when no visible label is next to it. */
  @property() label = '';
  @property({ type: Boolean, reflect: true }) disabled = false;

  @state() private options: { value: string; label: string }[] = [];
  @query('select') private select!: HTMLSelectElement;
  private internals = this.attachInternals();

  private readOptions() {
    this.options = [...this.querySelectorAll('option')].map((o) => ({ value: o.value, label: o.textContent ?? '' }));
    if (!this.value && this.options.length) this.value = (this.querySelector('option[selected]') as HTMLOptionElement | null)?.value ?? this.options[0].value;
  }

  updated() {
    this.internals.setFormValue(this.value);
    if (this.select && this.select.value !== this.value) this.select.value = this.value;
  }

  private onChange(e: Event) {
    this.value = (e.target as HTMLSelectElement).value;
    this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
  }

  render() {
    const current = this.options.find((o) => o.value === this.value)?.label ?? '';
    return html`<span aria-hidden="true">${current}</span>
      <ds-icon name="chevrons-up-down" size="sm"></ds-icon>
      <select aria-label=${this.label || current} ?disabled=${this.disabled} @change=${this.onChange}>
        ${this.options.map((o) => html`<option value=${o.value} ?selected=${o.value === this.value}>${o.label}</option>`)}
      </select>
      <slot @slotchange=${this.readOptions}></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ds-select': DsSelect;
  }
}
