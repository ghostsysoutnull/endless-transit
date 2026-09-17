# Procgen Variety Audit
**Created:** 2026-09-16
**Trigger:** user report — "a lack of variation in the objects on the rooms"
**Status:** ANALYSIS — no source change authorized by this document. Remediation is tracked as **HK-016** (`tasks/backlog/HOUSEKEEPING.md`).

> **Verdict:** the report is correct, and rooms are not the worst case. Objects and furniture on a planet come from a
> pool capped at 256 strings; three of the room's four description lines collapse to a *single* string for large parts
> of the world because resource files are missing and the fallback is silent; room names borrow another culture's
> lexicon for three cultures and owe their apparent uniqueness to a hex serial. Building, city, street, planet and
> system names, room and floor counts, and room colours vary fine.

---

## 1. Method

Every generator (`procgen/*Factory`, `ThemeService`, `NameGenerator`, `Door`) and every file under `src/main/resources`
was read. Then a scratch script (Appendix A) built the start street of six seeds (`0`, `12345`, `0x1234`, `500`, `9999`,
`42`) through `WorldGenesis.createInitialWorld`, walked the first three floors of the first two buildings, and counted
distinct values per surface: **1,354 rooms in 252 apartments**. A second script (Appendix B) checked the start planet of
200 seeds for trait/timeline/culture distribution, drew 500 atmospheres per (culture, timeline, trait) directly from
`ThemeService`, and counted name collisions across the whole start planet of 30 seeds (166 countries, 991 cities,
8,915 streets). Nothing in `src/` or `docs/` was changed by the audit.

---

## 2. Findings by surface

| # | Surface | Pool today | Measured | Verdict |
| :-- | :--- | :--- | :--- | :--- |
| 2.1 | Room **objects** | 8 culture × 8 timeline items × 2 phrasings = 128 per culture; 2 cultures per planet → **≤ 256 per planet** | 143–198 distinct of 283–719 objects per seed in 6 floors; by the 10th apartment of a corridor ~1 in 3 objects is a repeat; 25–40 % of apartments hold the same object twice; 1–9 rooms per seed list the same object twice | **Poor** |
| 2.2 | Room **furniture** | same generator and pool as 2.1 | 138–192 distinct of 230–589; reads as a second objects line | **Poor** |
| 2.3 | Room **structure** line | 5 lines per trait, files for 4 of 6 traits | Industrial and Commercial countries (⅓ of countries) get `a spatial cell` in **every** room — 1,105 of 1,354 sampled rooms | **Broken** |
| 2.4 | Room **lighting** line | 5 lines per timeline, files for 4 of 8 timelines | Planets on `digital`, `future`, `atomic`, `entropic` (52 % of 200 start planets) get `a dim, flickering glow` in every room; 500-draw probe: 1 distinct | **Broken** |
| 2.5 | Room **walls** line | 5 lines per culture, files for 4 of 10 cultures | `gilded`, `rust`, `shogun`, `void`, `zenith` all show the 5 monolith wall lines (seed 0, shogun: only monolith + glitch walls seen) | **Broken** |
| 2.6 | Room **type** | 4 per trait, trait fixed per country | exactly 4 types per country in every seed | Weak by design |
| 2.7 | Room **name** | 8 adj × 8 noun per culture + hex serial; lexicons for 6 of 10 cultures | 64 real names per culture; shogun/gilded/zenith rooms are named from the monolith lexicon (`Brutalist Block [0xD0]` on a shogun planet); the hex makes 1,336/1,354 "distinct" — **the hex does not count** | **Poor** |
| 2.8 | **Doors** (corridor list) | 8 materials × 7 states = 56 briefs; 20 % inscribed from 10 words × 4 styles | 106 distinct of 252; a 10-door corridor shows 2–3 identical doors | Weak |
| 2.9 | Corridor / floor / apartment / building **descriptions** | one template each (`Corridor.groovy:43`, `Floor.groovy:87`, `Apartment.groovy:40`, `Building.groovy:134`) | identical sentence everywhere | Not procedural |
| 2.10 | Building names | 8 adj × 8 noun + 2 templates + 15 landmark titles | 13–14 distinct per street of 14 | Fine |
| 2.11 | City, street names | 14 × 14 each | 971/991 cities, 8,704/8,915 streets distinct within their parent | Fine |
| 2.12 | Planet, system, filament, sector names | 16 × 14 / 16 × 11 / 12 × 999 × 8 / 9 × 8 × 99 | no collisions observed | Fine |
| 2.13 | Room colour, counts (rooms, floors, apartments, buildings) | 8 colours; ranges | all 8 colours; counts vary (pinned by `ProcgenVariabilityTest`) | Fine |

