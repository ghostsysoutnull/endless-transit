# Web Lessons
Rule plus pointer, one or two sentences each; the story lives in the iteration's note (`tasks/port/<id>.md`).

- **A failing project build must not write into `src/`**: `tsconfig.base.json` sets `noEmitOnError` — without it a
  wall violation made `tsc -b` drop a stray `.d.ts` beside the source. (I01)
- **Never type `git checkout <rev> --` without a path**: it detaches HEAD and hides the branch's files; restore single
  files with `git restore --source=<rev> <path>`. (I01)
