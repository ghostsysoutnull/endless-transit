import type { GameSnapshot } from '#engine/rules/GameSnapshot.ts';
import type { TitleVM } from './TitleVM.ts';

/** Owns the words and casing of the title screen: engine snapshot in, view-model out. No DOM. */
export class TitlePresenter {
  toViewModel(snapshot: GameSnapshot): TitleVM {
    return {
      title: 'ENDLESS TRANSIT',
      tagline: 'Vinculum neural interface · lattice uplink',
      world:
        snapshot.world === null
          ? null
          : { seed: snapshot.world.seed, name: snapshot.world.name.toUpperCase() },
      prompt: 'NO WORLD LOADED. DRAW A SEED TO BEGIN.',
      options: snapshot.options.map((option) => ({
        id: option.id,
        key: option.key.toUpperCase(),
        label: option.label.toUpperCase(),
      })),
      status: snapshot.message,
    };
  }
}
