/**
 * What a scene draws, as plain data (U01b): which picture (a key the registry looks up, never one a view
 * branches on), the words a reader hears for it, where it stands, one child per listed place in the list's
 * order — its option id is the pick — and the coherence tear's strength and seed.
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
  }[];
  /** How strongly the picture tears, 0 to 1 (`Coherence.decay`). */
  readonly decay: number;
  /** This frame's seed as text: what the tear and the grain are drawn from. */
  readonly noise: string;
}
