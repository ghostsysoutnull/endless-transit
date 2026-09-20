# BEHAVIORAL SPEC: Building (Model)

## 🌌 Responsibility
The `Building` class is a vertical container of `Floor` units. It owns the vertical lattice (floors `0 … maxFloors − 1`,
and the abyssal Layers below them once breached), landmark status, and the "Bedrock Breach" ritual state.

---

## ⚙️ Public API Behavior

### 📍 Navigation & Access
- **`getFloor(int number)`**: Returns the floor with that number, or null. Reading `floors` triggers population via `LazyLocusList`.
    - If `number < 0` and `isBreached`, every missing Layer from −1 down to `number` is created **in order**
      (seed `locus.branch(n)` per Layer), so Layer −k always sits at child index `maxFloors + k − 1` and its LIP is
      stable whoever asks first (HK-023). Unbreached, a negative number returns null and creates nothing.
- **`childAt(int index)`** (overrides `Container`): the child a LIP segment names. When breached and `index >= maxFloors`
  it first asks `getFloor(maxFloors − 1 − index)`, so a Layer's LIP resolves on a freshly regrown world (restore). Out of range → null.
- **`getOptions(Game)`**: base options plus one `NN. Access: <zone>` entry per floor from the Peak down to 0 — down to −5 when breached.
- **`getFloorProgress(Floor, Player)`**: `[visited: n, total: m]` — footprints under the floor's LIP against `factory.countSubLocations(floor)`.

### 📍 Ritual Mechanics
- **`notifySampled(int floorNumber)`**: For `0 <= floorNumber < maxFloors` only: adds the floor to `sampledFloors` and sets `lastVisitedFloor`. Layers never count.
- **`isPrimed()`**: `true` only if `sampledFloors.size() >= maxFloors` AND `infusionCount >= 7`.
- **`keystoneIn(List<InventoryItem>)`**: the item that opens this building's Bedrock — `isKeystone` and `boundLip == getLIP()` — or null (HK-018: bound by LIP, the name is display only).
- **`breach()`**: sets `isBreached`, logs, and prints the inversion sequence through `fmt` with two one-second pauses
  (`com.endlesstransit.ui.Terminal.clock`, by fully qualified name — a known model→UI leak, HK-023).

### 📍 Persistence
- **`getMutationState()` / `applyMutationState(Map)`**: `isBreached`, `isLandmark`, `infusionCount`, `sampledFloors`, `lastVisitedFloor`. Each key is applied only if present.
  Layers are not saved: they are regrown on demand, which is why the breach flag must be applied before a Layer LIP is resolved (it is — mutations are saved in footprint order).

### 📍 UI Rendering
- **`getFloorZone(int floorNum)`**: `ABYSSAL_SUBSTRATE` below 0, `TRANSIT_LOBBY` at 0, `PEAK_OBSERVATORY` at the top; otherwise one of four zones per band
  (below 5 / top five / middle), picked with `locus.branch(floorNum)`.
- **`getFloorIntegrity(int floorNum)`**: Layers show pressure `P: n%` (10 per Layer, capped at 100). Floors show `100%`, minus `(10 − floor) × 8` on floors below 10 when breached.
- **`getStatusSummary()`**: `BEDROCK_BREACHED`, else `INFUSION_ACTIVE: n`, else `STRUCTURAL_STABLE`. **`getLatticeMeta()`**: `[BREACHED]` or `[FLOORS: n]`.
- **`getExtraContent(Player, width)`**: the **Building Strata Diagnostics** table, Peak to floor 0 (to −5 when breached): radar (`[>X<]` current,
  `[ X ]` visited, `[ ! ]` Layer), designation, zone, integrity, a simulated resonance, and progress (`[V]`, `[n/m]`, `[CLEARED]`).
  At the building root the radar anchors on `lastVisitedFloor`. Rendering a breached building therefore creates Layers −1 … −5.
- **`getMapSymbol()`**: `⌂`, or `☠` when abyssal.

---

## 🔄 State Transitions
- **Landmark Discovery**: On `enter()`, if `isLandmark` and not yet visited, prints a one-time notice (with a one-second pause), then marks visited.
- **Breach State**: Once `isBreached` is true it changes `getFloor`, `childAt`, `getOptions`, `getExtraContent`, `getFloorIntegrity`, the status summary and the lattice meta.

---

## 🔗 Dependencies
- **`ProceduralFactory`** (`factory`, injected — HK-008): creates floors and Layers, counts sub-locations.
- **`OutputFormatter`** (`fmt`, injected): all formatting and printing.
- **`Floor`**: the primary child type. **`LazyLocusList`**: holds `floors`. **`InventoryItem`**, **`Player`**, **`Logger`**.

---
*Neural Map Stabilized.*
*Verified against: Building.groovy @ c23b2183d2*
