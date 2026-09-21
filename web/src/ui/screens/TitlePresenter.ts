import type { GameSnapshot } from '#engine/rules/GameSnapshot.ts';
import type { Presenter } from '#ui/Presenter.ts';
import type { TitleVM } from './TitleVM.ts';

/**
 * Owns the words and casing of the title screen — every one of them, region names included: engine
 * snapshot in, view-model out. No DOM. The view draws what this carries and adds no word of its own.
 */
export class TitlePresenter implements Presenter<TitleVM> {
  readonly #buildId: string;

  /** `buildId` names the build this page was made from (the composition root reads it; `dev` when unset). */
  constructor(buildId: string) {
    this.#buildId = buildId;
  }

  /** The title is the screen of a game that stands nowhere yet. */
  accepts(snapshot: GameSnapshot): boolean {
    return snapshot.place === null;
  }

  toViewModel(snapshot: GameSnapshot): TitleVM {
    return {
      scene: 'title',
      title: 'ENDLESS TRANSIT',
      tagline: 'Vinculum neural interface · lattice uplink',
      stageLine: snapshot.world === null ? 'AWAITING SEED' : 'WORLD LOCKED',
      world:
        snapshot.world === null
          ? null
          : {
              nameLabel: 'UNIVERSE',
              name: snapshot.world.name.toUpperCase(),
              seedLabel: 'SEED',
              seed: snapshot.world.seed,
            },
      prompt: 'NO WORLD LOADED. DRAW A SEED TO BEGIN.',
      options: snapshot.options.map((option) => ({
        id: option.id,
        key: option.key.toUpperCase(),
        label: option.label.toUpperCase(),
      })),
      status: snapshot.message,
      build: `build ${this.#buildId}`,
      regions: { stage: 'Uplink', world: 'World', actions: 'Actions' },
    };
  }
}
