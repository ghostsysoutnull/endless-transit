/**
 * Raw text by path (`themes/conditions.txt`). The engine has no file access: the bundled loader lives in
 * `src/content/`, the test double in `tests/support/`.
 */
export interface ContentSource {
  read(path: string): string | undefined;
}
