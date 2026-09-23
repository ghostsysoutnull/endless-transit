import type { Fragment } from '#engine/model/Fragment.ts';

/** What a merge of the journey made: the fragment now in the buffer, and whether the place forged it (a Keystone) rather than the buffer making a hybrid. */
export interface Merge {
  readonly fragment: Fragment;
  readonly forged: boolean;
}
