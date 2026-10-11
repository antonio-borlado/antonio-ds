// Lucide is the default library and ships with the components; other sets load from @antonio-ds/components/icons/<set>.
import './icons/generated/lucide.js';

export { DsButton } from './components/button.js';
export type { ButtonVariant, ButtonSize } from './components/button.js';
export { DsInput } from './components/input.js';
export { DsCard } from './components/card.js';
export { DsBadge } from './components/badge.js';
export type { BadgeVariant } from './components/badge.js';
export { DsIcon } from './components/icon.js';
export type { IconSize } from './components/icon.js';
export { registerIconSet, getIconSet, DEFAULT_ICON_SET } from './icons/registry.js';
export type { IconSetData } from './icons/registry.js';
export { iconNames, iconSets } from './icons/generated/names.js';
export type { IconName, IconSet } from './icons/generated/names.js';