Distribution check (Appendix B, 200 seeds): traits, timelines and cultures are drawn evenly (Military 48 … Agricultural 26;
timelines 15–32 each; cultures 15–24 each). The gaps above are therefore hit by roughly the share of the world the missing
files imply, not by a biased roll.

---

## 3. Root causes (weight order)

1. **The vibe fixes one timeline and two cultures per planet.** `PlanetFactory.create` draws them once; `StreetFactory.populate`
   hands the primary culture and the timeline to every building; `ApartmentFactory.create:28` copies the timeline and picks the
   culture with `VibeCapsule.pickCulture` at stability 0.75–0.95 (`VibeCapsule.groovy:11,26,35`). Every hybrid object on a planet
   therefore contains one of **8 timeline words**, and the 1 % "anomaly" branch (`ApartmentFactory.groovy:31`) changes no content —
   it only sets the glitch flag.
2. **The fallback chain collapses to one string silently.** `ThemeService.groovy:85,89,93`: a missing culture/timeline/trait file
   falls through to `monolith`, then (lighting/structures) to a literal, with no `TOPOLOGY_WARN`-style log. This is the
   "silent default on a semantically meaningful value" pattern already recorded in `tasks/lessons/infrastructure.md`.
3. **Objects and furniture share one generator.** `ThemeService.generateHybridObject` (`:99`) is called for furniture
   (`RoomFactory.groovy:57-60`, 1–3 per room) and for the apartment object pool (`ApartmentFactory.groovy:44`, 5–19 per apartment).
   Same pool, same two phrasings, so two of the room's lines are visually the same list.
4. **Draws are with replacement.** The pool is filled by independent draws and dealt round-robin (`ApartmentFactory.groovy:55`);
   nothing excludes a string already dealt to the apartment or the room.
5. **Every list is 8 lines** (cultures, timelines, lexicons) or 5 (atmosphere), against a volume of 5–19 objects per apartment and
   2–20 apartments per floor.
6. **Room names are decoration plus a serial.** `NameGenerator.generateRoomName` (`:100-120`) ignores the room's category; the
   hex (`:120`) is what keeps names apart.

---

## 4. Remediation plan (HK-016) — ordered so each step multiplies the next

**Step 1 — fill the missing resource files (content only, no code).**
Lighting for `atomic`, `digital`, `entropic`, `future`; structures for `Industrial`, `Commercial`; walls for `gilded`, `rust`,
`shogun`, `void`, `zenith`; building/room lexicons for `gilded`, `shogun`, `zenith`, `abyssal`. Update each `index.txt`.
Add a log line in `generateAtmosphere` when a fallback fires (the missing-file guard), so the gap can never reopen unseen.
*Effect:* turns "one identical sentence for every room on half the planets" into a real 5-line pool.

> **Step 1 DONE (2026-09-16)** — plan and execution record: `tasks/completed/HK_016_STEP1_PLAN.md`. Two corrections to the step as written above:
> the lexicon list was hard-coded in `NameGenerator` (now `names/buildings/index.txt`), and the glitch branch's `"Abyssal"` key matched no
> file (fixed to `"abyssal"`; `structures/Singularity.txt` added) — with every file in place that key alone still put `a spatial cell` on
> 2–5 rooms per probe seed. Side finding fixed first: HK-017 (the narrative pane wrapped to 88 columns, the split box held 86).
> Probe re-run after step 1, same six seeds, same walk:
>
> | seed | walls distinct | lighting distinct (glow fallback) | structure distinct (cell fallback) |
> | :-- | :-- | :-- | :-- |
> | 0 | 10 → 12 | 6 (2) → 7 (0) | 6 (5) → 8 (0) |
> | 12345 | 17 → 17 | 15 (2) → 16 (0) | 9 (249) → 13 (0) |
> | 0x1234 | 10 → 19 | 10 (6) → 14 (0) | 1 (299) → 12 (0) |
> | 500 | 11 → 13 | 7 (2) → 8 (0) | 1 (170) → 9 (0) |
> | 9999 | 14 → 18 | 8 (4) → 11 (0) | 1 (262) → 14 (0) |
> | 42 | 11 → 11 | 7 (1) → 7 (0) | 1 (120) → 8 (0) |
>
> Objects, furniture, door and count columns are identical to the table in Appendix A — step 2's job. Room names on shogun, gilded,
> zenith and abyssal apartments now use their own lexicons (seed 0 first apartment: shogun words, not *Brutalist Block*).

