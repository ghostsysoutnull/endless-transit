import type { Level } from '#engine/model/Level.ts';
import type { TowerFigure } from '#engine/model/TowerFigure.ts';
import type { SceneChild } from './SceneChild.ts';
import type { SceneVM } from './SceneVM.ts';

/** What the tower draws (U02): each listed floor at its level, and the building — its roof, its car, a row per level. */
export interface TowerVM extends SceneVM<SceneChild & { readonly level: Level }> {
  readonly tower: TowerFigure;
}
