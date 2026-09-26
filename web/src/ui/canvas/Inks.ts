/**
 * The one list of the stylesheet tokens a picture may paint with. Text inks are what glyphs and words are
 * written in; the contrast test reads them on every surface like any `color:` of the stylesheet
 * (`tests/ui/styles/Contrast.test.ts`). Surface inks are grounds, rules and strokes (a door's look, U02), never text.
 */
export const TEXT_INKS: readonly string[] = ['frame', 'text', 'dim', 'yl', 'mg', 'rd', 'ab'];
export const SURFACE_INKS: readonly string[] = ['ground', 'rule', 'rule-hi', 'cy', 'bl'];
