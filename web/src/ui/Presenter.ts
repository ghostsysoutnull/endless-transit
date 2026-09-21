import type { GameSnapshot } from '#engine/rules/GameSnapshot.ts';

/** Turns engine snapshots into one screen's view-model — and says which snapshots are its business. */
export interface Presenter<VM> {
  accepts(snapshot: GameSnapshot): boolean;
  toViewModel(snapshot: GameSnapshot): VM;
}
