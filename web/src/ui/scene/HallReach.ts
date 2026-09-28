/** What a hall that ends asks: how deep it is drawn when this much lies ahead and the fog lets `sight` show. */
export interface HallReach {
  of(ahead: number, sight: number): number;
}
