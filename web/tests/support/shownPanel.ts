import type { Panel } from '#ui/screens/Panel.ts';

/** A panel's content when it is shown, or a failed test when it is not. */
export function shown<T>(panel: Panel<T>): T & { readonly shown: true } {
  if (!panel.shown) throw new Error('expected the panel shown');
  return panel;
}
