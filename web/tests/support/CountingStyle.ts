import type { StyleSource } from '#ui/canvas/StyleSource.ts';

/** A stylesheet that answers every token with its name in capitals, padded, and counts how often it was asked. */
export class CountingStyle implements StyleSource {
  asked = 0;

  value(token: string): string {
    this.asked += 1;
    return ` ${token.toUpperCase()} `;
  }
}
