import type { GameOption } from '#engine/rules/GameOption.ts';
import type { HudVM } from './HudVM.ts';
import type { TravelRowVM } from './TravelRowVM.ts';

/** What the world screen's presenter asks of `FloorPad`: the list laid out as a pad of numbers, or none. */
export interface Pads {
  of(travel: readonly GameOption[], rows: readonly TravelRowVM[]): HudVM['pad'];
}
