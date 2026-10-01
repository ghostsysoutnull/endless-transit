import type { ChildMark } from './ChildMark.ts';
import type { Flight } from './Flight.ts';
import type { KeySlot } from './KeySlot.ts';
import type { LineScene } from './LineScene.ts';
import { PlanScene } from './PlanScene.ts';
import type { PlanSketch } from './PlanSketch.ts';
import type { SceneHosts } from './SceneHosts.ts';
import type { SceneViewParts } from './SceneViewParts.ts';
import { SceneView } from './SceneView.ts';
import type { StagedScene } from './StagedScene.ts';

/** Makes a scene host of each kind (U02, U03: the plan's, with the relic's flight and its MAP key's slot), with the parts every scene shares. A factory, built in `main.ts`. */
export class SceneViewMaker implements SceneHosts {
  readonly #parts: SceneViewParts;
  readonly #flight: Flight;
  readonly #keys: KeySlot;

  constructor(parts: SceneViewParts, plan: { flight: Flight; keys: KeySlot }) {
    this.#parts = parts;
    this.#flight = plan.flight;
    this.#keys = plan.keys;
  }

  line(onLight: (mark: ChildMark) => void): LineScene {
    return new SceneView(this.#parts, onLight);
  }

  plan(onLight: (mark: ChildMark) => void): StagedScene<PlanSketch> {
    return new PlanScene({ ...this.#parts, flight: this.#flight, keys: this.#keys }, onLight);
  }
}
