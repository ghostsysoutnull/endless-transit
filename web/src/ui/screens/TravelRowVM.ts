/** One child of the place, as a row of the list: a button when open, a closed line when sealed. */
export interface TravelRowVM {
  readonly id: string;
  readonly key: string;
  /** Its number on the list, two digits: `07`. */
  readonly ordinal: string;
  readonly label: string;
  readonly sealed: boolean;
  readonly landmark: boolean;
}
