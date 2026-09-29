import { describe, expect, test } from 'vitest';
import type { FloorPlan } from '#ui/scene/FloorPlan.ts';
import type { PlanBox } from '#ui/scene/PlanBox.ts';
import { PlanLayout } from '#ui/scene/PlanLayout.ts';
import { SceneHash } from '#ui/scene/SceneHash.ts';
import { must } from '#tests/support/world.ts';

const layout = new PlanLayout(new SceneHash());
/** A doorway needs this much shared wall, in plan units (a room is about 1.3 across). */
const DOOR = 0.5;
const ADDRESSES = Array.from(
  { length: 200 },
  (_, n) => `0.0.0.0.0.0.0.0.${String(n % 7)}.${String(n)}.0.${String(n % 13)}`,
);

function overlap(one: PlanBox, other: PlanBox): number {
  const width = Math.min(one.right(), other.right()) - Math.max(one.left(), other.left());
  const height = Math.min(one.bottom(), other.bottom()) - Math.max(one.top(), other.top());
  return width > 0 && height > 0 ? width * height : 0;
}

function everyPlan(check: (plan: FloorPlan, count: number, address: string) => void): void {
  for (let count = 1; count <= 48; count++)
    for (const address of ADDRESSES) check(layout.of(count, address), count, address);
}

describe('an apartment’s plan (U03): serpentine rows, so each room opens onto the next', () => {
  test('as many rooms as the apartment has; they fill the footprint and never overlap', () => {
    const wrong: string[] = [];
    everyPlan((plan, count, address) => {
      const rooms = plan.rooms();
      if (rooms.length !== count) wrong.push(`${address}: ${String(rooms.length)} of ${String(count)} rooms`);
      const covered = rooms.reduce((sum, room) => sum + room.area(), 0);
      if (Math.abs(covered - plan.width() * plan.height()) > 1e-6)
        wrong.push(`${address}: covers ${String(covered)}`);
      rooms.forEach((one, index) => {
        for (const other of rooms.slice(index + 1))
          if (overlap(one, other) > 1e-9)
            wrong.push(`${address} ${String(count)} rooms: room ${String(index)} overlaps`);
      });
    });
    expect(wrong).toEqual([]);
  });

  test('each room shares a wall a doorway wide with the next, and the doorway stands on it', () => {
    everyPlan((plan, count, address) => {
      const rooms = plan.rooms();
      plan.doors().forEach((door, index) => {
        const where = `${address} ${String(count)} rooms, door ${String(index)}`;
        expect(door.span(), where).toBeGreaterThanOrEqual(DOOR);
        expect(door.on(must(rooms[index])), where).toBe(true);
        expect(door.on(must(rooms[index + 1])), where).toBe(true);
      });
    });
  });

  test('the first room touches the bottom of the footprint, where the entrance is cut into it', () => {
    everyPlan((plan, _count, address) => {
      const first = must(plan.rooms()[0]);
      expect(first.bottom(), address).toBeCloseTo(plan.height(), 9);
      expect(plan.entry().on(first), address).toBe(true);
      expect(plan.entry().middle().y()).toBe(plan.height());
    });
  });

  test('no room is thinner than a third of its length', () => {
    everyPlan((plan, count, address) => {
      plan.rooms().forEach((room, index) => {
        expect(
          room.squareness(),
          `${address} ${String(count)} rooms, room ${String(index)}`,
        ).toBeGreaterThanOrEqual(1 / 3);
      });
    });
  });

  test('the same apartment always has the same plan; another address, another plan', () => {
    const one = layout.of(9, '0.1.2');
    const again = layout.of(9, '0.1.2');
    const other = layout.of(9, '0.1.3');
    expect(one.rooms().every((room, index) => room.equals(must(again.rooms()[index])))).toBe(true);
    expect(one.rooms().every((room, index) => room.equals(must(other.rooms()[index])))).toBe(false);
  });
});
