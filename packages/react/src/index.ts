import * as React from 'react';
import { createComponent, type EventName } from '@lit/react';
import { DsBadge, DsButton, DsCard, DsIcon, DsInput, DsDatePicker, DsList, DsListFooter, DsListHeader, DsListRow, DsSelect, DsStepper, DsSwitch } from '@antonio-ds/components';

export type { BadgeVariant, ButtonSize, ButtonVariant, IconName, IconSet, IconSize, ListHeaderType, ListType, DatePickerType } from '@antonio-ds/components';
export { iconNames, iconSets, registerIconSet } from '@antonio-ds/components';

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

export const Icon = createComponent({ tagName: 'ds-icon', elementClass: DsIcon, react: React });

export const List = createComponent({ tagName: 'ds-list', elementClass: DsList, react: React });
export const ListRow = createComponent({
  tagName: 'ds-list-row',
  elementClass: DsListRow,
  react: React,
  events: { onChange: 'change' as EventName<Event>, onEdit: 'ds-edit' as EventName<CustomEvent<{ action: 'add' | 'remove' }>> },
});
export const ListHeader = createComponent({ tagName: 'ds-list-header', elementClass: DsListHeader, react: React });
export const ListFooter = createComponent({ tagName: 'ds-list-footer', elementClass: DsListFooter, react: React });

export const Switch = createComponent({
  tagName: 'ds-switch',
  elementClass: DsSwitch,
  react: React,
  events: { onChange: 'change' as EventName<Event> },
});

/**
 * Applies a brand, mode and icon library to its subtree: <Theme brand="base" mode="dark" iconSet="material">…</Theme>
 * Libraries other than lucide must be imported once: import '@antonio-ds/components/icons/material';
 */
export function Theme({
  brand,
  mode,
  iconSet,
  as: Tag = 'div',
  children,
  ...rest
}: {
  brand?: string;
  mode?: 'light' | 'dark';
  iconSet?: string;
  as?: React.ElementType;
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLElement>) {
  return React.createElement(Tag, { 'data-brand': brand, 'data-theme': mode, 'data-icon-set': iconSet, ...rest }, children);
}

export const Stepper = createComponent({
  tagName: 'ds-stepper',
  elementClass: DsStepper,
  react: React,
  events: { onChange: 'change' as EventName<Event> },
});

export const Select = createComponent({
  tagName: 'ds-select',
  elementClass: DsSelect,
  react: React,
  events: { onChange: 'change' as EventName<Event> },
});

export const DatePicker = createComponent({
  tagName: 'ds-date-picker',
  elementClass: DsDatePicker,
  react: React,
  events: { onChange: 'change' as EventName<Event> },
});
