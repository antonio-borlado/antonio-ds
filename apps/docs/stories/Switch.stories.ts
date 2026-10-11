import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

type Args = { checked: boolean; disabled: boolean };

const meta: Meta<Args> = {
  title: 'Components/Switch',
  component: 'ds-switch',
  args: { checked: true, disabled: false },
  render: (a) => html`<ds-switch label="Ejemplo" ?checked=${a.checked} ?disabled=${a.disabled}></ds-switch>`,
};
export default meta;

export const Playground: StoryObj<Args> = {};
export const States: StoryObj<Args> = {
  name: 'Estados',
  parameters: { controls: { disable: true } },
  render: () => html`<div style="display:flex;gap:16px;align-items:center">
    <ds-switch label="Off"></ds-switch><ds-switch label="On" checked></ds-switch><ds-switch label="Off disabled" disabled></ds-switch><ds-switch label="On disabled" checked disabled></ds-switch>
  </div>`,
};
