/**
 * Owns one fact: the fraction in [0, 1) that belongs to a text and an index (FNV-1a, mixed) — what a picture
 * varies by (a window lit, a star's pace, a roof), so the same place always looks the same and nothing is
 * drawn from the clock's randomness. Shared by every scene picture (U02; it was the street's own).
 */
export class SceneHash {
  fraction(text: string, index: number): number {
    let hash = 0x811c9dc5;
    const key = `${text}/${String(index)}`;
    for (let at = 0; at < key.length; at++) {
      hash ^= key.charCodeAt(at);
      hash = Math.imul(hash, 0x01000193);
    }
    hash ^= hash >>> 15;
    hash = Math.imul(hash, 0x2c1b3c6d);
    hash ^= hash >>> 12;
    return (hash >>> 0) / 0x100000000;
  }
}
