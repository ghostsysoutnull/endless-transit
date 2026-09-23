import { describe, expect, test } from 'vitest';
import { Seed } from '#engine/rng/Seed.ts';
import { Coherence } from '#engine/rules/Coherence.ts';
import { GameEngine } from '#engine/rules/GameEngine.ts';
import type { GameSnapshot } from '#engine/rules/GameSnapshot.ts';
import type { MapSummary } from '#engine/rules/MapSummary.ts';
import { FixedEntropySource } from '#tests/support/FixedEntropySource.ts';
import { MemorySaveStore } from '#tests/support/MemorySaveStore.ts';
import { must, realRegistry } from '#tests/support/world.ts';

const FIRST = new Seed(0x7f3a91c2, 0x0b4de6a8);
const STREET = '0.0.0.0.0.0.0.0';
const BUILDING = `${STREET}.0`;
/** Layer −1 is child 16 of the sixteen-floor Ornate Sanctum. */
const LAYER = `${BUILDING}.16`;

function engineOn(saves = new MemorySaveStore(), debug = true): GameEngine {
  return new GameEngine({ world: realRegistry(), entropy: new FixedEntropySource([FIRST]), saves, debug });
}

function trailOf(path: string): string[] {
  const steps = path.split('.');
  return steps.map((_, depth) => steps.slice(0, depth + 1).join('.'));
}

function saveText(path: string, states: Record<string, string> = {}, coherence = 100): string {
  return JSON.stringify({
    version: 6,
    seed: '7F3A-91C2-0B4D-E6A8',
    path,
    states,
    coherence,
    steps: 0,
    visited: trailOf(path),
    buffer: [],
    resonant: 0,
  });
}

function onTheStreet(): GameEngine {
  const engine = engineOn();
  for (const id of ['new-world', 'enter-world']) engine.step(id);
  return engine;
}

function lattice(snapshot: GameSnapshot): MapSummary {
  return must(snapshot.place?.lattice ?? undefined, 'a lattice');
}

