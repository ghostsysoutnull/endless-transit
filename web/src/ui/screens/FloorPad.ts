import type { LevelRow } from '#engine/model/LevelRow.ts';
import type { LevelKind } from '#engine/model/LevelKind.ts';
import type { Portrait } from '#engine/model/Portrait.ts';
import type { GameOption } from '#engine/rules/GameOption.ts';
import type { HudVM } from './HudVM.ts';
import { ListedParts } from './ListedParts.ts';
import type { Pads } from './Pads.ts';
import type { PadGroup } from './PadGroup.ts';
import type { TravelRowVM } from './TravelRowVM.ts';

/** Up to this many numbered places, the pad is one group; past it, groups of ten (Decision 7: floors by tens above 20). */
const PAD_GROUP = 20;

/** Owns one fact: how a list of numbered places groups into a pad of numbers (U02, Decision 7). */
export class FloorPad implements Pads {
  /** Past twenty, the pad's group of a level by what stands there: the Layers all in one, a floor in its ten. */
  readonly #groups: Readonly<Record<LevelKind, PadGroup>>;

  constructor(groups: Readonly<Record<LevelKind, PadGroup>>) {
    this.#groups = groups;
  }

  /**
   * A list whose every place goes by its own number (a building's floors) is laid out as a pad of numbers
   * (U02, Decision 7): one group up to 20, else by tens — ascending, the Layers' group first — and the group
   * shown first is the one holding the current row (where the elevator stands). Each place's level is its row's on
   * the tower the portrait draws; no tower, no pad.
   */
  of(portrait: Portrait, travel: readonly GameOption[], rows: readonly TravelRowVM[]): HudVM['pad'] {
    if (travel.length === 0 || travel.some((option) => !option.numbered)) return null;
    return portrait.drawnBy<HudVM['pad']>({
      street: () => null,
      tower: (tower) => this.#pad(new ListedParts(tower.rows), travel, rows),
      corridor: () => null,
      unseen: () => null,
    });
  }

  /** The pad of the numbered places, each at its level. */
  #pad(
    levels: ListedParts<LevelRow>,
    travel: readonly GameOption[],
    rows: readonly TravelRowVM[],
  ): HudVM['pad'] {
    const numbered = levels
      .drawn(travel, (option, part, index) => ({ row: rows[index], option, level: part.level }))
      .flatMap(({ row, option, level }) => (row === undefined ? [] : [{ row, option, level }]))
      .sort((one, other) => one.level.number() - other.level.number());
    const tens = travel.length > PAD_GROUP;
    const groups = new Map<number, (typeof numbered)[number][]>();
    for (const entry of numbered) {
      const group = tens ? this.#groups[entry.level.kind()].of(entry.level) : 0;
      groups.set(group, [...(groups.get(group) ?? []), entry]);
    }
    const list = [...groups.values()].map((group) => {
      const first = group[0]?.level.label() ?? '';
      const last = group.at(-1)?.level.label() ?? '';
      return {
        label: `${first}–${last}`,
        keys: group.map(({ row, option, level }) => ({
          id: row.id,
          number: level.label(),
          spoken: [
            row.label,
            ...(row.mark === null ? [] : [row.mark.label]),
            ...(row.seen === null ? [] : [row.seen.label]),
            ...row.readings.map((reading) => `${reading.label} ${reading.value}`),
          ].join(', '),
          current: option.current,
          visited: option.visited,
        })),
      };
    });
    const open = list.findIndex((group) => group.keys.some((key) => key.current));
    return { label: 'Floors by tens', groups: list, open: Math.max(0, open) };
  }
}
