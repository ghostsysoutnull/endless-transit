import type { ChildMark } from './ChildMark.ts';

/** No child marked. Value object. */
export class NoChild implements ChildMark {
  marks(): boolean {
    return false;
  }

  marksAny(): boolean {
    return false;
  }

  or(other: ChildMark): ChildMark {
    return other;
  }

  /** Nothing written: the attribute stays empty. */
  written(): string {
    return '';
  }

  equals(other: ChildMark): boolean {
    return !other.marksAny();
  }
}
