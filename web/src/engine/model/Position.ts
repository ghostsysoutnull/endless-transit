/** Where a place stands among its siblings, as the screen writes it (`ORBIT`, 2 of 5) — or not counted (a floor, the universe). */
export type Position =
  | {
      readonly counted: true;
      /** What its kind calls the position (`ORBIT`). */
      readonly label: string;
      /** One-based. */
      readonly index: number;
      readonly total: number;
    }
  | { readonly counted: false };
