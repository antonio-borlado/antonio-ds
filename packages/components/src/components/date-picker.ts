import { LitElement, css, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { base } from '../styles.js';

export type DatePickerType = 'date' | 'time' | 'datetime';

/**
 * Compact date/time picker: tinted pills that open the platform picker. Mirrors Figma "Date and Time"
 * (Style=Compact, Type=Date and Time / Date / Time). Value is ISO: "2024-05-22", "16:20" or "2024-05-22T16:20".
 * @fires change - When the user picks a new date or time
 */
@customElement('ds-date-picker')
export class DsDatePicker extends LitElement {
  static formAssociated = true;

  static styles = [
    base,
    css`
      :host {
        display: inline-flex;
        gap: var(--ds-space-xs);
      }
      input {
        box-sizing: border-box;
        height: var(--ds-size-32);
        padding: 0 var(--ds-space-sm);
        border: none;
        border-radius: var(--ds-radius-md);
        background: var(--ds-color-bg-subtle);
        color: var(--ds-color-content-accent);
        font: inherit;
        font-size: var(--ds-typography-size-body);
        letter-spacing: inherit;
        color-scheme: inherit;
        cursor: pointer;
      }
      input:focus-visible {
        outline: var(--ds-border-width-thick) solid var(--ds-color-focus-ring);
        outline-offset: 2px;
      }
      input:disabled {
        color: var(--ds-color-content-disabled);
        cursor: not-allowed;
      }
      input::-webkit-calendar-picker-indicator {
        display: none;
      }
    `,
  ];

  @property({ reflect: true }) type: DatePickerType = 'datetime';
  @property() value = '';
  @property() name = '';
  @property() label = '';
  @property({ type: Boolean, reflect: true }) disabled = false;

  private internals = this.attachInternals();

  updated() {
    this.internals.setFormValue(this.value);
  }

  private get date() {
    return this.type === 'time' ? '' : this.value.slice(0, 10);
  }

  private get time() {
    if (this.type === 'date') return '';
    return this.type === 'time' ? this.value : this.value.split('T')[1] ?? '';
  }

  private set(part: 'date' | 'time', v: string) {
    if (this.type === 'datetime') {
      const date = part === 'date' ? v : this.date;
      const time = part === 'time' ? v : this.time;
      this.value = date && time ? `${date}T${time}` : date || (time ? `T${time}` : '');
    } else this.value = v;
    this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
  }

  private open(e: Event) {
    (e.target as HTMLInputElement).showPicker?.();
  }

  render() {
    const name = this.label || 'Fecha';
    return html`${this.type !== 'time'
      ? html`<input type="date" aria-label="${name}: fecha" .value=${this.date} ?disabled=${this.disabled} @click=${this.open}
          @change=${(e: Event) => this.set('date', (e.target as HTMLInputElement).value)} />`
      : nothing}${this.type !== 'date'
      ? html`<input type="time" aria-label="${name}: hora" .value=${this.time} ?disabled=${this.disabled} @click=${this.open}
          @change=${(e: Event) => this.set('time', (e.target as HTMLInputElement).value)} />`
      : nothing}`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ds-date-picker': DsDatePicker;
  }
}