**Step 2 — structural fixes (code, small).**
- Deal the apartment's objects from a **shuffled deck** of the pool (no repeats until the pool is exhausted), and never deal
  a string already in the target room.
- **Separate furniture from objects**: furniture draws plain culture nouns (or its own template); objects keep the hybrids.
- **Timeline drift** the way culture already drifts: a `secondaryTimeline` on `VibeCapsule` picked per apartment with the same
  stability roll, so the "with" half of a planet's objects stops being one 8-word list.
- **Three or four more phrasings**, including single-item ones, so not every object is "X with Y".
- Room names from **category + lexicon** (e.g. `Fuel Depot` → `Corroded Fuel Depot`), hex dropped or kept only as an ID that is
  not counted as variety.
- Two to four **template variants** for corridor, floor and apartment descriptions (2.9).
*Effect:* the planet ceiling goes from 256 to several thousand objects before any list grows.

**Step 3 — grow the lists (content), sized to the draw volume.**
Culture and timeline items 8 → ~16; atmosphere pools 5 → ~10; room lexicons 8×8 → ~12×12; door materials/states 8/7 → ~12/12.
With step 2 in place a planet's object space becomes roughly 16 × 16 × 4 phrasings × 2 cultures × 2 timelines ≈ 4,000.
Doing this first would mostly evaporate on the current template; that is the reason for the order.

### Gates and blast radius
- **Every step changes generated worlds.** `ProcgenSnapshotTest`, `ProcgenDeepSnapshotTest` (seed 0x1234 literals) and any golden
  frame that shows a room, corridor or door will move. This is a **content phase, not a refactor**: it runs on its own branch
  (`content/hk-016-variety`), regenerates goldens with `./vinc.sh --goldens` only after the diff is reviewed as intended, and
  re-pins the snapshot literals in the same commit.
- **Determinism is untouched**: every new draw hangs off `locus.branch(...)`; `DeterministicUniverseTest` stays the gate.
- **Pins to add before step 2 (Coverage Claim Protocol step 0):** no duplicate object within an apartment for N seeds; furniture and
  objects disjoint in phrasing; the atmosphere fallback never fires for any (culture, timeline, trait) in the indexes (fails
  today — that is the point); every culture in `cultures/index.txt` has a walls file and a lexicon; every timeline has a lighting
  file; every trait has a structures file.
- `./vinc.sh --scan` seed 0 → 9 nodes must still hold (the world *shape* does not change; only strings and object identity do).
- Player's Guide and manual sections that quote object phrasing or atmosphere lines are edited in the same commit (HK-014 rule).

---

## Appendix A — sample script (six seeds, first 3 floors of 2 buildings)

Run from the repo root with `groovy -cp "build/vinc:src/main/groovy:src/main/resources:lib/*" <file>`.

