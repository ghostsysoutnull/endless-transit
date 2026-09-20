package com.endlesstransit.procgen

import com.endlesstransit.model.*
import com.endlesstransit.ui.StandardTerminalAdapter
import com.endlesstransit.ui.Terminal
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import static org.junit.jupiter.api.Assertions.*

/**
 * HK-016 step 2 pins, one method per sub-step, each landing in that sub-step's commit and shown RED
 * against the previous commit. They walk the same sample the variety audit measured (Appendix A):
 * the start street of six seeds, first two buildings, first two floors — several hundred rooms.
 */
class ProcgenVarietyContractTest {

    static final List<Long> SEEDS = [0L, 12345L, 0x1234L, 500L, 9999L, 42L]

    ProceduralFactory factory

    @BeforeEach
    void setUp() {
        Terminal.initialize(true, true)
        factory = new ProceduralFactory(new StandardTerminalAdapter())
    }

    /** Every apartment on the sample, with its rooms populated. */
    private List<Apartment> sampleApartments() {
        List<Apartment> out = []
        SEEDS.each { long seed ->
            Street street = (Street) WorldGenesis.createInitialWorld(factory, new LocusSeed(seed)).startLocation
            street.buildings.take(2).each { Building b ->
                (0..<Math.min(2, b.maxFloors)).each { int f ->
                    b.getFloor(f).getCorridor().apartments.each { Apartment a -> a.rooms; out << a }
                }
            }
        }
        assertTrue(out.size() > 100, "sample too small: ${out.size()} apartments")
        return out
    }

    // --- 2c: furniture is a conditioned culture item, disjoint from the object deck ---------------

    @Test
    void furnitureIsConditionedCultureItem_neverAnObject_noRepeatInRoom() {
        List<String> conditions = factory.themeService.conditions
        assertTrue(conditions.size() >= 8, "themes/conditions.txt must hold at least 8 lines")
        int rooms = 0
        sampleApartments().each { Apartment a ->
            List<String> items = factory.themeService.getCultureAssets(a.culture)
            List<String> deck = factory.themeService.objectDeck(a.culture, a.timeline)
            a.rooms.each { Room r ->
                rooms++
                assertTrue(r.furniture.size() in 1..3, "1-3 furnishings per room")
                assertEquals(r.furniture.size(), (r.furniture as Set).size(), "furniture repeats in ${r.getLIP()}: ${r.furniture}")
                r.furniture.each { String f ->
                    int cut = f.indexOf(' ')
                    assertTrue(cut > 0 && conditions.contains(f.substring(0, cut)) && items.contains(f.substring(cut + 1)),
                        "'${f}' is not '<condition> <${a.culture} item>'")
                    assertFalse(deck.contains(f), "furniture '${f}' is also an object form")
                }
            }
        }
        assertTrue(rooms > 300, "sample had only ${rooms} rooms")
    }

    // --- 2d: a second era per planet, picked per apartment with the culture's stability roll ---------

    @Test
    void secondaryTimeline_drawnPerPlanet_andPickedByAMinorityOfApartments() {
        (0..<200).each { int i ->
            Street s = (Street) WorldGenesis.createInitialWorld(factory, new LocusSeed(i as long)).startLocation
            VibeCapsule v = ((Planet) s.findAncestor(Planet)).localVibe
            assertNotNull(v.secondaryTimeline, "planet at seed ${i} has no secondary era")
            assertNotEquals(v.timeline, v.secondaryTimeline, "planet at seed ${i} drew the same era twice")
            assertTrue(factory.themeService.timelines.containsKey(v.secondaryTimeline), "secondary era is an indexed timeline")
        }
        int onSecondary = 0, total = 0
        sampleApartments().each { Apartment a ->
            VibeCapsule v = a.getVibe()
            if (a.isAnomaly) return
            total++
            assertTrue(a.timeline == v.timeline || a.timeline == v.secondaryTimeline, "apartment era is one of the capsule's two")
            if (a.timeline == v.secondaryTimeline) onSecondary++
        }
        double share = onSecondary / (double) total
        assertTrue(share > 0.05 && share < 0.25, "secondary-era share ${onSecondary}/${total} outside the 5-25% band the stability roll implies")
    }

    // --- 2e: a cell is named for what it is, with its culture's adjective; unique inside the apartment -

    @Test
    void roomName_isCultureAdjectivePlusCategory_uniqueInsideApartment() {
        int rooms = 0
        sampleApartments().each { Apartment a ->
            List<String> adjectives = factory.nameGenerator.adjectivesFor(a.culture)
            List<String> names = a.rooms*.roomName
            // Unique unless a category was dealt more rooms than the culture has adjectives (8 today; step 3 grows them).
            boolean canBeUnique = a.rooms.countBy { Room r -> r.roomType }.values().every { int n -> n <= adjectives.size() }
            if (canBeUnique) assertEquals(names.size(), (names as Set).size(), "two cells share a name in ${a.getLIP()}: ${names}")
            a.rooms.each { Room r ->
                rooms++
                assertFalse(r.roomName.contains("[0x"), "hex serial still present: ${r.roomName}")
                assertTrue(r.roomName.endsWith(" " + r.roomType), "'${r.roomName}' does not end with its type '${r.roomType}'")
                String adj = r.roomName.substring(0, r.roomName.length() - r.roomType.length() - 1)
                assertTrue(adjectives.contains(adj), "'${adj}' is not a ${a.culture} adjective")
            }
        }
        assertTrue(rooms > 300, "sample had only ${rooms} rooms")
    }

