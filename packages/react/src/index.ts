import * as React from 'react';
import { createComponent, type EventName } from '@lit/react';
import { DsBadge, DsButton, DsCard, DsInput } from '@antonio-ds/components';

export type { BadgeVariant, ButtonSize, ButtonVariant } from '@antonio-ds/components';

export const Button = createComponent({ tagName: 'ds-button', elementClass: DsButton, react: React });

export const Input = createComponent({
  tagName: 'ds-input',
  elementClass: DsInput,
  react: React,
  events: {
    onInput: 'input' as EventName<InputEvent>,
    onChange: 'change' as EventName<Event>,
  },
});

export const Card = createComponent({ tagName: 'ds-card', elementClass: DsCard, react: React });

export const Badge = createComponent({ tagName: 'ds-badge', elementClass: DsBadge, react: React });

/** Applies a brand/mode to its subtree: <Theme brand="base" mode="dark">…</Theme> */
export function Theme({
  brand,
  mode,
  as: Tag = 'div',
  children,
  ...rest
}: { brand?: string; mode?: 'light' | 'dark'; as?: React.ElementType; children?: React.ReactNode } & React.HTMLAttributes<HTMLElement>) {
  return React.createElement(Tag, { 'data-brand': brand, 'data-theme': mode, ...rest }, children);
}
