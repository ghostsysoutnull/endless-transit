import type { GlyphLook } from '#engine/model/GlyphLook.ts';
import type { SignLook } from '#engine/model/PoleSign.ts';

/** The pole's three ribbons: what a planet and a country decide for everything below them (U05). */
export type PoleLane = 'era' | 'culture' | 'trait';
/** The two ribbons a second pair runs beside, and an apartment can drift in. */
export type DriftLane = 'era' | 'culture';
/** How a tag on the pole is inked: one look a kind of state. */
export type TagLook = SignLook | 'rebel' | 'drift';

/** One level's row on the pole (U05, Decision 13): its plate, its words, its ribbons' values and its tags. */
export interface PoleLevelVM {
  /** The level's address: a stable key for the row and its button. */
  readonly key: string;
  readonly glyph: GlyphLook;
  /** Below the bedrock: drawn in the void's colour. */
  readonly abyssal: boolean;
  /** Where the traveller stands: the last row. */
  readonly here: boolean;
  /** `Planet · 10⁷ m`: the kind and its scale — the pole's ruler. */
  readonly kind: string;
  readonly name: string;
  /** What a reader hears for the row's button. */
  readonly label: string;
  /** Each ribbon's value here, `''` where no level above has set it. */
  readonly values: Readonly<Record<PoleLane, string>>;
  /** The drift current's words beside each ribbon (`drift · ancient`), `''` above the planet. */
  readonly current: Readonly<Record<DriftLane, string>>;
  /** It swapped the pairs here: both ribbons break in red. */
  readonly rebel: boolean;
  /** Which values it drew from the second pair: a hook in from the current. */
  readonly drift: Readonly<Record<DriftLane, boolean>>;
  /** An empty berth in the ships' lane (Decision 15: ships are not part of this run). */
  readonly berth: boolean;
  readonly tags: readonly { readonly word: string; readonly look: TagLook }[];
}

/** The pole (U05): the switch's words, the ribbons' heads and a row a level from the universe down to you. */
export interface PoleVM {
  /** The switch's group name and its two views. */
  readonly group: string;
  readonly pole: string;
  readonly column: string;
  readonly heads: Readonly<Record<PoleLane, string>>;
  readonly levels: readonly PoleLevelVM[];
}
