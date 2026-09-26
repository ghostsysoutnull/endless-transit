import type { GameOption } from './GameOption.ts';

/** The plain-data factory for an option about the game itself (not a place, not a move) — a value, so no class. */
export function systemOption(id: string, key: string, label: string): GameOption {
  return {
    id,
    key,
    label,
    place: '',
    role: 'system',
    sealed: false,
    landmark: false,
    ordinal: '',
    readings: [],
    opposite: '',
    current: false,
    visited: false,
    address: '',
    figure: null,
    numbered: false,
  };
}
