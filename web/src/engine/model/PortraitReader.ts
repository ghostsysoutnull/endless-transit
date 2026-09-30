import type { AreaFigure } from './AreaFigure.ts';
import type { BuildingFigure } from './BuildingFigure.ts';
import type { CorridorFigure } from './CorridorFigure.ts';
import type { PlanFigure } from './PlanFigure.ts';
import type { TowerFigure } from './TowerFigure.ts';

/** What reads a portrait answers: one method per drawn kind, and `unseen` for a place no picture draws. */
export interface PortraitReader<R> {
  /** A street: its buildings as it draws them, in its list's order. */
  street(buildings: readonly BuildingFigure[]): R;
  tower(tower: TowerFigure): R;
  corridor(corridor: CorridorFigure): R;
  /** A room: its apartment's plan, zoomed into it (U03). */
  plan(plan: PlanFigure): R;
  /** A level above the street: its children as marks in its area (U04). */
  area(area: AreaFigure): R;
  unseen(): R;
}
