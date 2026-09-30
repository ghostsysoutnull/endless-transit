import { Level } from '#engine/model/Level.ts';
import { NoPortrait } from '#engine/model/NoPortrait.ts';
import { TowerPortrait } from '#engine/model/TowerPortrait.ts';
import type { GameOption } from '#engine/rules/GameOption.ts';
import type { GameSnapshot } from '#engine/rules/GameSnapshot.ts';
import { Seed } from '#engine/rng/Seed.ts';
import { doorLook } from './doorLook.ts';
import { playerSummary } from './playerSummary.ts';
import { placeOf } from './snapshotParts.ts';

/** The world screen's snapshots: an option with defaults, a planet, a street and a building, shared by the tests of its presenter and its parts. */

export function option(facts: Partial<GameOption> & { id: string; label: string }): GameOption {
  return {
    key: '',
    place: '',
    role: 'travel',
    sealed: false,
    landmark: false,
    ordinal: '',
    readings: [],
    opposite: '',
    current: false,
    visited: false,
    address: '',
    numbered: false,
    ...facts,
  };
}

export const PLANET: GameSnapshot = {
  world: { seed: '7F3A-91C2-0B4D-E6A8', name: 'The Endless Universe' },
  place: {
    kind: 'Planet',
    icon: '⊕',
    name: 'Auraea',
    address: '0.0.0.0.1',
    position: { counted: true, label: 'ORBIT', index: 2, total: 5 },
    trail: [
      { icon: '∞', kind: 'Universe', name: 'The Endless Universe', address: '0' },
      { icon: '»', kind: 'Cosmic filament', name: 'Zeta-915-Link', address: '0.0' },
      { icon: '○', kind: 'Galactic sector', name: 'Outer Expanse 91', address: '0.0.0' },
      { icon: '☼', kind: 'Solar system', name: 'Zeta Borealis', address: '0.0.0.0' },
      { icon: '⊕', kind: 'Planet', name: 'Auraea', address: '0.0.0.0.1' },
    ],
    status: 'RESONANCE: [BAROQUE]',
    description: ['A world on the surface layer of the lattice, tuned to one culture and one era.'],
    facts: [
      { key: 'culture', label: 'RESONANCE', value: 'baroque' },
      { key: 'era', label: 'TIMELINE', value: 'future' },
    ],
    frame: 'yellow',
    abyssal: false,
    childrenHeading: 'Planetary landmasses scanned',
    contents: null,
    telemetry: null,
    lattice: null,
    portrait: new NoPortrait(),
    noise: new Seed(0, 0),
  },
  options: [
    option({
      id: 'enter:0',
      key: '1',
      label: 'Visit Southern Glacier Kingdom',
      place: 'Southern Glacier Kingdom',
      ordinal: '1',
    }),
    option({
      id: 'enter:1',
      key: '2',
      label: 'Visit Free Dust Union',
      place: 'Free Dust Union',
      ordinal: '2',
    }),
    option({ id: 'leave', key: 'l', label: 'Leave Planet', role: 'return' }),
    option({ id: 'to-title', key: 't', label: 'Title screen', role: 'system' }),
  ],
  player: playerSummary({ coherence: 87, steps: 12 }),
  buffer: { size: 0, resonant: 0, fragments: [] },
  prompt: null,
  message: 'Entered Auraea.',
  scan: null,
  map: null,
  trace: null,
};

export const STREET: GameSnapshot = {
  ...PLANET,
  place: {
    ...placeOf(PLANET),
    kind: 'Street',
    name: 'Bright Boulevard',
    address: '0.0.0.0.1.0.0.0',
  },
  options: [
    option({
      id: 'enter:0',
      label: 'Enter Building: Ornate Sanctum',
      place: 'Ornate Sanctum',
      sealed: true,
      ordinal: '1',
    }),
    option({
      id: 'enter:1',
      label: 'Enter Building: The Void-Watcher',
      place: 'The Void-Watcher',
      sealed: true,
      landmark: true,
      ordinal: '2',
    }),
    option({ id: 'leave', key: 'l', label: 'Leave Street', role: 'return' }),
    option({ id: 'to-title', key: 't', label: 'Title screen', role: 'system' }),
  ],
};

/** The tower snapshot's building. */
const TOWER = '0.0.0.0.1.0.0.0.0';

/** The address of the tower snapshot's level `number`, as the engine numbers its children: floor `n` is child `n`, Layer `-k` child `floors + k - 1`. */
function levelAddress(floors: number, number: number): string {
  return `${TOWER}.${String(number >= 0 ? number : floors - number - 1)}`;
}

/** A building of `floors` floors as the engine lists it (top first, `layers` Layers open after the lobby), the elevator at `car`, floor 3 visited. */
export function towerSnapshot(floors: number, car: number, layers = 0): GameSnapshot {
  return {
    ...STREET,
    place: {
      ...placeOf(STREET),
      kind: 'Building',
      name: 'Ornate Sanctum',
      portrait: new TowerPortrait({
        address: TOWER,
        landmark: true,
        car,
        rows: [
          ...Array.from({ length: layers }, (_, k) => ({
            address: levelAddress(floors, k - layers),
            level: new Level(k - layers, 'layer'),
            shape: 'none' as const,
            looks: [],
          })),
          ...Array.from({ length: floors }, (_, number) => ({
            address: levelAddress(floors, number),
            level: new Level(number, 'floor'),
            shape: 'curved' as const,
            looks: [
              doorLook({ state: 'Frozen', stateLook: 'frost' }),
              doorLook({ material: 'Pitted Concrete', family: 'stone' }),
            ],
          })),
        ],
      }),
      address: TOWER,
      childrenHeading: 'Ride to a floor',
    },
    options: [
      ...Array.from({ length: floors }, (_, index) => {
        const number = floors - 1 - index;
        return option({
          id: `enter:${String(index)}`,
          label: `Ride to Floor ${String(number)}`,
          place: `Floor ${String(number)}`,
          ordinal: String(number),
          current: number === car,
          visited: number === 3,
          numbered: true,
          address: levelAddress(floors, number),
          readings: [{ key: 'zone', label: 'Zone', value: 'Living unit' }],
        });
      }),
      ...Array.from({ length: layers }, (_, index) => {
        const number = -1 - index;
        return option({
          id: `enter:${String(floors + index)}`,
          label: `Ride to Layer ${String(number)}`,
          place: `Layer ${String(number)}`,
          ordinal: String(number),
          numbered: true,
          address: levelAddress(floors, number),
        });
      }),
      option({ id: 'leave', key: 'l', label: 'Leave Building', role: 'return' }),
    ],
  };
}
