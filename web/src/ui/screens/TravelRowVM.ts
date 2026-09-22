/** One place on the list: a button when open, a closed line when sealed. */
export interface TravelRowVM {
  readonly id: string;
  readonly key: string;
  /** Its number on the list, two digits: `07` — a floor's own number. */
  readonly ordinal: string;
  readonly label: string;
  readonly sealed: boolean;
  readonly landmark: boolean;
  /** The readings beside the name (a floor's zone, integrity and resonance); `label` is read out, `value` shown. */
  readonly readings: readonly { readonly key: string; readonly label: string; readonly value: string }[];
  /** The current-position mark (the elevator column's `[>X<]`): `text` shown, `label` read out; nothing on most rows. */
  readonly mark: { readonly text: string; readonly label: string } | null;
}