```groovy
import com.endlesstransit.procgen.*
import com.endlesstransit.model.*
import com.endlesstransit.ui.StandardTerminalAdapter

def factory = new ProceduralFactory(new StandardTerminalAdapter())
[0L, 12345L, 0x1234L, 500L, 9999L, 42L].each { long seed ->
    Street street = (Street) WorldGenesis.createInitialWorld(factory, new LocusSeed(seed)).startLocation
    def objSet = [] as Set, furnSet = [] as Set, walls = [] as Set, light = [] as Set, struct = [] as Set
    def types = [] as Set, names = [] as Set, doorSet = [] as Set
    int objTot = 0, furnTot = 0, rooms = 0, apts = 0, doors = 0, aptDup = 0, roomDup = 0, cell = 0, glow = 0
    street.buildings.take(2).each { Building b ->
        (0..<Math.min(3, b.maxFloors)).each { int f ->
            Corridor c = b.getFloor(f).getCorridor()
            def ds = c.doors*.getMinimalDescription(); doors += ds.size(); doorSet.addAll(ds)
            c.apartments.each { Apartment a ->
                apts++; def aptObjs = []
                a.rooms.each { Room r ->
                    rooms++; objTot += r.objects.size(); objSet.addAll(r.objects); aptObjs.addAll(r.objects)
                    if (r.objects.size() != (r.objects as Set).size()) roomDup++
                    furnTot += r.furniture.size(); furnSet.addAll(r.furniture)
                    walls << r.walls; light << r.lightingDesc; struct << r.structureDesc
                    if (r.lightingDesc == 'a dim, flickering glow') glow++
                    if (r.structureDesc == 'a spatial cell') cell++
                    types << r.roomType; names << r.roomName
                }
                if (aptObjs.size() >= 2 && (aptObjs as Set).size() < aptObjs.size()) aptDup++
            }
        }
    }
    println "seed $seed vibe=${street.getVibe()} trait=${((Country) street.findAncestor(Country)).functionalTrait}"
    println "  ${apts} apts / ${rooms} rooms | objects ${objSet.size()}/${objTot} | furniture ${furnSet.size()}/${furnTot}"
    println "  apts with a repeated object ${aptDup} | rooms with a repeated object ${roomDup}"
    println "  walls ${walls.size()} | lighting ${light.size()} (glow fallback ${glow}) | structure ${struct.size()} (cell fallback ${cell})"
    println "  types ${types} | names ${names.size()}/${rooms} | doors ${doorSet.size()}/${doors}"
}
```

Measured output, 2026-09-16 (master `4a0f8ab`):

| seed | vibe (timeline, primary/secondary) | trait | apts / rooms | objects distinct/total | furniture | apts w/ repeat | walls | lighting (glow) | structure (cell) | doors |
| :-- | :--- | :--- | :-- | :-- | :-- | :-- | :-- | :-- | :-- | :-- |
| 0 | industrial, shogun/organic | Research | 39 / 220 | 184/406 | 185/447 | 11 | 10 | 6 (2) | 6 (5) | 33/39 |
| 12345 | analog, organic/abyssal | Industrial | 54 / 283 | 193/599 | 192/560 | 17 | 17 | 15 (2) | 9 (249) | 42/54 |
| 0x1234 | analog, monolith/shogun | Industrial | 60 / 299 | 160/719 | 161/589 | 25 | 10 | 10 (6) | **1 (299)** | 43/60 |
| 500 | industrial, organic/neon | Commercial | 30 / 170 | 198/355 | 184/336 | 9 | 11 | 7 (2) | **1 (170)** | 26/30 |
| 9999 | analog, rust/baroque | Industrial | 42 / 262 | 143/495 | 146/538 | 17 | 14 | 8 (4) | **1 (262)** | 35/42 |
| 42 | singularity, baroque/gilded | Industrial | 27 / 120 | 144/283 | 138/230 | 10 | 11 | 7 (1) | **1 (120)** | 25/27 |

Player's-eye walk, first corridor, cumulative distinct/total objects per apartment entered (seed 12345, 10 apartments):
`7/8 18/20 30/37 41/50 53/68 56/73 68/92 86/111 97/130 98/143`.

## Appendix B — distribution and fallback probes

- Start-country trait over 200 seeds: Research 34, Military 48, Industrial 32, Agricultural 26, Commercial 34, Ceremonial 26.
- Start-planet timeline over 200 seeds: industrial 23, analog 23, digital 32, ancient 28, entropic 27, future 25, singularity 27, atomic 15
  → 104/200 planets on a timeline with no lighting file.
- Start-planet primary culture over 200 seeds: shogun 23, organic 22, rust 23, gilded 22, abyssal 15, monolith 18, void 17, neon 24, zenith 19, baroque 17.
- `ThemeService.generateAtmosphere`, 500 draws each (glitch branch excluded by construction of the probe seeds):
  `neon/analog/Research` → 5/5/5 distinct; `shogun/digital/Industrial` → 5/**1**/**1**; `gilded/future/Commercial` → 5/**1**/**1**;
  `rust/atomic/Military` → 5/**1**/5; `zenith/entropic/Ceremonial` → 5/**1**/5.
- Names across 30 seeds' start planets: cities 971/991 distinct within their country; streets 8,704/8,915 distinct within their city.
- Seed 0 (shogun planet) first apartment room names: `Brutalist Block [0xD0]`, `Silent Slab [0xB1]`, `Static Pillar [0xB0]`, `Eternal Tower [0xF9]` — monolith lexicon.
