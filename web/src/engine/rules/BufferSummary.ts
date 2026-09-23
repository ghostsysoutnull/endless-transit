/** What the screen may know about the buffer: how full it is, and each fragment as plain words and numbers. */
export interface BufferSummary {
  readonly size: number;
  readonly capacity: number;
  readonly fragments: readonly {
    readonly key: string;
    readonly name: string;
    readonly hertz: number;
    readonly resonant: boolean;
  }[];
}
