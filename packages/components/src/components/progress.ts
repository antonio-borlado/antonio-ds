import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { base } from '../styles.js';

/**
 * Progress bar, continuous or split into segments (e.g. weeks of a program).
 * With `segments` > 0 the track is drawn as that many pills and fills whole segments.
 */
@customElement('ds-progress')
export class DsProgress extends LitElement {
  static styles = [
    base,
    css`
      :host {
        display: block;
      }
      .track {
        display: flex;
        gap: var(--ds-space-2xs);
        height: var(--ds-space-2xs);
      }
      .segment {
        flex: 1 1 0;
        border-radius: var(--ds-radius-full);
        background: var(--ds-color-bg-subtle);
        overflow: hidden;
      }
      .fill {
        height: 100%;
        background: var(--ds-color-bg-accent);
        border-radius: inherit;
      }
      @media (prefers-reduced-motion: no-preference) {
        .fill {
          transition: width 200ms ease-out;
        }
      }
    `,
  ];

  @property({ type: Number }) value = 0;
  @property({ type: Number }) max = 100;
  /** Number of segments; 0 draws a continuous bar. */
  @property({ type: Number }) segments = 0;
  /** What the bar measures, for assistive tech (e.g. "Semana 1 de 10"). */
  @property() label = '';

  render() {
    const max = this.max > 0 ? this.max : 1;
    const ratio = Math.min(Math.max(this.value / max, 0), 1);
    const count = Math.max(Math.floor(this.segments), 1);
    const filled = ratio * count;

    return html`
      <div
        class="track"
        part="track"
        role="progressbar"
        aria-label=${this.label || 'Progreso'}
        aria-valuemin="0"
        aria-valuemax=${max}
        aria-valuenow=${Math.min(Math.max(this.value, 0), max)}
      >
        ${Array.from({ length: count }, (_, i) => {
          const width = Math.min(Math.max(filled - i, 0), 1) * 100;
          return html`<div class="segment"><div class="fill" style="width:${width}%"></div></div>`;
        })}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ds-progress': DsProgress;
  }
}
