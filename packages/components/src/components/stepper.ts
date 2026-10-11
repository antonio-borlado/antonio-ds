import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { base } from '../styles.js';
import './icon.js';

/**
 * Increment/decrement control. Mirrors Figma "Stepper". Participates in native forms.
 * @fires change - When the value changes from a button press
 */
@customElement('ds-stepper')
export class DsStepper extends LitElement {
  static formAssociated = true;

  static styles = [
    base,
    css`
      :host {
        display: inline-flex;
        align-items: center;
        gap: var(--ds-space-sm);
      }
      button {
        all: unset;
        box-sizing: border-box;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: var(--ds-size-32);
        height: var(--ds-size-32);
        padding: var(--ds-space-xs);
        border-radius: var(--ds-radius-full);
        /* Figma uses bg/surface on the canvas; bg/subtle keeps it visible on surface rows too. */
        background: var(--ds-color-bg-subtle);
        color: var(--ds-color-content-primary);
        cursor: pointer;
        transition: background-color var(--ds-duration-fast) ease-out;
      }
      button:hover:not(:disabled) {
        background: var(--ds-color-bg-accent-subtle);
      }
      button:disabled {
        color: var(--ds-color-content-disabled);
        cursor: not-allowed;
      }
      .sr {
        position: absolute;
        width: 1px;
        height: 1px;
        overflow: hidden;
        clip: rect(0 0 0 0);
        white-space: nowrap;
      }
    `,
  ];

  @property({ type: Number }) value = 0;
  @property({ type: Number }) min = Number.NEGATIVE_INFINITY;
  @property({ type: Number }) max = Number.POSITIVE_INFINITY;
  @property({ type: Number }) step = 1;
  @property() name = '';
  /** What is being adjusted, for assistive tech (e.g. "Cantidad"). */
  @property() label = '';
  @property({ type: Boolean, reflect: true }) disabled = false;

  private internals = this.attachInternals();

  updated() {
    this.internals.setFormValue(String(this.value));
  }

  private change(dir: 1 | -1) {
    const next = Math.min(this.max, Math.max(this.min, this.value + dir * this.step));
    if (next === this.value) return;
    this.value = next;
    this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
  }

  render() {
    const name = this.label || 'Valor';
    return html`<div role="group" aria-label=${name} style="display:contents">
      <button class="focus-ring" aria-label="Disminuir ${name}" ?disabled=${this.disabled || this.value <= this.min} @click=${() => this.change(-1)}>
        <ds-icon name="minus" size="md"></ds-icon>
      </button>
      <button class="focus-ring" aria-label="Aumentar ${name}" ?disabled=${this.disabled || this.value >= this.max} @click=${() => this.change(1)}>
        <ds-icon name="plus" size="md"></ds-icon>
      </button>
      <span class="sr" aria-live="polite">${name}: ${this.value}</span>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ds-stepper': DsStepper;
  }
}
