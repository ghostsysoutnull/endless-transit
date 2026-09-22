import { expect, test } from 'vitest';
import { Seed } from '#engine/rng/Seed.ts';
import { GameEngine } from '#engine/rules/GameEngine.ts';
import type { GameSnapshot } from '#engine/rules/GameSnapshot.ts';
import { Masthead } from '#ui/Masthead.ts';
import { HudPresenter } from '#ui/screens/HudPresenter.ts';
import type { HudVM } from '#ui/screens/HudVM.ts';
import { FixedEntropySource } from '#tests/support/FixedEntropySource.ts';
import { MemorySaveStore } from '#tests/support/MemorySaveStore.ts';
import { realRegistry } from '#tests/support/world.ts';

const presenter = new HudPresenter(new Masthead('golden'));

/** Everything the world screen shows, as text — every word of the view-model, in its order. */
function page(vm: HudVM): string {
  const lines: string[] = [];
  lines.push(`=== ${vm.place.eyebrow} ${vm.place.icon} ${vm.place.name}  [frame ${vm.frame}]`);
  lines.push(
    `path: ${vm.crumbs.map((crumb) => `${crumb.icon} ${crumb.name}${crumb.current ? ' *' : ''}`).join(' > ')}`,
  );
  lines.push(`stats: ${vm.stats.map((stat) => `${stat.label} ${stat.value}`).join(' | ')}`);
  if (vm.place.tags.length > 0) {
    lines.push(`tags: ${vm.place.tags.map((tag) => `${tag.label} ${tag.value} (${tag.key})`).join(' | ')}`);
  }
  for (const paragraph of vm.place.description) lines.push(`  ${paragraph}`);
  for (const row of vm.place.rows) lines.push(`${row.label}: ${row.value}`);
  lines.push(`diag: ${vm.place.diagnostic}`);
  lines.push(`status: ${vm.status}`);
  if (vm.moves.length > 0)
    lines.push(`moves: ${vm.moves.map((move) => `[${move.key}] ${move.label}`).join(' | ')}`);
  if (vm.rows.length > 0) {
    lines.push(`${vm.heading}${vm.sealedNote === null ? '' : ` (${vm.sealedNote})`}`);
    for (const row of vm.rows) {
      const marks = [row.sealed ? vm.sealedTag : '', row.landmark ? 'LANDMARK' : '', row.mark?.text ?? '']
        .filter((mark) => mark !== '')
        .join(' ');
      lines.push(`  ${row.ordinal} [${row.key}] ${row.label}${marks === '' ? '' : ` ${marks}`}`);
      for (const reading of row.readings) lines.push(`       ${reading.label}: ${reading.value}`);
    }
  }
  const { objects, telemetry } = vm.aside;
  if (objects !== null) {
    lines.push(
      `${objects.heading}: ${objects.empty === '' ? objects.tiles.map((tile) => `${tile.name} <${tile.key}>`).join(' | ') : objects.empty}`,
    );
  }
  if (telemetry !== null) {
    lines.push(
      `${telemetry.heading} ${telemetry.sync} ${telemetry.spectrogram.heading} ${telemetry.spectrogram.bars.join(' ')} ${telemetry.logs.heading} ${telemetry.logs.lines.join(' ')}`,
    );
  }
  lines.push(`dock: ${vm.dock.map((option) => `[${option.key}] ${option.label}`).join(' | ')}`);
  return lines.join('\n');
}

/**
 * The fixed path: the street a new world starts on, building `index`, its lobby, the corridor, door `index`,
 * the first room behind it and — when there is one — the next room. Every screen as the player reads it.
 */
function walk(seed: Seed, index: number): string {
  const engine = new GameEngine({
    world: realRegistry(),
    entropy: new FixedEntropySource([seed]),
    saves: new MemorySaveStore(),
  });
  engine.step('new-world');
  const screens: string[] = [];
  const show = (snapshot: GameSnapshot): void => {
    screens.push(page(presenter.toViewModel(snapshot)));
  };
  const travel = (snapshot: GameSnapshot, at: number): string => {
    const open = snapshot.options.filter((option) => option.role === 'travel' && !option.sealed);
    return open[at % open.length]?.id ?? '';
  };
  const street = engine.step('enter-world');
  show(street);
  const building = engine.step(travel(street, index));
  show(building);
  const lobby = engine.step(travel(building, building.options.filter((o) => o.role === 'travel').length - 1));
  show(lobby);
  const corridor = engine.step('move:corridor');
  show(corridor);
  const room = engine.step(travel(corridor, index));
  show(room);
  if (room.options.some((option) => option.id === 'move:forward')) show(engine.step('move:forward'));
  return `${screens.join('\n\n')}\n`;
}

/**
 * Golden pages: the full text of a fixed walk for three seeds, kept as files. One writer — `vitest run -u`
 * (see web/CLAUDE.md); read the diff before committing: a changed golden is a finding, never a chore.
 */
test.each([
  ['7F3A-91C2-0B4D-E6A8', new Seed(0x7f3a91c2, 0x0b4de6a8), 0],
  ['0000-0000-0000-0000', new Seed(0, 0), 1],
  ['0000-1234-0000-4660', new Seed(0x1234, 0x4660), 2],
])('seed %s, child %i of each list, street to room', async (name, seed, index) => {
  await expect(walk(seed, index)).toMatchFileSnapshot(`../goldens/${name}.txt`);
});
