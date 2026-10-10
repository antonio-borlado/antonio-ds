import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

type Args = { variant: string; size: string; disabled: boolean; fullWidth: boolean; label: string };

const meta: Meta<Args> = {
  title: 'Components/Button',
  component: 'ds-button',
  args: { variant: 'primary', size: 'md', disabled: false, fullWidth: false, label: 'Guardar cambios' },
  argTypes: {
    variant: { control: 'inline-radio', options: ['primary', 'secondary', 'ghost', 'danger'] },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
  },
  render: (a) => html`<ds-button variant=${a.variant} size=${a.size} ?disabled=${a.disabled} ?full-width=${a.fullWidth}>${a.label}</ds-button>`,
};
export default meta;

export const Playground: StoryObj<Args> = {};

export const Variants: StoryObj<Args> = {
  render: () => html`<div style="display:flex;gap:12px;flex-wrap:wrap">
    <ds-button>Primary</ds-button>
    <ds-button variant="secondary">Secondary</ds-button>
    <ds-button variant="ghost">Ghost</ds-button>
    <ds-button variant="danger">Danger</ds-button>
    <ds-button disabled>Disabled</ds-button>
  </div>`,
};

export const Sizes: StoryObj<Args> = {
  render: () => html`<div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap">
    <ds-button size="sm">Small</ds-button>
    <ds-button size="md">Medium</ds-button>
    <ds-button size="lg">Large</ds-button>
  </div>`,
};
