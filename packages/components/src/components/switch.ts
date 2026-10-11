import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { base } from '../styles.js';

/**
 * On/off switch. Mirrors Figma "Toggle". Participates in native forms ("on" when checked).
 * @fires change - When toggled by the user
 * @csspart track - The track
 */
@customElement('ds-switch')
export class DsSwitch extends LitElement {
  static formAssociated = true;

  static styles = [
    base,
    css`
      :host {
        display: inline-flex;
        vertical-align: middle;
      }
      button {
        all: unset;
        box-sizing: border-box;
        position: relative;
        width: 52px;
        height: var(--ds-size-32);
        border-radius: var(--ds-radius-full);
        background: var(--ds-color-bg-subtle);
        cursor: pointer;
        transition: background-color var(--ds-duration-normal) ease-out;
      }
      button[aria-checked='true'] {
        background: var(--ds-color-bg-success-default);
      }
      button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
      .thumb {
        position: absolute;
        top: 2px;
        left: 2px;
        width: 28px;
        height: 28px;
        border-radius: var(--ds-radius-full);
        background: var(--ds-color-content-on-accent);
        box-shadow: var(--ds-shadow-sm);
        transition: transform var(--ds-duration-normal) ease-out;
      }
      button[aria-checked='true'] .thumb {
        transform: translateX(20px);
      }
      @media (prefers-reduced-motion: reduce) {
        button,
        .thumb {
          transition: none;
        }
      }
    `,
  ];

  @property({ type: Boolean, reflect: true }) checked = false;
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property() name = '';
  /** Accessible name when there is no visible label next to it. */
  @property() label = '';

  private internals = this.attachInternals();

  updated() {
    this.internals.setFormValue(this.checked ? 'on' : null);
  }

  formResetCallback() {
    this.checked = false;
  }

  private toggle() {
    if (this.disabled) return;
    this.checked = !this.checked;
    this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
  }

  render() {
    return html`<button
      part="track"
      class="focus-ring"
      role="switch"
      aria-checked=${this.checked ? 'true' : 'false'}
      aria-label=${this.label || this.textContent?.trim() || 'Switch'}
      ?disabled=${this.disabled}
      @click=${this.toggle}
    >
      <span class="thumb"></span>
    </button>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ds-switch': DsSwitch;
  }
}
