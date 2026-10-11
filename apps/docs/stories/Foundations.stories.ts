import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { vars } from '@antonio-ds/tokens';

const meta: Meta = { title: 'Foundations', parameters: { layout: 'padded' }, tags: ['!autodocs'] };
export default meta;

const paths = Object.keys(vars);
const group = (prefix: string) => paths.filter((p) => p.startsWith(prefix));

const swatch = (path: string) => html`
  <div style="display:flex;flex-direction:column;gap:4px;min-width:0">
    <div style="height:56px;border-radius:var(--ds-radius-md);background:var(--ds-${path.replaceAll('.', '-')});border:1px solid var(--ds-color-border-default)"></div>
    <code style="font-size:12px;color:var(--ds-color-content-secondary);overflow-wrap:anywhere">${path}</code>
  </div>
`;
const grid = (items: unknown) => html`<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:16px;margin-bottom:32px">${items}</div>`;
const h = (t: string) => html`<h2 style="font-size:var(--ds-typography-size-h3);margin:0 0 16px">${t}</h2>`;

export const SemanticColors: StoryObj = {
  name: 'Colores semánticos',
  render: () => html`
    ${['bg', 'content', 'border', 'focus'].map(
      (g) => html`${h(`color.${g}`)}${grid(group(`color.${g}.`).map(swatch))}`,
    )}
  `,
};

export const Primitives: StoryObj = {
  name: 'Paleta primitiva',
  render: () => html`
    ${['neutral', 'blue', 'green', 'amber', 'red'].map((g) => html`${h(g)}${grid(group(`color.${g}.`).map(swatch))}`)}
  `,
};

export const Typography: StoryObj = {
  name: 'Tipografía',
  render: () => html`
    <p style="color:var(--ds-color-content-secondary);margin:0 0 24px">
      Manrope · Regular 400 y Medium 500 · escala 1.6 con medios pasos (×√1.6) desde 16px.
      Cambia el viewport a Mobile/Desktop: cada título baja un paso en móvil.
    </p>
    ${h('Roles (typography.size)')}
    ${group('typography.size.').map(
      (p) => html`<div style="display:flex;flex-wrap:wrap;align-items:baseline;gap:8px 24px;padding:12px 0;border-bottom:1px solid var(--ds-color-border-default)">
        <code style="width:180px;flex:none;font-size:12px;color:var(--ds-color-content-secondary)">${p}</code>
        <span style="font-size:var(--ds-${p.replaceAll('.', '-')});line-height:var(--ds-font-line-height-tight);font-weight:var(--ds-font-weight-medium);letter-spacing:var(--ds-font-tracking-heading);min-width:0">Diseño para todos</span>
      </div>`,
    )}
    <div style="height:32px"></div>
    ${h('Escala (font.size)')}
    ${group('font.size.').map(
      (p) => html`<div style="display:flex;align-items:baseline;gap:24px;padding:8px 0;overflow:hidden">
        <code style="width:180px;flex:none;font-size:12px;color:var(--ds-color-content-secondary)">${p}</code>
        <span style="font-size:var(--ds-${p.replaceAll('.', '-')});line-height:var(--ds-font-line-height-tight);white-space:nowrap">Aa</span>
      </div>`,
    )}
    <div style="height:32px"></div>
    ${h('Pesos')}
    <p style="font-size:var(--ds-typography-size-h3);margin:0 0 8px;font-weight:var(--ds-font-weight-regular)">Regular 400 — texto de lectura</p>
    <p style="font-size:var(--ds-typography-size-h3);margin:0;font-weight:var(--ds-font-weight-medium)">Medium 500 — títulos, botones, etiquetas</p>
  `,
};

export const Spacing: StoryObj = {
  name: 'Espaciado y radios',
  render: () => html`
    ${h('space')}
    ${group('space.').map(
      (p) => html`<div style="display:flex;align-items:center;gap:16px;margin-bottom:8px">
        <code style="width:120px;font-size:12px;color:var(--ds-color-content-secondary)">${p}</code>
        <div style="height:16px;width:var(--ds-${p.replaceAll('.', '-')});background:var(--ds-color-bg-accent);border-radius:2px"></div>
      </div>`,
    )}
    <div style="height:24px"></div>
    ${h('radius')}
    ${grid(group('radius.').map(
      (p) => html`<div style="display:flex;flex-direction:column;gap:4px">
        <div style="height:64px;background:var(--ds-color-bg-accent-subtle);border:2px solid var(--ds-color-bg-accent);border-radius:var(--ds-${p.replaceAll('.', '-')})"></div>
        <code style="font-size:12px;color:var(--ds-color-content-secondary)">${p}</code>
      </div>`,
    ))}
  `,
};
