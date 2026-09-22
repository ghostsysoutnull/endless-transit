/**
 * Owns two facts every screen shows and none may spell for itself: the game's name, and the build stamp
 * (small print for the tester, naming the build the page was made from — `dev` when unset). The
 * composition root makes one and hands it to every presenter.
 */
export class Masthead {
  readonly #buildId: string;

  constructor(buildId: string) {
    this.#buildId = buildId;
  }

  name(): string {
    return 'ENDLESS TRANSIT';
  }

  buildLine(): string {
    return `build ${this.#buildId}`;
  }
}
