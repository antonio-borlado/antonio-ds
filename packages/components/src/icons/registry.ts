// Shared across bundles through globalThis, so an icon set loaded from its own <script> (CDN)
// is visible to <ds-icon> from the components bundle.
export interface IconSetData {
  /** Attributes for the root <svg> (viewBox, fill/stroke). */
  attrs: string;
  /** DS icon name → inner SVG markup. */
  icons: Record<string, string>;
}

interface Registry {
  sets: Record<string, IconSetData>;
  listeners: Set<(set: string) => void>;
}

const registry: Registry = ((globalThis as any).__dsIcons ??= { sets: {}, listeners: new Set() });

export const DEFAULT_ICON_SET = 'lucide';

export function getIconSet(name: string): IconSetData | undefined {
  return registry.sets[name];
}

/** Register a custom icon library under `name`, using the DS icon names as keys. */
export function registerIconSet(name: string, data: IconSetData) {
  registry.sets[name] = data;
  registry.listeners.forEach((notify) => notify(name));
}

export function onIconSetRegistered(listener: (set: string) => void) {
  registry.listeners.add(listener);
  return () => registry.listeners.delete(listener);
}
