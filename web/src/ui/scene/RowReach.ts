/** What a tower row that stops short asks of `ShortReach`: where its line ends, between its start and the row's full width. */
export interface RowReach {
  of(from: number, full: number): number;
}
