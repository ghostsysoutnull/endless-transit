---
layout: terminal
title: ICONOGRAPHY_GLOSSARY
map_type: data_bank
---

# LATTICE_ENCYCLOPEDIA: Iconography Glossary

To navigate the link, an Observer must be able to decode the symbolic language of the terminal. This guide provides technical definitions for all standard icons.

## [CORE_HUD_ICONS]
Located in the **Lattice Sparkline** at the top of your bridge.

*   `∞` : **THE UNIMATRIX ROOT** — The origin point of all procedural seeds.
*   `»` : **COSMIC FILAMENT** — A high-bandwidth data-conduit.
*   `○` : **GALACTIC SECTOR / NULL REACH** — A major matter cluster, or the hollow that replaces one.
*   `☼` : **SOLAR SYSTEM** — A localized gravitational well.
*   `⊕` : **PLANET** — A container of cultural resonance.
*   `⬚` : **COUNTRY** — A sector of one Functional Trait.
*   `🏙` : **CITY** — A dense urban grid node.
*   `═` : **STREET** — A linear transit artery.
*   `⌂` : **BUILDING** — A vertical strata container.
*   `▤` : **FLOOR** — A horizontal slice of a building.
*   `▅` : **CORRIDOR** — An internal scan hub.
*   `🚪` : **APARTMENT** — A cluster of rooms.
*   `□` : **SHARD (ROOM)** — The atomic cell of the lattice.
*   `☠` : **ABYSSAL SHARD** — Below a breached Bedrock the path ends `▤-N ▅ 🚪 ☠`: the Layer carries its number, the Artery and Crypt keep their glyphs, and only the cell itself is marked.

## [NEURAL_MAP_SYMBOLS]
Two projections share these symbols. The bridge's right pane carries a map from the Universe down to the Street, and yields to telemetry from the Building inward. The `m` directive projects the children of whatever container you stand in, at any depth; inside a cell it returns `SCAN_ERROR`.

*   **The nodes themselves** — Every child is drawn with its own glyph from the list above: a street's map is a field of `⌂`, a system's a scatter of `⊕`. Dim: unvisited. Bright: visited.
*   `☠` : **ABYSSAL NODE** — A child below a breached Bedrock, whatever its kind.
*   `▲` : **YOU (THE OBSERVER)** — Plotted on the Filament conduit trace only. Elsewhere it survives in the legend and nowhere on the map.
*   `■` / `░` : **NODE / VOID** — Legend marks. The legend still names them; the projection draws the glyphs above and leaves empty space empty.
*   **STATIC** (magenta) — On the `m` projection, stray characters (`█ ▓ ▒ ░ / \ % ! $ # *`) that spread across the map as Coherence falls below 30.

## [RESONANCE_WAVEFORMS]
Used in the **Apartment Aperture Scan**.

*   `~~~` : **STABLE** — Nominal frequency.
*   `≈≈≈` : **HARMONIC** — The cell's own name resolves to a frequency divisible by 11. A reading of the cell, not of its fragments; it feeds no tally.
*   `###` : **DEGRADED** — A temporal anomaly (one apartment in a hundred).

## [DIAGNOSTIC_READOUTS]
Terms that appear on headers and diagnostic suites.

*   **TECH_ERA** — The planet's Temporal Era, shown on every street header. ENTROPIC doubles the drain.
*   **RESONANCE** — The local primary Culture, shown beside the Era: the planet's primary, or its secondary inside an Unauthorized Zone. Cells of this Culture amplify captures by 10%.
*   **TRAIT** — The Country's Functional Trait: CEREMONIAL, MILITARY, INDUSTRIAL, AGRICULTURAL, RESEARCH or COMMERCIAL. Selects the four room types of every building in the Country.
*   **SECTOR MUTATION / ATMOS_SHIFT** — The same Trait, reported on the Country screen and on every floor's diagnostic suite respectively. Reads `STANDARD` above the Country scale.
*   **STABILITY** — The share of apartments that follow the planet's primary Culture rather than its secondary (75–90%).
*   **LOCUS_HASH** — A stable procedural signature of the cell. It is not a coordinate.
*   **HOP_DENSITY** — Your depth in the hierarchy: the Universe is 0, every Shard is 12.
*   **PULSE_TRAVERSAL** — Every directive the lattice accepted from a location's own menu, movements and `[t]` interactions alike. It is carried in the neural trace across sessions. Scans, maps and buffer checks cost Coherence but do not advance it.

---
*Next Node: [\[THE_BEDROCK_SHIFT\]]({{ "/terminal/codex/the_bedrock_shift.html" | relative_url }})*
