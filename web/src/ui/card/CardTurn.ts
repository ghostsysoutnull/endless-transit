/** The card's two faces as a turn plays on them: the one that goes and the one that comes. */
export interface CardFaces {
  readonly out: HTMLElement;
  readonly into: HTMLElement;
}

/** One way the room's card turns (U03e): it plays on the two faces and says when it has ended. */
export interface CardTurn {
  /** What tells it from the others: the card never plays the same one twice running. */
  key(): string;
  /** Plays the turn; `toBack` when the words come up. Both faces are shown while it plays. */
  play(faces: CardFaces, toBack: boolean): Promise<void>;
}
