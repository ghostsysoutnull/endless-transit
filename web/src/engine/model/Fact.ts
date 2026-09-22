/** One labelled reading a location shows about itself (`TECH_ERA: ANALOG`). `key` says what sort of reading it is, for whoever styles it. */
export interface Fact {
  readonly key:
    'culture' | 'era' | 'trait' | 'signal' | 'alert' | 'stable' | 'zone' | 'reading' | 'narrative';
  readonly label: string;
  readonly value: string;
}
