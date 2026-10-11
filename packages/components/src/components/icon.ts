import { LitElement, css, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';
import { DEFAULT_ICON_SET, getIconSet, onIconSetRegistered } from '../icons/registry.js';
import type { IconName, IconSet } from '../icons/generated/names.js';

export type IconSize = 'sm' | 'md' | 'lg' | 'inherit';

// One observer for every icon: re-render when a page or subtree switches brand or icon library.
const live = new Set<DsIcon>();
let observer: MutationObserver | undefined;
const refreshAll = () => live.forEach((icon) => icon.requestUpdate());
const warned = new Set<string>();
const warnOnce = (msg: string) => {
  if (warned.has(msg)) return;
  warned.add(msg);
  console.warn(`[ds-icon] ${msg}`);
};

/**
 * Icon from the active library. Library resolution, first match wins:
 * `set` attribute → nearest `data-icon-set` ancestor (crosses shadow roots) → brand token `--ds-icon-set` → lucide.
 * Without `label` the icon is decorative (hidden from assistive tech).
 */
@customElement('ds-icon')
export class DsIcon extends LitElement {
  static styles = css`
    :host {
      --_size: var(--ds-size-20);
      display: inline-flex;
      flex: none;
      width: var(--_size);
      height: var(--_size);
      color: inherit;
      vertical-align: middle;
    }
    :host([size='sm']) {
      --_size: var(--ds-size-16);
    }
    :host([size='lg']) {
      --_size: var(--ds-size-24);
    }
    :host([size='inherit']) {
      --_size: 1.25em;
    }
    svg {
      width: 100%;
      height: 100%;
      display: block;
    }
  `;

  @property({ reflect: true }) name: IconName | (string & {}) = '';
  /** Force a library for this icon only. */
  @property({ reflect: true }) set?: IconSet | (string & {});
  @property({ reflect: true }) size: IconSize = 'md';
  /** Accessible name; when set the icon is announced as an image. */
  @property() label = '';

  connectedCallback() {
    super.connectedCallback();
    live.add(this);
    if (!observer && typeof MutationObserver !== 'undefined') {
      observer = new MutationObserver(refreshAll);
      observer.observe(document.documentElement, { subtree: true, attributes: true, attributeFilter: ['data-icon-set', 'data-brand'] });
      onIconSetRegistered(refreshAll);
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    live.delete(this);
  }

  /** The library this icon renders with, after applying the resolution order. */
  get activeSet(): string {
    if (this.set) return this.set;
    let node: Node | null = this;
    while (node) {
      if (node instanceof Element && node.hasAttribute('data-icon-set')) return node.getAttribute('data-icon-set')!;
      node = (node as Element).parentElement ?? ((node.getRootNode() as ShadowRoot).host || null);
    }
    return getComputedStyle(this).getPropertyValue('--ds-icon-set').trim() || DEFAULT_ICON_SET;
  }

  updated() {
    if (this.label) {
      this.setAttribute('role', 'img');
      this.setAttribute('aria-label', this.label);
      this.removeAttribute('aria-hidden');
    } else {
      this.removeAttribute('role');
      this.removeAttribute('aria-label');
      this.setAttribute('aria-hidden', 'true');
    }
  }

  render() {
    if (!this.name) return nothing;
    const wanted = this.activeSet;
    let data = getIconSet(wanted);
    if (!data) {
      warnOnce(`Icon set "${wanted}" is not loaded; falling back to "${DEFAULT_ICON_SET}". Load @antonio-ds/components/icons/${wanted}.`);
      data = getIconSet(DEFAULT_ICON_SET);
    }
    const shapes = data?.icons[this.name];
    if (!data || shapes === undefined) {
      warnOnce(`Unknown icon "${this.name}".`);
      return nothing;
    }
    return html`${unsafeSVG(`<svg xmlns="http://www.w3.org/2000/svg" ${data.attrs} aria-hidden="true" focusable="false">${shapes}</svg>`)}`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ds-icon': DsIcon;
  }
}
