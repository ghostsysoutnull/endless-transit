import { describe, expect, test } from 'vitest';
import { Seed } from '#engine/rng/Seed.ts';
import { GameEngine } from '#engine/rules/GameEngine.ts';
import type { GameSnapshot } from '#engine/rules/GameSnapshot.ts';
import { FixedEntropySource } from '#tests/support/FixedEntropySource.ts';
import { MemorySaveStore } from '#tests/support/MemorySaveStore.ts';
import { realRegistry } from '#tests/support/world.ts';

const FIRST = new Seed(0x7f3a91c2, 0x0b4de6a8);
const ZERO = new Seed(0, 0);
const BUILDING = '0.0.0.0.0.0.0.0.0';
const FIRST_ROOM = `${BUILDING}.0.0.0.0`;
/** Layer −1 is child 16 of the sixteen-floor Ornate Sanctum. */
const LAYER = `${BUILDING}.16`;

function engineOn(seed: Seed, saves = new MemorySaveStore(), debug = true): GameEngine {
  return new GameEngine({ world: realRegistry(), entropy: new FixedEntropySource([seed]), saves, debug });
}

/** Every address from the universe down to `path`. */
function trailOf(path: string): string[] {
  const steps = path.split('.');
  return steps.map((_, depth) => steps.slice(0, depth + 1).join('.'));
}

function saveText(
  path: string,
  states: Record<string, string> = {},
  traveller: { buffer?: readonly unknown[]; visited?: readonly string[]; version?: number } = {},
): string {
  return JSON.stringify({
    version: traveller.version ?? 6,
    seed: '7F3A-91C2-0B4D-E6A8',
    path,
    states,
    coherence: 100,
    steps: 0,
    visited: traveller.visited ?? trailOf(path),
    buffer: traveller.buffer ?? [],
    resonant: 0,
  });
}

function moves(snapshot: GameSnapshot): string[] {
  return snapshot.options.filter((option) => option.role === 'move').map((option) => option.id);
}

/** Ornate Sanctum's first room, primed by the debug tool, the Keystone forged from the two relics there (the walk's Hidden Frequencies sit at 0 and 3). */
function withTheKeystone(engine: GameEngine): GameSnapshot {
  for (const id of ['new-world', 'enter-world', 'enter:0', 'enter:15', 'move:corridor', 'enter:0'])
    engine.step(id);
  engine.step('debug:prime');
  engine.step('capture:0');
  engine.step('capture:0');
  engine.step('buffer');
  engine.step('pick:1');
  return engine.step('pick:2');
}

/** …and up to the Peak, at the elevator. */
function onThePeak(engine: GameEngine): GameSnapshot {
  withTheKeystone(engine);
  engine.step('close');
  engine.step('leave');
  let snapshot = engine.step('move:elevator');
  for (let floor = 0; floor < 15; floor++) snapshot = engine.step('move:up');
  return snapshot;
}

