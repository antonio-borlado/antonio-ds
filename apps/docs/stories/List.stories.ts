import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

type Args = { type: string; header: boolean; footer: boolean };

const meta: Meta<Args> = {
  title: 'Components/List',
  component: 'ds-list',
  args: { type: 'default', header: true, footer: true },
  argTypes: { type: { control: 'inline-radio', options: ['default', 'grouped'] } },
  parameters: { layout: 'fullscreen' },
  render: (a) => html`<div style="max-width:430px">
    <ds-list type=${a.type}>
      ${a.header ? html`<ds-list-header>A short title is best</ds-list-header>` : ''}
      <ds-list-row label="Wi-Fi" detail="Casa" disclosure href="#"><ds-icon slot="leading" name="globe"></ds-icon></ds-list-row>
      <ds-list-row label="Notificaciones" description="Sonidos y avisos" disclosure interactive><ds-icon slot="leading" name="bell"></ds-icon></ds-list-row>
      <ds-list-row label="Modo oscuro"><ds-icon slot="leading" name="moon"></ds-icon><ds-switch slot="trailing" label="Modo oscuro" checked></ds-switch></ds-list-row>
      <ds-list-row label="Cuenta" description="antonio@ejemplo.com" disclosure interactive><ds-icon slot="leading" name="user"></ds-icon></ds-list-row>
      <ds-list-row label="Cerrar sesión"><ds-button slot="trailing" variant="ghost" size="sm">Salir</ds-button></ds-list-row>
      ${a.footer ? html`<ds-list-footer>A description that starts at the top and provides more context.</ds-list-footer>` : ''}
    </ds-list>
  </div>`,
};
export default meta;

export const Default: StoryObj<Args> = {};
export const Grouped: StoryObj<Args> = { args: { type: 'grouped' } };

export const Headers: StoryObj<Args> = {
  name: 'Cabeceras',
  parameters: { controls: { disable: true } },
  render: () => html`<div style="max-width:430px;display:grid;gap:8px">
    ${['default', 'plain', 'prominent', 'section'].map(
      (t) => html`<ds-list>
        <ds-list-header type=${t} ?disclosure=${t === 'prominent'}>${t === 'section' ? 'A' : `Header ${t}`}</ds-list-header>
        <ds-list-row label="Title" description="Subtitle" detail="Detail" disclosure></ds-list-row>
      </ds-list>`,
    )}
  </div>`,
};

export const Trailing: StoryObj<Args> = {
  name: 'Trailing',
  parameters: { controls: { disable: true } },
  render: () => html`<div style="max-width:430px">
    <ds-list type="grouped">
      <ds-list-row label="Default" detail="Detail" disclosure></ds-list-row>
      <ds-list-row label="Icon + info" detail="Detail"><ds-icon slot="trailing" name="info" size="sm" style="color:var(--ds-color-content-accent)"></ds-icon></ds-list-row>
      <ds-list-row label="Toggle"><ds-switch slot="trailing" label="Toggle" checked></ds-switch></ds-list-row>
      <ds-list-row label="Action"><span slot="trailing" style="color:var(--ds-color-content-accent)">Label</span></ds-list-row>
      <ds-list-row label="Badge"><ds-badge slot="trailing" variant="success">Activo</ds-badge></ds-list-row>
    </ds-list>
  </div>`,
};
