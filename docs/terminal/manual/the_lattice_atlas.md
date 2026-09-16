---
layout: terminal
title: THE_LATTICE_ATLAS
map_type: filament
---

# THE_LATTICE_ATLAS: World & Lore

## [THE HIERARCHY]
The Neural Web is organized into a strict recursive structure. Every node you visit is a container for something deeper.

| Scale | Icon | Technical Designation | Description |
| :--- | :--- | :--- | :--- |
| **00** | `∞` | Universe Root | The Unimatrix. The origin of all seeds. |
| **01** | `»` | Cosmic Filament | High-bandwidth conduits connecting the Core to the Rim. |
| **02** | `○` | Galactic Sector | Dense clusters of matter and data adrift in the void. Some conduits end in a **Null Reach** instead — a hollow sector holding one Spectral Echo. |
| **03** | `☼` | Solar System | Gravitational wells anchoring planetary nodes. |
| **04** | `⊕` | Planet | The primary containers of cultural resonance. |
| **05** | `⬚` | Country | Administrative regions governed by specific traits. |
| **06** | `🏙` | City | Concentrated urban grids of synthetic matter. |
| **07** | `═` | Street | Linear transit arteries connecting building-nodes. |
| **08** | `⌂` | Building | Vertical strata where fragments are harvested. |
| **09** | `▤` | Floor | Functional zones, designated by height (see [FLOOR_ZONES] below). |
| **10** | `▅` | Corridor | Internal scan-hubs providing access to cells. |
| **11** | `🚪` | Apartment | Secure clusters of rooms. |
| **12** | `□` | Shard (Room) | The atomic unit of the Lattice. |

## [THE GREAT CULTURES]
Every planet in the web is defined by a **primary Culture** and a **secondary Culture**—procedural templates that shape the architecture, objects, and "vibe" of its structures. Most apartments follow the primary; a minority drift to the secondary. One city in ten is an **Unauthorized Zone**, where the two are inverted.

There are ten Cultures. Six are fully formed:

*   **RUST (The Industrial Decay):** Gritty, oxidized, and functional. Focuses on sumps, shafts, and mechanical relics.
*   **NEON (The Synthetic Pulse):** Digital, vibrant, and bio-luminescent. Architecture feels like circuitry.
*   **BAROQUE (The Ceremonial Gilded):** Opulent, velvet-lined, and sacred. These zones value archives and ritual halls.
*   **MONOLITH (The Brutalist Static):** Cold, grey, and eternal. Simple concrete geometry designed for permanence.
*   **VOID (The Hollow Echo):** Dark, silent, and drifting. These sectors are mostly empty, containing only ghostly memories.
*   **ORGANIC (The Living Neural):** Breathing, soft, and fungal. Architecture is grown rather than built.

Four are **Minor Cultures**: their objects are their own, but their walls and building names default to Monolith geometry.

*   **GILDED (The Velvet Ledger):** Mahogany, brass, and crystal. Clockwork opulence without the Baroque's sanctity.
*   **SHOGUN (The Lacquered Order):** Shoji screens, tatami, and katana racks. Discipline rendered as furniture.
*   **ZENITH (The Marble Ascendant):** Pillars, altars, and laurel. A classical ideal that never finished rendering.
*   **ABYSSAL (The Unmade):** Dead threads, orphan processes, and altars of the core-dump. Native to the substrate beneath every Bedrock; rarely, it surfaces as a planet's dominant Culture.

Full histories: [CULTURAL_ORIGINS]({{ "/terminal/codex/cultural_origins.html" | relative_url }}).

## [THE TEMPORAL ERAS]
Each planet is also fixed to one of eight **Temporal Eras**, shown on every street header as `[TECH_ERA: …]`. The Era shapes the objects and the lighting of a place: **ANALOG**, **ANCIENT**, **ATOMIC**, **DIGITAL**, **ENTROPIC**, **FUTURE**, **INDUSTRIAL**, **SINGULARITY**.

Only one Era touches the link itself: in an **ENTROPIC** Era every pulse costs double Coherence. No Era costs less than the base rate.

## [COUNTRY TRAITS]
Every Country is governed by one of six **Functional Traits**, shown as `TRAIT:` on its header: **CEREMONIAL**, **MILITARY**, **INDUSTRIAL**, **AGRICULTURAL**, **RESEARCH**, **COMMERCIAL**.

The Trait matters more than the Culture for what you will find. It selects the four room types used in every building of that Country (a Military country builds only Security Stations, Barracks, Armories and Tactical Hubs), and it writes the structural description of every room.

The same Trait travels down the hierarchy under two other names: the Country lists it as its **Sector Mutation**, and every floor's diagnostic suite reports it as **ATMOS_SHIFT**. Above the Country scale the reading is `STANDARD`.

## [FLOOR_ZONES]
A building's floors are designated by height, not by function. Floor 0 is always the **TRANSIT_LOBBY** and the top floor is always the **PEAK_OBSERVATORY**. Between them:

*   **Lower strata (floors 1–4):** MECHANICAL_SUMP, STORAGE_CELL, POWER_RELAY, FILTRATION_INTAKE.
*   **Upper strata (the four below the Peak):** EXECUTIVE_SUITE, NEURAL_UPLINK, DATA_VAULT, VIP_QUARTERS.
*   **Everything between:** LIVING_UNIT, RESEARCH_LAB, HYDROPONIC_BAY, BIO_SERVER.

Below the Bedrock every layer is the **ABYSSAL_SUBSTRATE**. Zone names are labels only; the rooms behind a floor's doors are chosen by the Country's Trait.

## [THE BEDROCK SUBSTRATE]
Beneath every building lies the **Bedrock**. Through the ritual of **Harmonic Inversion**, an Observer can "Breach" this bedrock to enter the **Abyssal Substrate**. Here, the terminology of the world changes:
*   Floors become **Layers**.
*   Corridors become **Arteries**.
*   Apartments become **Crypts**.
*   Rooms become **Shards**.

In the Substrate, the light is red, the walls are raw concrete, and the **Abyssal Pressure** threatens your Integrity at every turn.

---
*Proceed to the [OPERATIONAL_PROTOCOLS]({{ "/terminal/manual/operational_protocols.html" | relative_url }}) to master the mechanics of the link.*