describe('the lattice map as data (Guide:92, 156, 279, 339-342; LatticeMapComponent.groovy:31-49)', () => {
  test('a street plots its buildings on the 30 × 15 grid — every child once, its own glyph, the visited ones marked — with the street as the origin', () => {
    const street = onTheStreet().snapshot();
    const map = lattice(street);
    expect(map).toEqual({
      width: 30,
      height: 15,
      origin: { name: 'Bright Boulevard', glyph: '═' },
      frame: 'yellow',
      abyssal: false,
      nodes: [
        { x: 7, y: 12, glyph: '⌂', name: 'Ornate Sanctum', visited: false, noise: false },
        { x: 15, y: 7, glyph: '⌂', name: 'The Spire of Static', visited: false, noise: false },
        { x: 12, y: 2, glyph: '⌂', name: 'ArchiveRoot', visited: false, noise: false },
        { x: 29, y: 14, glyph: '⌂', name: 'SpireFall', visited: false, noise: false },
      ],
      marks: [],
    });
  });

  test('two children never share a cell (Container.groovy:65-70): a city of fifteen streets, a building of twenty-six strata', () => {
    const engine = onTheStreet();
    for (let level = 0; level < 7; level++) engine.step('leave');
    for (const index of [0, 0, 0, 0, 2, 0]) engine.step(`enter:${String(index)}`);
    const city = lattice(engine.snapshot());
    expect(city.origin).toEqual({ name: 'Steamspire', glyph: '🏙' });
    expect(city.nodes).toHaveLength(15);
    expect(new Set(city.nodes.map((node) => `${String(node.x)},${String(node.y)}`)).size).toBe(15);
    expect(city.nodes.every((node) => node.x >= 0 && node.x < 30 && node.y >= 0 && node.y < 15)).toBe(true);
  });

  test('a node is the place as its parent lists it: the sixteen floors and, once breached, the ten Layers as ☠; a visited floor is bright', () => {
    const engine = engineOn(new MemorySaveStore(saveText(BUILDING)));
    const sealed = lattice(engine.snapshot());
    expect(sealed.origin).toEqual({ name: 'Ornate Sanctum', glyph: '⌂' });
    // The floors as the building lists them, top first (Guide:111); the Layers are not listed until the breach.
    expect(sealed.nodes.map((node) => node.name)).toEqual(
      Array.from({ length: 16 }, (_, n) => `Floor ${String(15 - n)}`),
    );
    expect(sealed.nodes.map((node) => node.glyph).join('')).toBe('▤'.repeat(16));
    expect(sealed.nodes.map((node) => node.visited)).toEqual(Array<boolean>(16).fill(false));
    const breached = engineOn(
      new MemorySaveStore(saveText(LAYER, { [BUILDING]: '{"elevator":-1,"breached":true}' })),
    );
    const layer = breached.snapshot();
    expect(layer.place?.abyssal).toBe(true);
    const below = lattice(layer);
    expect(below.abyssal).toBe(true);
    expect(below.origin).toEqual({ name: 'Layer -0x1', glyph: '☠' });
    // A floor's map is its doors, at the elevator too; below the bedrock every node is ☠ (Guide:279), whatever kind stands there.
    expect(below.nodes.map((node) => node.noise)).toEqual([
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      true,
      false,
    ]);
    expect(below.nodes.map((node) => node.glyph).join('')).toBe('☠☠☠☠☠☠☠X☠');
    expect(below.nodes.map((node) => node.name)).toEqual([
      'Frosted Crystal Pane [HUMMING]',
      'Bone-Lattice Aperture [HUMMING]',
      'Heavy Bulkhead',
      'Frosted Crystal Pane [POLISHED]',
      'Bone-Lattice Aperture [PITTED]',
      'Frosted Crystal Pane [RUSTED]',
      'Pitted Concrete [STATIC]',
      '[LATTICE] Reinforced Polymer [COLD]',
      'Pitted Concrete [SCORCHED]',
    ]);
    breached.step('leave');
    const building = lattice(breached.snapshot());
    expect(building.abyssal).toBe(false);
    expect(
      building.nodes
        .slice(16)
        .map((node) => node.glyph)
        .join(''),
    ).toBe('☠'.repeat(10));
    expect(
      building.nodes
        .slice(0, 16)
        .map((node) => node.glyph)
        .join(''),
    ).toBe('▤'.repeat(16));
    expect(building.nodes).toHaveLength(26);
    expect(building.nodes.filter((node) => node.visited).map((node) => node.name)).toEqual(['Layer -0x1']);
  });

  test('a room has no map (Guide:92); the pane map stops at the building (Guide:339): a Floor plots its rooms only through MAP', () => {
    const engine = onTheStreet();
    for (const id of ['enter:0', 'enter:15', 'move:corridor', 'enter:0']) engine.step(id);
    const room = engine.snapshot();
    expect(room.place?.kind).toBe('Room');
    expect(room.place?.lattice).toBeNull();
    expect(room.place?.telemetry).not.toBeNull();
    engine.step('leave');
    const corridor = engine.snapshot();
    expect(corridor.place?.lattice?.nodes).toHaveLength(9);
    expect(corridor.place?.lattice?.nodes.map((node) => node.glyph)).toEqual(Array<string>(9).fill('🚪'));
    // A door is named as the corridor names it; the one walked through is the visited one.
    expect(corridor.place?.lattice?.nodes.map((node) => `${node.name}${node.visited ? ' *' : ''}`)).toEqual([
      '_void_sink_ Brutalist Slab [PITTED] *',
      'Lacquered Timber Gate [WEEPING]',
      '⟨RESONANCE⟩ Synth-Glass Slab [PITTED]',
      '_quarantine_ Riveted Iron Hatch [FROZEN]',
      'Industrial Barrier [SCORCHED]',
      'Synth-Glass Slab [PITTED]',
      'Frosted Crystal Pane [WEEPING]',
      'Synth-Glass Slab [SCORCHED]',
      'Reinforced Polymer [RUSTED]',
    ]);
    expect(corridor.place?.telemetry).not.toBeNull();
    // The same doors at the elevator: a floor's map is its own rooms in either mode.
    expect(engine.step('move:elevator').place?.lattice).toEqual(corridor.place?.lattice);
  });

  test('below 30 Coherence the map sprouts magenta X marks, one more every two points down, placed by the frame (Guide:156; LatticeMapComponent.groovy:43-49)', () => {
    expect(new Coherence(30).glitchMarks()).toBe(0);
    expect(new Coherence(29).glitchMarks()).toBe(0);
    expect(new Coherence(28).glitchMarks()).toBe(1);
    expect(new Coherence(10).glitchMarks()).toBe(10);
    expect(new Coherence(1).glitchMarks()).toBe(14);
    expect(new Coherence(0).glitchMarks()).toBe(15);
    const engine = onTheStreet();
    engine.step('debug:integrity:30');
    expect(lattice(engine.snapshot()).marks).toEqual([]);
    engine.step('debug:integrity:1');
    const marks = lattice(engine.snapshot()).marks;
    expect(marks).toHaveLength(14);
    expect(marks[0]).toEqual({ x: 5, y: 11 });
    expect(marks[13]).toEqual({ x: 13, y: 4 });
    expect(marks.every((mark) => mark.x >= 0 && mark.x < 30 && mark.y >= 0 && mark.y < 15)).toBe(true);
  });

  test('the marks and the static are drawn on the frame: the same place at the same step draws the same, a move draws another, a reload finds them as they were', () => {
    const saves = new MemorySaveStore();
    const engine = engineOn(saves);
    for (const id of ['new-world', 'enter-world', 'debug:integrity:1']) engine.step(id);
    const first = lattice(engine.snapshot());
    expect(lattice(engine.snapshot())).toEqual(first);
    expect(lattice(engine.step('debug:integrity:1'))).toEqual(first);
    expect(lattice(engineOn(new MemorySaveStore(saves.load())).snapshot())).toEqual(first);
    engine.step('enter:0');
    const moved = lattice(engine.step('leave'));
    expect(moved.nodes.map((node) => node.name)).toEqual(first.nodes.map((node) => node.name));
    expect(moved.marks).not.toEqual(first.marks);
  });

  test('below the bedrock the static eats into the nodes (TelemetryComponent.groovy:31-46): about one node in twelve shows a red glyph', () => {
    const engine = engineOn(
      new MemorySaveStore(saveText(BUILDING, { [BUILDING]: '{"elevator":-1,"breached":true}' })),
    );
    let noisy = 0;
    let steps = 0;
    for (let i = 0; i < 40; i++) {
      engine.step('debug:integrity:100');
      engine.step('enter:16');
      const layer = lattice(engine.snapshot());
      noisy += layer.nodes.filter((node) => node.noise).length;
      steps += layer.nodes.length;
      for (const node of layer.nodes.filter((node) => node.noise)) expect(node.glyph).not.toBe('☠');
      engine.step('leave');
    }
    expect(noisy / steps).toBeGreaterThan(0.03);
    expect(noisy / steps).toBeLessThan(0.15);
    expect(lattice(engine.snapshot()).nodes.some((node) => node.noise)).toBe(false);
  });
});

