import type { Preview } from '@storybook/web-components-vite';
import { brands } from '@antonio-ds/tokens';
import '@antonio-ds/tokens/css/all.css';
import '@antonio-ds/tokens/css/global.css';
import '@antonio-ds/components';
import '@antonio-ds/components/icons/heroicons';
import '@antonio-ds/components/icons/material';
import '@antonio-ds/components/icons/hand';

const preview: Preview = {
  globalTypes: {
    brand: {
      description: 'Marca',
      toolbar: { title: 'Marca', icon: 'paintbrush', items: brands, dynamicTitle: true },
    },
    mode: {
      description: 'Tema',
      toolbar: {
        title: 'Tema',
        icon: 'mirror',
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark', icon: 'moon' },
        ],
        dynamicTitle: true,
      },
    },
    iconSet: {
      description: 'Librería de iconos',
      toolbar: {
        title: 'Iconos',
        icon: 'grid',
        items: [
          { value: 'lucide', title: 'Lucide' },
          { value: 'material', title: 'Material Symbols' },
          { value: 'heroicons', title: 'Heroicons' },
          { value: 'hand', title: 'A mano' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    iconSet: 'lucide',
    brand: brands[0],
    mode: 'light',
    viewport: { value: undefined },
  },
  decorators: [
    (story, { globals }) => {
      const root = document.documentElement;
      root.setAttribute('data-brand', globals.brand);
      root.setAttribute('data-theme', globals.mode);
      root.setAttribute('data-icon-set', globals.iconSet);
      return story();
    },
  ],
  parameters: {
    layout: 'padded',
    controls: { expanded: true },
    backgrounds: { disable: true },
    viewport: {
      options: {
        mobile: { name: 'Mobile', styles: { width: '390px', height: '844px' } },
        tablet: { name: 'Tablet', styles: { width: '820px', height: '1180px' } },
        desktop: { name: 'Desktop', styles: { width: '1440px', height: '900px' } },
      },
    },
  },
  tags: ['autodocs'],
};

export default preview;
