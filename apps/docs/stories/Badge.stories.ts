import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

const meta: Meta<{ variant: string; label: string }> = {
  title: 'Components/Badge',
  component: 'ds-badge',
  args: { variant: 'accent', label: 'Nuevo' },
  argTypes: { variant: { control: 'inline-radio', options: ['neutral', 'accent', 'success', 'warning', 'danger'] } },
  render: (a) => html`<ds-badge variant=${a.variant}>${a.label}</ds-badge>`,
};
export default meta;

export const Playground: StoryObj<{ variant: string; label: string }> = {};
export const All: StoryObj = {
  render: () => html`<div style="display:flex;gap:8px;flex-wrap:wrap">
    <ds-badge>Neutral</ds-badge>
    <ds-badge variant="accent">Accent</ds-badge>
    <ds-badge variant="success">Activo</ds-badge>
    <ds-badge variant="warning">Pendiente</ds-badge>
    <ds-badge variant="danger">Error</ds-badge>
  </div>`,
};
