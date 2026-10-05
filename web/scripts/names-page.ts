/**
 * `npm run names` — the names page: every word list the game names places and things with, beside names
 * drawn from real worlds, as one page for the phone. A tool for judging the words; no part of the game.
 *
 *   1. reads the lists as they are in `src/content/` (the folders are walked here: the game never lists a folder);
 *   2. walks a sample of worlds with the game's own generator, one path a world from the universe to a room,
 *      and keeps what each place on the path lists;
 *   3. writes `names-page/index.html` (ignored by git); the package script then uploads that folder.
 *
 * Node runs this file directly (type stripping) — keep it free of enums and parameter properties.
 */
import { existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { ContentLibrary } from '#engine/content/ContentLibrary.ts';
import { Apartment } from '#engine/model/Apartment.ts';
import { Floor } from '#engine/model/Floor.ts';
import type { Location } from '#engine/model/Location.ts';
import { LocationRegistry } from '#engine/procgen/LocationRegistry.ts';
import { ThemeCatalog } from '#engine/procgen/ThemeCatalog.ts';
import { Seed } from '#engine/rng/Seed.ts';

const WEB_ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const CONTENT = join(WEB_ROOT, 'src', 'content');
const TARGET = join(WEB_ROOT, 'names-page');
/** How many worlds are walked, and how many of a place's children a list on the page shows at most. */
const WORLDS = 80;
const SHOWN = 40;
const DEEPEST = 14;

/** One thing a place lists, as the page shows it: its name, what it carries beside it, and the vibe it stands in. */
interface Named {
  readonly kind: string;
  readonly icon: string;
  readonly name: string;
  /** What a floor or a door shows beside its name: the zone, the word on the door. */
  readonly carries: string;
  readonly tag: string;
  readonly culture: string | undefined;
  readonly era: string | undefined;
  readonly trait: string | undefined;
}

interface Family {
  readonly parent: string;
  readonly children: readonly Named[];
}

/** One section of the page: a kind of place or thing, the folder its words live in, and how its samples are grouped. */
interface Section {
  readonly id: string;
  readonly title: string;
  readonly folder: string;
  readonly kinds: readonly string[];
  readonly how: string;
  /** What a keyed sub-folder is keyed by, where the folder's own index does not say. */
  readonly keyedBy?: Readonly<Record<string, string>>;
  /** Sub-folders a level deeper than the folder's own parts, with what each is. */
  readonly deeper?: readonly (readonly [string, string])[];
  readonly groupBy?: readonly ('culture' | 'era' | 'trait')[];
}

const SECTIONS: readonly Section[] = [
  {
    id: 'filament',
    title: 'Filaments',
    folder: 'names/filament',
    kinds: ['filament'],
    how: 'A letter of the one alphabet its universe uses, a number of its own, a type.',
  },
  {
    id: 'sector',
    title: 'Sectors',
    folder: 'names/sector',
    kinds: ['sector'],
    how: 'A descriptor, a noun, a number of its own.',
  },
  {
    id: 'null-reach',
    title: 'Null Reaches',
    folder: 'names/null-reach',
    kinds: ['null-reach', 'sector'],
    how: 'The words Null Reach, then a word of its own, dealt among the nodes of its filament. Shown beside the sectors it is listed with.',
  },
  {
    id: 'solar-system',
    title: 'Star systems',
    folder: 'names/solar-system',
    kinds: ['solar-system'],
    how: 'A prefix and a suffix.',
  },
  {
    id: 'planet',
    title: 'Planets',
    folder: 'names/planet',
    kinds: ['planet'],
    how: 'A head in the words of its culture, glued to a plain tail.',
    groupBy: ['culture'],
  },
  {
    id: 'country',
    title: 'Countries',
    folder: 'names/country',
    kinds: ['country'],
    how: 'A plain prefix, a core in the words of its culture, a suffix in the words of its trait.',
    groupBy: ['culture', 'trait'],
  },
  {
    id: 'city',
    title: 'Cities',
    folder: 'names/city',
    kinds: ['city'],
    how: 'A head by culture glued to a tail by era. A rebel district is named in its swapped pair.',
    groupBy: ['culture', 'era'],
  },
  {
    id: 'street',
    title: 'Streets',
    folder: 'names/street',
    kinds: ['street'],
    how: 'An adjective by culture and a noun by era, both its city’s.',
    groupBy: ['culture', 'era'],
  },
  {
    id: 'building',
    title: 'Buildings',
    folder: 'names/buildings',
    kinds: ['building'],
    keyedBy: { adj: 'culture', noun: 'culture', compounds: 'era', sizes: 'size' },
    how: 'A describing word and a building word of the culture in force; or the building word glued to an ending of the era in force; or a concept; a few are landmarks. Every word is dealt along the street. Rooms borrow the describing words.',
    groupBy: ['culture', 'era'],
  },
  {
    id: 'floor',
    title: 'Floors',
    folder: 'names/floors',
    kinds: ['floor'],
    keyedBy: { lobby: 'trait', peak: 'trait' },
    deeper: [
      ['zones/basement', 'floors 1 to 4, by trait'],
      ['zones/living', 'the floors between, by trait'],
      ['zones/executive', 'the floors near the top, by trait'],
    ],
    how: 'A floor goes by its number; these words name its zone, in the words of its country’s trait: a lobby word on the ground floor, a peak word on the top, and one of three height bands between, dealt up the tower.',
  },
  {
    id: 'apartment',
    title: 'Doors',
    folder: 'themes/doors',
    kinds: ['apartment'],
    keyedBy: { materials: 'culture', states: 'era', inscriptions: 'way of writing' },
    how: 'A material of the culture in force and a state of the era in force, each dealt along the corridor. One door in five carries a word, from the list of the way it is written: stamped by the system, scrawled by those who came before, etched by the structure, burned as a warning.',
    groupBy: ['culture', 'era'],
  },
  {
    id: 'room',
    title: 'Rooms',
    folder: 'names/rooms',
    kinds: ['room'],
    keyedBy: { rooms: 'trait' },
    how: 'An adjective of its culture (the buildings’ list) and a room type of its country’s trait, dealt among the rooms of its apartment.',
    groupBy: ['culture', 'trait'],
  },
];

/** The page's colour for each of the game's frame colours (`themes/planet-frames`), so a culture reads at a glance. */
const INK: Readonly<Record<string, string>> = {
  yellow: '#e6c84f',
  white: '#f1efe6',
  cyan: '#4fc3c7',
  'bright-cyan': '#7df3ff',
  green: '#6fcf6f',
  red: '#e0664f',
  magenta: '#d977c8',
  grey: '#9aa0a8',
  blue: '#6f9df0',
};

function escaped(text: string): string {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function linesOf(path: string): string[] {
  return readFileSync(path, 'utf8')
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line !== '');
}

/** A list's words: the first field of each line (some lists carry more after a `|`). */
function wordsOf(path: string): string[] {
  return linesOf(path).map((line) => line.split('|')[0] ?? '');
}

const FRAMES = new Map(
  linesOf(join(CONTENT, 'themes', 'planet-frames.txt')).map((line): [string, string] => {
    const [culture = '', frame = ''] = line.split('|');
    return [culture, frame];
  }),
);

function inkOf(key: string): string {
  return INK[FRAMES.get(key) ?? ''] ?? '#c9c4b4';
}

function isFolder(path: string): boolean {
  return existsSync(path) && statSync(path).isDirectory();
}

/** The lists of a folder, in its index's order where it has one, the rest by name. */
function listsIn(folder: string): string[] {
  const lists = readdirSync(folder)
    .filter((file) => file.endsWith('.txt') && file !== 'index.txt')
    .map((file) => file.slice(0, -'.txt'.length));
  if (!existsSync(join(folder, 'index.txt'))) return lists.sort();
  const indexed = linesOf(join(folder, 'index.txt'))
    .map((line) => line.split('|')[0] ?? '')
    .filter((key) => lists.includes(key));
  return [...indexed, ...lists.filter((key) => !indexed.includes(key)).sort()];
}

function chips(words: readonly string[]): string {
  return `<div class="chips">${words.map((word) => `<span class="chip">${escaped(word)}</span>`).join('')}</div>`;
}

/** A folder of lists keyed by something: one column a key, swiped sideways. */
function columns(folder: string): string {
  const all = listsIn(folder)
    .map((key) => {
      const words = wordsOf(join(folder, `${key}.txt`));
      const rows = words.map((word) => `<div>${escaped(word)}</div>`).join('');
      return `<div class="col"><h5 style="color:${inkOf(key)}">${escaped(key)} <small>${String(words.length)}</small></h5>${rows}</div>`;
    })
    .join('');
  return `<div class="cols">${all}</div>`;
}

function keyed(title: string, what: string, folder: string): string {
  return `<h4>${escaped(title)} <small>${escaped(what)} — swipe sideways</small></h4>${columns(folder)}`;
}

/** The words of one section: each part of its folder, a list shown whole or a keyed folder shown as columns. */
function theWords(section: Section): string {
  const folder = join(CONTENT, section.folder);
  const own = section.folder.split('/').at(-1) ?? section.folder;
  const index = existsSync(join(folder, 'index.txt'))
    ? linesOf(join(folder, 'index.txt')).map((line) => line.split('|'))
    : [];
  // A folder with no index of its own is itself one keyed set (the rooms, keyed by trait).
  if (index.length === 0) return keyed(own, `by ${section.keyedBy?.[own] ?? 'key'}`, folder);
  const unlisted = readdirSync(folder)
    .map((entry) => entry.replace(/\.txt$/, ''))
    .filter((entry) => entry !== 'index' && !index.some(([name]) => name === entry))
    .sort();
  const parts = [...index, ...unlisted.map((entry) => [entry])];
  const out: string[] = [];
  for (const [name = '', axis] of parts) {
    const path = join(folder, name);
    if (isFolder(path)) {
      if (listsIn(path).length === 0) continue;
      const what =
        axis === 'family'
          ? 'one list a universe, picked on its seed'
          : `by ${axis ?? section.keyedBy?.[name] ?? 'key'}`;
      out.push(keyed(name, what, path));
    } else {
      const words = wordsOf(`${path}.txt`);
      const count = `${String(words.length)} ${words.length === 1 ? 'word' : 'words'}`;
      out.push(`<h4>${escaped(name)} <small>${count}, one list for every place</small></h4>${chips(words)}`);
    }
  }
  for (const [deeper, what] of section.deeper ?? []) out.push(keyed(deeper, what, join(folder, deeper)));
  return out.join('');
}

function named(child: Named): string {
  const carries = child.carries === '' ? '' : ` <b class="mark">${escaped(child.carries)}</b>`;
  const tag = child.tag === '' ? '' : ` <b class="${child.tag}">${child.tag}</b>`;
  const edge = child.culture === undefined ? '' : ` style="border-color:${inkOf(child.culture)}88"`;
  return `<span class="chip name"${edge}>${escaped(child.name)}${carries}${tag}</span>`;
}

function family(heading: string, ink: string, children: readonly Named[]): string {
  const style = ink === '' ? '' : ` style="color:${ink}"`;
  return `<div class="family"><div class="parent"${style}>${escaped(heading)}</div><div class="chips">${children.map(named).join('')}</div></div>`;
}

/** The names of one section: a few whole lists as the player meets them, then names grouped by the vibe they stand in. */
function theNames(section: Section, families: readonly Family[]): string {
  const mine = families
    .map((each) => ({
      parent: each.parent,
      children: each.children.filter((child) => section.kinds.includes(child.kind)),
    }))
    .filter((each) => each.children.length > 0);
  if (mine.length === 0) return '';
  const out = ['<h4>Listed together <small>one parent’s whole list, as the player meets it</small></h4>'];
  const parents = new Set<string>();
  const largest = [...mine].sort((a, b) => b.children.length - a.children.length);
  for (const each of largest) {
    if (parents.has(each.parent) || parents.size === 5) continue;
    parents.add(each.parent);
    out.push(family(`under ${each.parent}`, '', each.children));
  }
  for (const axis of section.groupBy ?? []) {
    const groups = new Map<string, Map<string, Named>>();
    for (const child of mine.flatMap((each) => each.children)) {
      const key = child[axis];
      if (key === undefined) continue;
      const group = groups.get(key) ?? new Map<string, Named>();
      group.set(child.name, child);
      groups.set(key, group);
    }
    if (groups.size === 0) continue;
    out.push(`<h4>By ${axis} <small>names from ${String(WORLDS)} real worlds</small></h4>`);
    for (const [key, group] of [...groups].sort(([a], [b]) => a.localeCompare(b))) {
      out.push(family(key, axis === 'culture' ? inkOf(key) : '', [...group.values()].slice(0, 14)));
    }
  }
  return out.join('');
}

/** World number `n` of the sample: spread over both halves of the seed so neighbours share nothing. */
function worldSeed(n: number): Seed {
  return new Seed(Math.imul(n + 1, 0x9e3779b1), Math.imul(n + 7, 0x85ebca6b));
}

function asNamed(place: Location): Named {
  const vibe = place.vibe();
  const words = place instanceof Apartment ? place.door().inscription()?.formatted() : undefined;
  const rebel = place.facts().some((fact) => fact.key === 'alert');
  return {
    kind: place.kind().key(),
    icon: place.kind().icon(),
    name: place.name(),
    carries: place instanceof Floor ? place.zone() : (words ?? ''),
    tag: rebel ? 'rebel' : place.landmark() ? 'landmark' : '',
    culture: vibe?.culture().key(),
    era: vibe?.era().key(),
    trait: vibe?.mutation()?.key(),
  };
}

/** Walks the sample: for each world one path down to a room, and what every place on the path lists. */
function walked(): { families: Family[]; paths: Named[][] } {
  const library = new ContentLibrary({
    read: (path) => (existsSync(join(CONTENT, path)) ? readFileSync(join(CONTENT, path), 'utf8') : undefined),
  });
  const registry = new LocationRegistry(library, new ThemeCatalog(library), {
    warn: (message) => {
      throw new Error(message);
    },
  });
  const families: Family[] = [];
  const paths: Named[][] = [];
  for (let n = 0; n < WORLDS; n++) {
    const path: Location[] = [registry.universe(worldSeed(n))];
    for (let depth = 0; depth < DEEPEST; depth++) {
      const here = path.at(-1);
      const open = (here?.children() ?? []).filter(
        (child) => !child.sealed() && child.kind().key() !== 'layer',
      );
      const next = open[(n * 7 + depth * 3 + (n >> depth)) % Math.max(open.length, 1)];
      if (next === undefined) break;
      path.push(next);
    }
    paths.push(path.map(asNamed));
    for (const parent of path.slice(0, -1)) {
      families.push({ parent: parent.name(), children: parent.children().slice(0, SHOWN).map(asNamed) });
    }
  }
  return { families, paths };
}

const STYLE = `
  :root { color-scheme: dark; --bg:#0d0f12; --panel:#15181d; --line:#2a2f37; --ink:#e7e3d6; --dim:#9a9788; --accent:#e6c84f; }
  * { box-sizing: border-box; }
  html { scroll-padding-top: 3.6rem; }
  body { margin:0; background:var(--bg); color:var(--ink); font:15px/1.45 ui-monospace, "IBM Plex Mono", Menlo, Consolas, monospace; }
  header { padding:18px 16px 6px; }
  h1 { margin:0 0 4px; font-size:1.25rem; letter-spacing:.04em; }
  header p { margin:0; color:var(--dim); font-size:.85rem; }
  nav { position:sticky; top:0; z-index:2; display:flex; gap:8px; overflow-x:auto; padding:10px 16px; background:var(--bg); border-bottom:1px solid var(--line); }
  nav a { flex:none; padding:6px 12px; border:1px solid var(--line); border-radius:999px; color:var(--ink); text-decoration:none; font-size:.82rem; background:var(--panel); }
  section { padding:8px 16px 26px; border-bottom:1px solid var(--line); }
  h2 { margin:20px 0 2px; font-size:1.15rem; color:var(--accent); }
  .how { margin:0 0 6px; color:var(--dim); font-size:.85rem; }
  h3 { margin:20px 0 4px; font-size:.78rem; letter-spacing:.14em; text-transform:uppercase; color:var(--dim); border-top:1px dashed var(--line); padding-top:12px; }
  h4 { margin:14px 0 6px; font-size:.95rem; }
  small { color:var(--dim); font-weight:normal; font-size:.75rem; }
  .chips { display:flex; flex-wrap:wrap; gap:6px; }
  .chip { padding:3px 8px; border:1px solid var(--line); border-radius:6px; background:var(--panel); font-size:.85rem; }
  .chip.name { font-size:.9rem; }
  .cols { display:flex; gap:10px; overflow-x:auto; padding:0 16px 8px; margin:0 -16px; }
  .col { flex:none; width:9.5rem; padding:8px 10px; border:1px solid var(--line); border-radius:8px; background:var(--panel); font-size:.85rem; }
  .col h5 { margin:0 0 6px; font-size:.85rem; text-transform:uppercase; letter-spacing:.06em; }
  .family { margin:10px 0 14px; }
  .parent { color:var(--dim); font-size:.78rem; margin-bottom:5px; }
  .rebel { color:#e0664f; font-size:.68rem; font-weight:normal; }
  .mark, .landmark { color:var(--accent); font-size:.68rem; font-weight:normal; }
  .path { list-style:none; margin:12px 0; padding:10px 12px; border:1px solid var(--line); border-radius:8px; background:var(--panel); }
  .path li { padding:1px 0; }
  .path i { display:inline-block; width:1.6em; font-style:normal; color:var(--dim); }
  footer { padding:18px 16px 40px; color:var(--dim); font-size:.78rem; }
`;

function page(families: readonly Family[], paths: readonly (readonly Named[])[]): string {
  const links = [
    ...SECTIONS.map((section) => `<a href="#${section.id}">${escaped(section.title)}</a>`),
    '<a href="#paths">Whole paths</a>',
  ].join('');
  const sections = SECTIONS.map(
    (section) =>
      `<section id="${section.id}"><h2>${escaped(section.title)}</h2><p class="how">${escaped(section.how)}</p><h3>The words</h3>${theWords(section)}<h3>The names they make</h3>${theNames(section, families)}</section>`,
  ).join('');
  const whole = paths
    .filter((path) => path.at(-1)?.kind === 'room')
    .slice(0, 12)
    .map((path) => {
      const steps = path
        .filter((place) => place.kind !== 'universe' && place.kind !== 'corridor')
        .map((place) => `<li><i>${escaped(place.icon)}</i> ${escaped(place.name)}</li>`)
        .join('');
      return `<ol class="path">${steps}</ol>`;
    })
    .join('');
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex"><title>Endless Transit — the names</title>
<style>${STYLE}</style></head><body>
<header><h1>ENDLESS TRANSIT — THE NAMES</h1><p>Every word list the game names places and things with, and names drawn from ${String(WORLDS)} real worlds. A tool page, not part of the game.</p></header>
<nav>${links}</nav>
${sections}
<section id="paths"><h2>Whole paths</h2><p class="how">Twelve walks from a filament down to a room: the names in company.</p>${whole}</section>
<footer>Built ${new Date().toISOString().slice(0, 10)} from the lists as they were that day.</footer>
</body></html>`;
}

const { families, paths } = walked();
const html = page(families, paths);
mkdirSync(TARGET, { recursive: true });
writeFileSync(join(TARGET, 'index.html'), html);
console.log(
  `NAMES=OK FILE=names-page/index.html SIZE=${String(Math.round(html.length / 1024))}kB WORLDS=${String(WORLDS)}`,
);
