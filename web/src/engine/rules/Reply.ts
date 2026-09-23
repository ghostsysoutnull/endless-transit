/** What a pending prompt says after an answer: the status message, and whether the prompt is now settled or still open. */
export interface Reply {
  readonly message: string;
  readonly done: boolean;
}