describe('SCAN — a global command whose panel lasts one step (Guide:87, 134, 227-231)', () => {
  test('costs one and counts no step; in a room it is the strata overview with the visited rooms marked; anywhere else it says so; the next step clears it', () => {
    const saves = new MemorySaveStore();
    const engine = engineOn(FIRST, saves);
    for (const id of ['new-world', 'enter-world']) engine.step(id);
    const street = engine.step('scan');
    expect(street.player).toEqual({ coherence: 99, band: 'stable', steps: 0 });
    expect(street.message).toBe('No scan-compatible structure detected in this strata.');
    expect(street.scan).toBeNull();
    for (const id of ['enter:0', 'enter:15', 'move:corridor', 'enter:0']) engine.step(id);
    const room = engine.step('scan');
    expect(room.player).toEqual({ coherence: 94, band: 'stable', steps: 4 });
    expect(room.message).toBe(
      `LOCAL_LATTICE_SCAN_INITIATED [LOCUS: ${FIRST_ROOM}]. SCAN_COMPLETE. LOCAL_PHASE_SYNCHRONIZED.`,
    );
    expect(room.scan?.title).toBe('[STRATA_OVERVIEW]');
    expect(room.scan?.rows.map((row) => row.cells.map((cell) => cell.value))).toEqual([
      ['01', '1944Hz', '~~~', '[VISITED]', 'Power Plant', 'Grand Power Plant'],
      ['02', '1704Hz', '~~~', '[UNSTABLE]', 'Maintenance Bay', 'Baroque Maintenance Bay'],
    ]);
    expect(engine.step('move:forward').scan).toBeNull();
    // A scan is never a step: the lottery does not roll on it (Guide:189-190).
    expect(engine.step('scan').buffer?.size).toBe(1);
    expect(engine.snapshot().scan).not.toBeNull();
    // The panel is not part of the save: a reload has none.
    expect(engineOn(FIRST, new MemorySaveStore(saves.load())).snapshot().scan).toBeNull();
  });

  test('at an elevator the panel is the strata pulse; in the corridor the door table with the sensory line', () => {
    const engine = engineOn(FIRST);
    for (const id of ['new-world', 'enter-world', 'enter:0', 'enter:15']) engine.step(id);
    const pulse = engine.step('scan');
    expect(pulse.scan?.title).toBe('NEURAL_PROXIMITY_REPORT');
    expect(pulse.scan?.notes).toEqual(['BUILDING: Ornate Sanctum', 'TOTAL_STRATA: 16 units detected.']);
    expect(pulse.scan?.rows.map((row) => [row.cells[0]?.value, row.current])).toEqual([
      ['02', false],
      ['01', false],
      ['00', true],
    ]);
    engine.step('move:corridor');
    const doors = engine.step('scan');
    expect(doors.scan?.title).toBe('[DATA_SUMMARY]');
    expect(doors.scan?.rows).toHaveLength(9);
    expect(doors.scan?.rows[0]?.cells.map((cell) => `${cell.label}=${cell.value}`)).toEqual([
      'ID=01',
      'TRACE=Ozone',
      'INSCRIPTION=_void_sink_',
      'MATERIAL=Brutalist Slab',
      'STATE=Pitted',
      'ROOM_TYPE=Power Plant',
    ]);
    expect(doors.scan?.rows[0]?.note).toContain('A sharp smell of ozone escapes the frame');
  });
});

describe('the echo hunt in a Null Reach (Guide:116, 192-195; NullSector.groovy:84-113)', () => {
  test('e scans until the signal locks at 100, then c captures the echo once; both are steps; nothing is offered afterwards', () => {
    const saves = new MemorySaveStore();
    const engine = engineOn(ZERO, saves);
    let snapshot = engine.snapshot();
    // Seed 0000-…: Broad Alley lies under Null Reach F4E, five leaves up.
    for (const id of ['new-world', 'enter-world', 'leave', 'leave', 'leave', 'leave', 'leave'])
      snapshot = engine.step(id);
    expect(snapshot.place?.name).toBe('Null Reach F4E');
    expect(snapshot.place?.status).toBe('SIGNAL: [SCAN_REQUIRED]');
    expect(snapshot.options.find((option) => option.id === 'echo')).toMatchObject({
      key: 'e',
      label: 'Scan for spectral echoes',
      role: 'move',
    });
    expect(moves(snapshot)).toEqual(['echo']);
    const readings: string[] = [];
    while (!snapshot.options.some((option) => option.id === 'capture-echo')) {
      snapshot = engine.step('echo');
      readings.push(snapshot.place?.status ?? '');
    }
    expect(readings).toEqual(['SIGNAL: 10%', 'SIGNAL: 32%', 'SIGNAL: 63%', 'SIGNAL: 89%', 'SIGNAL: 100%']);
    expect(snapshot.message).toBe('HARMONIC_LOCK_ESTABLISHED: Spectral Echo isolated. Signal 100%.');
    expect(snapshot.player).toEqual({ coherence: 90, band: 'stable', steps: 10 });
    expect(snapshot.options.find((option) => option.id === 'capture-echo')).toMatchObject({
      key: 'c',
      label: 'Capture Spectral Echo',
      role: 'move',
      sealed: false,
    });
    const captured = engine.step('capture-echo');
    expect(captured.message).toBe('VOID_RESONANCE: Echo captured and stabilized. Frequency: 9958 Hz.');
    expect(captured.buffer?.fragments).toEqual([
      { key: 'echo(0.0.0)', name: 'Spectral Echo', hertz: 9958, resonant: false },
    ]);
    expect(captured.place?.status).toBe('SIGNAL: [HARVESTED]');
    expect(captured.place?.description).toEqual([
      'A silent void. The spectral resonance has been harvested.',
    ]);
    expect(moves(captured)).toEqual([]);
    expect(engine.step('echo').message).toBe(captured.message);
    // The hunt is in the save: a reload finds the echo gone (Guide:369-370 said the old save did not).
    expect(saves.load()).toContain('"0.0.0":"{\\"found\\":true}"');
    expect(engineOn(ZERO, new MemorySaveStore(saves.load())).snapshot().place?.status).toBe(
      'SIGNAL: [HARVESTED]',
    );
  });
});

