/** A thing the player can do right now — data, never a closure. The engine resolves `id` to the action. */
export interface GameOption {
  readonly id: string;
  /** Optional keyboard extra (queue decision 1: never a requirement). Empty when the option has none. */
  readonly key: string;
  readonly label: string;
  /** The name of the place the option leads into; empty when it leads into none. Nobody has to cut it out of the label. */
  readonly place: string;
  /** What sort of move it is: into a child, back to the parent, or about the game itself. */
  readonly role: 'travel' | 'return' | 'system';
  /** Listed but not enterable: the engine ignores its id, and a screen shows it as closed — never as a button. */
  readonly sealed: boolean;
  /** The place asks its parent's list to make it stand out. */
  readonly landmark: boolean;
}
