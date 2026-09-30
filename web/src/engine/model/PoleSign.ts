/** Which state a pole tag shows: a corridor that curves away, a door not stable, an apartment out of time. */
export type SignLook = 'curved' | 'door' | 'anomaly';

/**
 * A state the pole tags a level with (U05, Decision 13), and the word it is told in — a door's by its state's name, as
 * a chip's label is the engine's. A rebel district and a drift are the level's `VibeFigure`.
 */
export interface PoleSign {
  readonly look: SignLook;
  readonly word: string;
}
