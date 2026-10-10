import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

type Args = { label: string; placeholder: string; hint: string; error: string; disabled: boolean; type: string };

const meta: Meta<Args> = {
  title: 'Components/Input',
  component: 'ds-input',
  args: { label: 'Email', placeholder: 'tu@email.com', hint: 'Nunca lo compartiremos.', error: '', disabled: false, type: 'email' },
  argTypes: { type: { control: 'select', options: ['text', 'email', 'password', 'search', 'tel', 'url', 'number'] } },
  render: (a) => html`<div style="max-width:360px">
    <ds-input label=${a.label} placeholder=${a.placeholder} hint=${a.hint} error=${a.error} type=${a.type} ?disabled=${a.disabled}></ds-input>
  </div>`,
};
export default meta;

export const Playground: StoryObj<Args> = {};
export const WithError: StoryObj<Args> = { args: { error: 'Introduce un email válido' } };
