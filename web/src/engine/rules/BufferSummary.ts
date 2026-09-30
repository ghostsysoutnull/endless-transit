/** What the screen may know about the buffer: how many it holds, the resonance tally, and each fragment as plain words and numbers. */
export interface BufferSummary {
  readonly size: number;
  readonly resonant: number;
  readonly fragments: readonly {
    readonly key: string;
    readonly name: string;
    readonly hertz: number;
    readonly resonant: boolean;
  }[];
}
