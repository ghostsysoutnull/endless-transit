/** How a door looks, by its lists' names (`Heavy Bulkhead`, `Frozen`): what a picture draws it by. */
interface Look {
  readonly material: string;
  readonly state: string;
}

/**
 * What a scene draws, as plain data (U01b, U02): which picture (a key the registry looks up, never one a view
 * branches on), the words a reader hears for it, where it stands, one child per listed place in the list's
 * order — its option id is the pick — the coherence tear's strength and seed, and what the building's pictures
 * need: the tower (its size, roof, car, the Layers open below and each floor's row), the corridor's shape, and
 * the slider's name.
 */
export interface SceneVM {
  readonly key: string;
  readonly label: string;
  /** The place's own address: a later scene zooms back out of the child it came from. */
  readonly address: string;
  readonly children: readonly {
    readonly id: string;
    readonly ordinal: string;
    readonly name: string;
    readonly floors: number;
    readonly doors: number;
    readonly landmark: boolean;
    readonly visited: boolean;
    readonly sealed: boolean;
    readonly address: string;
    /** A door's look and the word written on it; nothing for any other child. */
    readonly door: { readonly look: Look; readonly words: string } | null;
  }[];
  /** The tower the place is drawn as (a building, a floor at its elevator); nothing for the rest. */
  readonly tower: {
    readonly floors: number;
    readonly doors: number;
    readonly address: string;
    readonly landmark: boolean;
    readonly car: number;
    readonly below: number;
    /** Floor `n`'s row at `n`: how its corridor runs and how its doors look. */
    readonly rows: readonly { readonly shape: string; readonly looks: readonly Look[] }[];
  } | null;
  /** How the place's corridor runs (`long`, `service`, `curved`, `static`); empty when it is none. */
  readonly shape: string;
  /** The name a reader hears for the picture's slider (the list's heading); empty when there is none. */
  readonly slider: string;
  /** How strongly the picture tears, 0 to 1 (`Coherence.decay`). */
  readonly decay: number;
  /** This frame's seed as text: what the tear and the grain are drawn from. */
  readonly noise: string;
}
