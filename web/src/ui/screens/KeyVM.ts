/**
 * One key of the strip of keys (U03e): its option and that option's keyboard key, the word shown, what a reader
 * hears, its drawn icon, its count (empty when none), and the id something outside the screen finds it by (empty when
 * nothing does).
 */
export interface KeyVM {
  readonly id: string;
  readonly key: string;
  readonly anchor: string;
  readonly text: string;
  readonly label: string;
  readonly icon: string;
  readonly badge: string;
}