describe('MAP and TRACE — global commands whose panel lasts one step (Guide:91-92, 134)', () => {
  test('MAP costs one and counts no step; the panel is the lattice; the next step clears it; a reload has none', () => {
    const saves = new MemorySaveStore();
    const engine = engineOn(saves);
    for (const id of ['new-world', 'enter-world']) engine.step(id);
    expect(engine.snapshot().map).toBeNull();
    const shown = engine.step('map');
    expect(shown.player).toEqual({ coherence: 99, band: 'stable', steps: 0 });
    expect(shown.message).toBe('NEURAL_LATTICE_PROJECTION: 4 nodes plotted from Bright Boulevard.');
    expect(shown.map).toEqual(shown.place?.lattice);
    expect(engine.snapshot().map).toEqual(shown.map);
    expect(engine.step('enter:0').map).toBeNull();
    expect(engineOn(new MemorySaveStore(saves.load())).snapshot().map).toBeNull();
    for (const id of ['enter:15', 'move:corridor', 'enter:0']) engine.step(id);
    const room = engine.step('map');
    expect(room.map).toBeNull();
    expect(room.message).toBe('SCAN_ERROR: Current location does not support spatial projection.');
    expect(room.player?.coherence).toBe(94);
  });

  test('TRACE costs one and counts no step; the panel is the trail with each level’s type, name and note, the last one current', () => {
    const engine = engineOn(
      new MemorySaveStore(saveText(`${BUILDING}.15`, { [BUILDING]: '{"elevator":15}' })),
    );
    expect(engine.snapshot().trace).toBeNull();
    const shown = engine.step('trace');
    expect(shown.player).toEqual({ coherence: 99, band: 'stable', steps: 0 });
    expect(shown.message).toBe('NEURAL_LATTICE_TRACE_INITIATED: 10 levels from the universe.');
    expect(
      shown.trace?.steps.map(
        (step) => `${String(step.depth)} ${step.icon} ${step.kind} : ${step.name}${step.meta}`,
      ),
    ).toEqual([
      '0 ∞ Universe : The Endless Universe',
      '1 » Cosmic filament : Zeta-915-Link',
      '2 ○ Galactic sector : Outer Expanse 91',
      '3 ☼ Solar system : Zeta Borealis',
      '4 ⊕ Planet : Auraea [SURFACE | ERA: FUTURE]',
      '5 ⬚ Country : Southern Glacier Kingdom [TRAIT: INDUSTRIAL]',
      '6 🏙 City : Rainhaven',
      '7 ═ Street : Bright Boulevard',
      '8 ⌂ Building : Ornate Sanctum [FLOORS: 16]',
      '9 ▤ Floor : Floor 15',
    ]);
    expect(shown.trace?.steps.map((step) => step.current)).toEqual([...Array<boolean>(9).fill(false), true]);
    expect(shown.trace?.steps.every((step) => !step.abyssal)).toBe(true);
    expect(engine.snapshot().trace).toEqual(shown.trace);
    expect(engine.step('move:corridor').trace).toBeNull();
  });

  test('below the bedrock the trace reads BREACHED on the building and the void on every level under it', () => {
    const engine = engineOn(
      new MemorySaveStore(
        saveText(`${LAYER}.0.0.0`, { [BUILDING]: '{"elevator":-1,"breached":true}', [LAYER]: 'corridor' }),
      ),
    );
    const shown = engine.step('trace');
    expect(
      shown.trace?.steps.slice(8).map((step) => `${step.icon} ${step.kind} : ${step.name}${step.meta}`),
    ).toEqual([
      '⌂ Building : Ornate Sanctum [BREACHED]',
      '▤ Layer : Layer -0x1',
      '▅ Artery : Artery',
      '🚪 Crypt : Frosted Crystal Pane [HUMMING]',
      '☠ Shard : Inverted Processing Core',
    ]);
    expect(shown.trace?.steps.map((step) => step.abyssal)).toEqual([
      ...Array<boolean>(9).fill(false),
      true,
      true,
      true,
      true,
    ]);
  });

  test('MAP and TRACE are on offer everywhere in the world, never at the title; MAP is keyed m, TRACE has no key', () => {
    const engine = engineOn();
    expect(engine.snapshot().options.map((option) => option.id)).toEqual(['new-world']);
    engine.step('new-world');
    expect(engine.snapshot().options.map((option) => option.id)).toEqual(['enter-world', 'reroll']);
    const street = engine.step('enter-world');
    const system = street.options.filter((option) => option.role === 'system');
    expect(system.map((option) => `${option.id}:${option.key}:${option.label}`)).toEqual([
      'scan:s:Scan',
      'map:m:Map',
      'buffer:i:Buffer',
      'trace::Trace',
      'to-title:t:Title screen',
      'recap:q:End session',
    ]);
  });
});
