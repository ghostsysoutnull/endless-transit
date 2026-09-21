/**
 * The one save slot, as text. The engine owns the format (`SavedGame`); where the text lives is the
 * platform's business — `localStorage` in the browser (queue decision 4), memory in tests.
 */
export interface SaveStore {
  load(): string | undefined;
  save(text: string): void;
}
