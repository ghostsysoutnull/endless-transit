/**
 * A state the pole tags a level with (U05, Decision 13): a corridor that curves away, an apartment whose door is not
 * stable (its state by name), an apartment out of time. A rebel district and a drift are the level's `VibeFigure`.
 */
export type PoleSign =
  | { readonly look: 'curved' }
  | { readonly look: 'door'; readonly state: string }
  | { readonly look: 'anomaly' };
