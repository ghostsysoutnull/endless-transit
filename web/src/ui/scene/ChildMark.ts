/**
 * A child of the picture marked by the screen (U02): the one lit from the picture or the list, the one you stand by —
 * or none. It answers whether it marks a child; nobody reads an empty id.
 */
export interface ChildMark {
  /** Whether it marks the child with this option id. */
  marks(id: string): boolean;
  /** Whether it marks a child at all. */
  marksAny(): boolean;
  /** Itself where it marks a child, else `other`. */
  or(other: ChildMark): ChildMark;
  /** How the page writes it on the scene's host (`data-lit`): the child's id, or nothing. */
  written(): string;
  equals(other: ChildMark): boolean;
}