describe('the ritual (Guide:257-276): prime, forge, breach — and the descent (Guide:277-298)', () => {
  test('the merge inside a primed building forges its Keystone (0 Hz, no badge) and says so; a second merge is a hybrid again', () => {
    const engine = engineOn(FIRST);
    const forged = withTheKeystone(engine);
    expect(forged.message).toBe(
      'Critical waveform collapse: KEYSTONE_STABILIZED. The fragments merge into a silent, heavy anchor: Ornate Sanctum Keystone. Coherence +15.',
    );
    expect(forged.buffer?.fragments.map((f) => [f.name, f.hertz, f.resonant])).toEqual([
      ['Hidden Frequency', 1243085, false],
      ['Hidden Frequency', 1415632, false],
      ['Ornate Sanctum Keystone', 0, false],
    ]);
    expect(forged.buffer?.resonant).toBe(2);
    engine.step('pick:0');
    const again = engine.step('pick:1');
    expect(again.message).toBe('Synthesis complete: Hidden-Hidden Hybrid (2658717 Hz). Coherence +15.');
    expect(again.buffer?.fragments.map((f) => f.name)).toEqual([
      'Ornate Sanctum Keystone',
      'Hidden-Hidden Hybrid',
    ]);
  });

  test('the debug tools exist only in debug mode and only indoors; the Keystone can be spawned outright (Guide:439)', () => {
    const plain = engineOn(FIRST, new MemorySaveStore(), false);
    for (const id of ['new-world', 'enter-world', 'enter:0']) plain.step(id);
    expect(plain.snapshot().options.filter((option) => option.role === 'debug')).toEqual([]);
    const engine = engineOn(FIRST);
    for (const id of ['new-world', 'enter-world']) engine.step(id);
    expect(engine.snapshot().options.map((option) => option.id)).not.toContain('debug:prime');
    engine.step('enter:0');
    expect(engine.snapshot().options.map((option) => option.id)).toContain('debug:keystone');
    const spawned = engine.step('debug:keystone');
    expect(spawned.message).toBe('Ornate Sanctum Keystone generated in the trace buffer.');
    expect(spawned.player?.coherence).toBe(99);
    expect(spawned.buffer?.fragments[0]?.name).toBe('Ornate Sanctum Keystone');
  });

  test('the breach is offered on the Peak only — at the elevator and in the corridor — keyed j; it spends the Keystone and marks the building; the layers are listed below the lobby', () => {
    const saves = new MemorySaveStore();
    const engine = engineOn(FIRST, saves);
    const peak = onThePeak(engine);
    expect(peak.place?.name).toBe('Floor 15');
    expect(peak.options.filter((option) => option.role === 'move')).toEqual([
      expect.objectContaining({ id: 'move:down' }),
      expect.objectContaining({ id: 'move:corridor' }),
      expect.objectContaining({ id: 'breach', key: 'j', label: 'Breach the Bedrock', opposite: '' }),
    ]);
    expect(moves(engine.step('move:corridor'))).toEqual(['move:elevator', 'breach']);
    engine.step('move:elevator');
    expect(moves(engine.step('move:down'))).toEqual(['move:up', 'move:down', 'move:corridor']);
    const back = engine.step('move:up');
    const breached = engine.step('breach');
    expect(breached.message).toBe(
      'HARMONIC_INVERSION_PROTOCOL_ENGAGED — breaching the bedrock substrate. Lattice weight normalized: aperture opening at root. The Keystone is spent.',
    );
    expect(breached.player?.steps).toBe((back.player?.steps ?? 0) + 1);
    expect(breached.buffer?.fragments.map((f) => f.name)).toEqual(['Hidden Frequency', 'Hidden Frequency']);
    expect(moves(breached)).toEqual(['move:down', 'move:corridor']);
    expect(saves.load()).toContain(
      `"${BUILDING}":"{\\"elevator\\":15,\\"sampled\\":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],\\"merges\\":8,\\"breached\\":true}"`,
    );
    const building = engine.step('leave');
    expect(building.place?.status).toBe('BEDROCK_BREACHED');
    const listed = building.options.filter((option) => option.role === 'travel');
    expect(listed).toHaveLength(26);
    expect(listed.slice(16).map((option) => [option.id, option.ordinal, option.key, option.label])).toEqual(
      Array.from({ length: 10 }, (_, k) => [
        `enter:${String(16 + k)}`,
        String(-1 - k),
        '',
        `Access: Layer -0x${(k + 1).toString(16).toUpperCase()}`,
      ]),
    );
    expect(listed[16]?.readings.map((fact) => fact.value)).toEqual(['ABYSSAL_SUBSTRATE', 'P: 10%', '1138Hz']);
  });

  test('from the lobby of a breached building, d is Descend into the Substrate: Layer −1, abyssal, STRATA 1 of 10, double drain, the void’s voice; down again to −2, up again to the lobby', () => {
    const engine = engineOn(FIRST);
    onThePeak(engine);
    engine.step('breach');
    engine.step('leave');
    const lobby = engine.step('enter:15');
    expect(lobby.options.filter((option) => option.role === 'move')).toEqual([
      expect.objectContaining({ id: 'move:up', key: 'u', label: 'Go Up', opposite: 'move:down' }),
      expect.objectContaining({
        id: 'move:descend',
        key: 'd',
        label: 'Descend into the Substrate',
        opposite: 'move:up',
      }),
      expect.objectContaining({ id: 'move:corridor' }),
    ]);
    const before = lobby.player?.coherence ?? 0;
    const layer = engine.step('move:descend');
    expect(layer.message).toBe('Entered Layer -0x1.');
    expect(layer.place).toMatchObject({
      kind: 'Layer',
      icon: '▤',
      name: 'Layer -0x1',
      address: LAYER,
      abyssal: true,
      position: { label: 'STRATA', index: 1, total: 10 },
      status: 'SYSTEM_STATUS: [ABYSS_SYNC]',
      description: [
        'Layer -0x1. The air is thick with oily static and the hum of abyssal substrate.',
        'Local signal is STABLE. Corridor access authorized.',
      ],
    });
    expect([
      null,
      'It is cold down here.',
      'We see you.',
      'Return to the surface.',
      'Bedrock approaching.',
    ]).toContain(layer.place?.telemetry?.voice);
    // The tap that descended cost one (the lobby's); every prompt on the Layer costs two (Guide:137-138).
    expect(layer.player?.coherence).toBe(before - 1);
    expect(engine.step('scan').player?.coherence).toBe(before - 3);
    expect(
      engine.snapshot().scan?.rows.map((row) => [row.cells[0]?.value, row.cells[1]?.value, row.current]),
    ).toEqual([
      ['01', 'POWER_RELAY', false],
      ['00', 'TRANSIT_LOBBY', false],
      ['-1', 'ABYSSAL_SUBSTRATE', true],
      ['-2', 'ABYSSAL_SUBSTRATE', false],
      ['-3', 'ABYSSAL_SUBSTRATE', false],
    ]);
    expect(moves(layer)).toEqual(['move:up', 'move:down', 'move:corridor']);
    expect(engine.step('move:down').place?.name).toBe('Layer -0x2');
    expect(engine.step('move:up').place?.name).toBe('Layer -0x1');
    expect(engine.step('move:up').place?.name).toBe('Floor 0');
  });

  test('below the Layer: the Artery, a Crypt’s Shard with ☠ on the path, abyssal objects that resonate; the recap’s ending is the void; the save restores there', () => {
    const saves = new MemorySaveStore();
    const engine = engineOn(FIRST, saves);
    onThePeak(engine);
    engine.step('breach');
    engine.step('leave');
    engine.step('enter:15');
    engine.step('move:descend');
    const artery = engine.step('move:corridor');
    expect(artery.place).toMatchObject({
      kind: 'Layer',
      name: 'Layer -0x1',
      abyssal: true,
      status: 'TRAFFIC: [PRESSURE_HIGH] | THEME: [ABYSSAL]',
      facts: [{ key: 'culture', label: 'THEME', value: 'abyssal' }],
      description: ['A pulsing, organic artery of data.'],
    });
    expect(artery.options.filter((option) => option.role === 'travel')).toHaveLength(9);
    const shard = engine.step('enter:0');
    expect(shard.message).toBe('Entered Inverted Processing Core.');
    expect(shard.place).toMatchObject({
      kind: 'Shard',
      icon: '☠',
      name: 'Inverted Processing Core',
      abyssal: true,
      frame: 'abyssal',
      position: { label: 'SHARD', index: 1, total: 8 },
    });
    expect(shard.place?.facts[0]).toEqual({ key: 'era', label: 'TEMPORAL_MARKER', value: 'atomic' });
    expect(shard.place?.trail.slice(9).map((step) => `${step.icon} ${step.name}`)).toEqual([
      '▤ Layer -0x1',
      '▅ Artery',
      '🚪 Frosted Crystal Pane [HUMMING]',
      '☠ Inverted Processing Core',
    ]);
    expect(shard.place?.contents?.objects.map((object) => object.name)).toEqual([
      'null reference infused with radar dish',
    ]);
    const taken = engine.step('capture:0');
    expect(taken.message).toContain(
      'Captured null reference infused with radar dish. Frequency: 3458 Hz. Harmonic resonance: +10%.',
    );
    expect(taken.buffer?.resonant).toBe(3);
    expect(engine.step('recap').prompt).toMatchObject({ id: 'recap', outcome: 'void' });
    engine.step('resume');
    // A save made below the bedrock restores where it stood (Guide:401), the breach recalled before the Layer is asked for.
    const restored = engineOn(FIRST, new MemorySaveStore(saves.load())).snapshot();
    expect(restored.place?.name).toBe('Inverted Processing Core');
    expect(restored.place?.abyssal).toBe(true);
    expect(restored.buffer?.size).toBe(taken.buffer?.size);
    expect(saves.load()).toContain(`"${LAYER}":"corridor"`);
  });

  test('dying below the bedrock: the reboot rebuilds the world — the building sealed again, its ritual gone — and the Keystone survives in the buffer (Guide:145-147, 291-293)', () => {
    const engine = engineOn(FIRST);
    withTheKeystone(engine);
    engine.step('close');
    engine.step('debug:keystone'); // a second one, held while the first is spent: the building's own, bound by address
    engine.step('leave');
    engine.step('move:elevator');
    for (let floor = 0; floor < 15; floor++) engine.step('move:up');
    expect(engine.step('breach').buffer?.fragments.map((f) => f.name)).toEqual([
      'Hidden Frequency',
      'Hidden Frequency',
      'Ornate Sanctum Keystone',
    ]);
    engine.step('leave');
    engine.step('enter:15');
    engine.step('move:descend');
    engine.step('debug:integrity:1');
    const dead = engine.step('move:down');
    expect(dead.prompt?.id).toBe('reboot');
    const reborn = engine.step('reboot');
    expect(reborn.place?.name).toBe('Bright Boulevard');
    expect(reborn.buffer?.fragments.map((f) => f.name)).toEqual([
      'Hidden Frequency',
      'Hidden Frequency',
      'Ornate Sanctum Keystone',
    ]);
    const building = engine.step('enter:0');
    expect(building.place?.status).toBe('STRUCTURAL_STABLE');
    expect(building.options.filter((option) => option.role === 'travel')).toHaveLength(16);
    expect(moves(engine.step('enter:15'))).toEqual(['move:up', 'move:corridor']);
    // The Keystone still fits its building: primed again, the Peak offers the breach without a new forge.
    engine.step('debug:prime');
    for (let floor = 0; floor < 15; floor++) engine.step('move:up');
    expect(moves(engine.snapshot())).toContain('breach');
  });

  test('strict restore: a Keystone from a room’s address, a Layer of an unbreached building, a v5 save — refused whole', () => {
    const cases: [string, string][] = [
      [
        'a keystone naming a room',
        saveText(
          FIRST_ROOM,
          { [`${BUILDING}.0`]: 'corridor' },
          { buffer: [{ kind: 'keystone', building: FIRST_ROOM }] },
        ),
      ],
      ['a layer without the breach', saveText(LAYER, {}, { visited: [...trailOf(BUILDING), LAYER] })],
      [
        'a layer with the breach but the elevator at the lobby',
        saveText(LAYER, { [BUILDING]: '{"breached":true}' }),
      ],
      ['a v5 save', saveText(FIRST_ROOM, { [`${BUILDING}.0`]: 'corridor' }, { version: 5 })],
    ];
    for (const [what, text] of cases) {
      const snapshot = engineOn(FIRST, new MemorySaveStore(text)).snapshot();
      expect(snapshot.place, what).toBeNull();
    }
    const good = saveText(LAYER, { [BUILDING]: '{"elevator":-1,"breached":true}' });
    expect(engineOn(FIRST, new MemorySaveStore(good)).snapshot().place?.name).toBe('Layer -0x1');
    const keystone = saveText(
      FIRST_ROOM,
      { [`${BUILDING}.0`]: 'corridor' },
      { buffer: [{ kind: 'keystone', building: BUILDING }] },
    );
    expect(engineOn(FIRST, new MemorySaveStore(keystone)).snapshot().buffer?.fragments[0]?.name).toBe(
      'Ornate Sanctum Keystone',
    );
  });
});
