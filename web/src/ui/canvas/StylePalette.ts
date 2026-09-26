import type { Palette } from './Palette.ts';

/**
 * The stylesheet's tokens as they resolve on an element — `--frame` is the place's colour there — each read
 * once per palette. The one way a canvas learns its colours.
 */
export function stylePalette(element: Element): Palette {
  const style = element.ownerDocument.defaultView?.getComputedStyle(element);
  const cache = new Map<string, string>();
  return (token) => {
    let colour = cache.get(token);
    if (colour === undefined) {
      colour = style?.getPropertyValue(`--${token}`).trim() ?? '';
      cache.set(token, colour);
    }
    return colour;
  };
}
