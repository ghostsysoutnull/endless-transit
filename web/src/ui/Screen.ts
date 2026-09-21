import type { OptionVM } from './OptionVM.ts';

/** What every screen's view-model carries, so the shell can hand its options to the input router. */
export interface Screen {
  readonly options: readonly OptionVM[];
}