    // --- 2f: corridor and floor sentences come from resource files and vary ------------------------

    @Test
    void corridorDescriptions_areFileVariants_andVary() {
        List<String> variants = factory.themeService.descriptions["corridor"]
        assertTrue(variants.size() >= 4, "themes/descriptions/corridor.txt must hold at least 4 lines")
        Set<String> seen = [] as Set
        SEEDS.each { long seed ->
            Street street = (Street) WorldGenesis.createInitialWorld(factory, new LocusSeed(seed)).startLocation
            street.buildings.take(3).each { Building b ->
                (0..<Math.min(3, b.maxFloors)).each { int f ->
                    Corridor c = b.getFloor(f).getCorridor()
                    String desc = c.getDescription()
                    assertTrue(desc.endsWith(". [THEME: ${c.culture.toUpperCase()}]".toString()), "corridor suffix lost: ${desc}")
                    String base = desc.substring(0, desc.length() - ". [THEME: ${c.culture.toUpperCase()}]".length())
                    assertTrue(variants.contains(base), "'${base}' is not a corridor.txt line")
                    seen << base
                }
            }
        }
        assertTrue(seen.size() > 1, "every corridor on the sample read the same sentence: ${seen}")
    }

    @Test
    void floorDescriptions_areFileVariants_andVary() {
        List<String> variants = factory.themeService.descriptions["floor"]
        assertTrue(variants.size() >= 4, "themes/descriptions/floor.txt must hold at least 4 lines")
        Set<String> seen = [] as Set
        SEEDS.each { long seed ->
            Street street = (Street) WorldGenesis.createInitialWorld(factory, new LocusSeed(seed)).startLocation
            street.buildings.take(3).each { Building b ->
                (0..<Math.min(3, b.maxFloors)).each { int n ->
                    Floor f = b.getFloor(n)
                    String desc = f.getDescription().replaceAll("\u001b\\[[0-9;]*[A-Za-z]", "")
                    assertTrue(desc.startsWith("Floor ${n}. ".toString()), "floor prefix lost: ${desc}")
                    String sentence = desc.substring("Floor ${n}. ".length())
                    assertTrue(variants.any { String v -> v.replace("{culture}", f.culture.toUpperCase()) == sentence }, "'${sentence}' is not a floor.txt line")
                    seen << sentence.replace(f.culture.toUpperCase(), "{culture}")
                }
            }
        }
        assertTrue(seen.size() > 1, "every floor on the sample read the same sentence: ${seen}")
    }

    // --- 2a/2b: shuffled-deck dealing --------------------------------------------------------------

    @Test
    void noObjectRepeatsInsideAnApartment_andEveryObjectIsADeckEntry() {
        int apartmentsWithObjects = 0
        sampleApartments().each { Apartment a ->
            List<String> objects = a.rooms.collectMany { Room r -> r.objects }
            if (objects.isEmpty()) return
            apartmentsWithObjects++
            assertEquals(objects.size(), (objects as Set).size(),
                "apartment ${a.getLIP()} (${a.culture}/${a.timeline}) deals an object twice: ${objects.countBy { it }.findAll { it.value > 1 }.keySet()}")
            List<String> deck = factory.themeService.objectDeck(a.culture, a.timeline)
            objects.each { String o -> assertTrue(deck.contains(o), "'${o}' is not in the ${a.culture}/${a.timeline} deck") }
        }
        assertTrue(apartmentsWithObjects > 100, "sample had only ${apartmentsWithObjects} apartments with objects")
    }

    @Test
    void objectDeck_hasEveryFormOnceAndNothingElse() {
        List<String> c = factory.themeService.getCultureAssets("monolith")
        List<String> t = factory.themeService.getTimelineAssets("analog")
        List<String> deck = factory.themeService.objectDeck("monolith", "analog")
        assertEquals(c.size() * t.size() * 4 + c.size() + t.size(), deck.size(), "deck size = pairs x 4 forms + singles")
        assertEquals(deck.size(), (deck as Set).size(), "deck entries are distinct")
        assertTrue(deck.contains("${t[0]} with ${c[0]}".toString()))
        assertTrue(deck.contains("${c[0]} infused with ${t[0]}".toString()))
        assertTrue(deck.contains("${c[0]} fused to ${t[0]}".toString()))
        assertTrue(deck.contains("${t[0]} grafted onto ${c[0]}".toString()))
        assertTrue(deck.contains(c[0]) && deck.contains(t[0]), "single-item forms present")
        assertSame(deck, factory.themeService.objectDeck("monolith", "analog"), "deck is built once and shared")
        assertEquals(["Strange Object"], factory.themeService.objectDeck("nonesuch", "analog"), "empty list -> the old fallback")
    }
}
