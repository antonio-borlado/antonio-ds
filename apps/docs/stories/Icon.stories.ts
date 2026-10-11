import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { iconNames } from '@antonio-ds/components';

type Args = { name: string; size: string; set: string; label: string };

const meta: Meta<Args> = {
  title: 'Components/Icon',
  component: 'ds-icon',
  args: { name: 'search', size: 'lg', set: '', label: '' },
  argTypes: {
    name: { control: 'select', options: [...iconNames] },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg', 'inherit'] },
    set: { control: 'inline-radio', options: ['', 'lucide', 'material', 'heroicons'], description: 'Vacío = la del proyecto (barra superior)' },
  },
  render: (a) => html`<ds-icon name=${a.name} size=${a.size} set=${a.set || undefined} label=${a.label}></ds-icon>`,
};
export default meta;

export const Playground: StoryObj<Args> = {};

export const Catalog: StoryObj<Args> = {
  name: 'Catálogo',
  parameters: { controls: { disable: true } },
  render: () => html`
    <p style="color:var(--ds-color-text-secondary);margin:0 0 16px">
      Cambia la librería en la barra superior (Iconos). Los nombres son los mismos en todas.
    </p>
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(112px,1fr));gap:8px">
      ${iconNames.map(
        (n) => html`<div style="display:flex;flex-direction:column;align-items:center;gap:8px;padding:16px 8px;border:1px solid var(--ds-color-border-default);border-radius:var(--ds-radius-md)">
          <ds-icon name=${n} size="lg"></ds-icon>
          <code style="font-size:12px;color:var(--ds-color-text-secondary)">${n}</code>
        </div>`,
      )}
    </div>
  `,
};

export const Compare: StoryObj<Args> = {
  name: 'Comparar librerías',
  parameters: { controls: { disable: true } },
  render: () => html`
    <div style="display:grid;gap:16px">
      ${['lucide', 'material', 'heroicons'].map(
        (set) => html`<div data-icon-set=${set} style="display:flex;align-items:center;gap:16px;flex-wrap:wrap">
          <code style="width:96px;font-size:12px;color:var(--ds-color-text-secondary)">${set}</code>
          ${['home', 'search', 'bell', 'settings', 'user', 'heart', 'trash', 'download', 'warning', 'success'].map((n) => html`<ds-icon name=${n} size="lg"></ds-icon>`)}
        </div>`,
      )}
    </div>
  `,
};

export const InButtons: StoryObj<Args> = {
  name: 'En botones',
  parameters: { controls: { disable: true } },
  render: () => html`<div style="display:flex;gap:12px;flex-wrap:wrap">
    <ds-button><ds-icon slot="start" name="plus" size="sm"></ds-icon>Nuevo</ds-button>
    <ds-button variant="secondary"><ds-icon slot="start" name="download" size="sm"></ds-icon>Descargar</ds-button>
    <ds-button variant="ghost">Siguiente<ds-icon slot="end" name="arrow-right" size="sm"></ds-icon></ds-button>
    <ds-button variant="danger"><ds-icon slot="start" name="trash" size="sm"></ds-icon>Eliminar</ds-button>
  </div>`,
};
