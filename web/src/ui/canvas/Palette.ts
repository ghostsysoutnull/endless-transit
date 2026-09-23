/**
 * Resolves a colour token of the stylesheet (`cy`, `frame`, `dim` — the names of `:root`'s custom
 * properties without the dashes) to the colour it stands for where the canvas sits. The stylesheet owns
 * every hue; a picture only ever names a token.
 */
export type Palette = (token: string) => string;
