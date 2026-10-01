import type { CardTurn } from './CardTurn.ts';

/** The turn that does not move (U03e): the other face is there at once — reduced motion. */
export class InstantTurn implements CardTurn {
  key(): string {
    return 'instant';
  }

  play(): Promise<void> {
    return Promise.resolve();
  }
}
