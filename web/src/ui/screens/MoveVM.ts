import type { OptionVM } from '#ui/OptionVM.ts';

/** A move in the strip under the picture: its option, and its drawn icon (empty when it has none). */
export interface MoveVM extends OptionVM {
  readonly icon: string;
}
