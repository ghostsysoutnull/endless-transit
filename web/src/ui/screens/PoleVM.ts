import type { GlyphLook } from '#engine/model/GlyphLook.ts';
import type { SignLook } from '#engine/model/PoleSign.ts';

/** The pole's three values: what a planet and a country decide for everything below them (U05). */
export type PoleLane = 'era' | 'culture' | 'trait';
/** The two values a second pair carries, and an apartment can drift in. */
export type DriftLane = 'era' | 'culture';
/** How a tag on the pole is inked: one look a kind of state. */
export type TagLook = SignLook | 'rebel' | 'drift';

/** One level's row on the pole (U05, Decision 13): its node, its words, its values and its tags. */
export interface PoleLevelVM {
  /** The level's address: a stable key for the row and its button. */
  readonly key: string;
  readonly glyph: GlyphLook;
  /** Below the bedrock: drawn in the void's colour. */
  readonly abyssal: boolean;
  /** Where the traveller stands: the last row. */
  readonly here: boolean;
  /** `Planet`. */
  readonly kind: string;
  readonly name: string;
  /** What a reader hears for the row's button. */
  readonly label: string;
  /** Each value here, `''` where no level above has set it. */
  readonly values: Readonly<Record<PoleLane, string>>;
  /** The second pair the drift current carries here (`Ancient`, `Monolith`), `''` above the planet. */
  readonly current: Readonly<Record<DriftLane, string>>;
  /** It swapped the pairs here: its era and culture are written in red. */
  readonly rebel: boolean;
  /** Which values it drew from the second pair. */
  readonly drift: Readonly<Record<DriftLane, boolean>>;
  /** An empty berth in the ships' lane (Decision 15: ships are not part of this run). */
  readonly berth: boolean;
  readonly tags: readonly { readonly word: string; readonly look: TagLook }[];
}

/** The pole (U05): the switch's words, the values' heads, the current's and the looks' words, and a row a level from the universe down to you. */
export interface PoleVM {
  /** The switch's group name and its two views. */
  readonly group: string;
  readonly pole: string;
  readonly column: string;
  readonly heads: Readonly<Record<PoleLane, string>>;
  /** The head over the drift current's words (`Drift current`). */
  readonly currentHead: string;
  /** The word written beside a value in force that a rebel district swapped in, or a drift brought. */
  readonly looks: Readonly<Record<'rebel' | 'drift', string>>;
  readonly levels: readonly PoleLevelVM[];
}
