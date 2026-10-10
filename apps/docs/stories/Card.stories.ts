import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

const meta: Meta<{ elevated: boolean }> = {
  title: 'Components/Card',
  component: 'ds-card',
  args: { elevated: true },
  render: (a) => html`<ds-card ?elevated=${a.elevated} style="max-width:380px">
    <h3 slot="header">Plan Pro</h3>
    <p style="margin:0;color:var(--ds-color-text-secondary)">Todo lo que necesitas para lanzar tus productos con un sistema de diseño compartido.</p>
    <div slot="footer">
      <ds-button>Empezar</ds-button>
      <ds-button variant="ghost">Saber más</ds-button>
    </div>
  </ds-card>`,
};
export default meta;

export const Default: StoryObj<{ elevated: boolean }> = {};
