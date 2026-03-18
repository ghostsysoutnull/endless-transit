package com.endlesstransit.model

import org.junit.jupiter.api.Test
import static org.junit.jupiter.api.Assertions.*

/**
 * Phase 0.5b safety net: pins AnomalousTrace.matches(String) behaviour.
 * Required before Phase 3a (RoomCategory enum refactor) — a refactor that
 * changes how room types are represented could silently break all door trace
 * associations with no test failing if this safety net doesn't exist.
 */
class AnomalousTraceTest {

    // --- Positive matches: each trace must recognise its own room type keywords ---

    @Test
    void ozone_matchesElectricalAndTechnicalRooms() {
        assertTrue(AnomalousTrace.OZONE.matches("SERVER"),     "OZONE matches SERVER")
        assertTrue(AnomalousTrace.OZONE.matches("LABORATORY"), "OZONE matches LABORATORY")
        assertTrue(AnomalousTrace.OZONE.matches("PLANT"),      "OZONE matches PLANT")
        assertTrue(AnomalousTrace.OZONE.matches("POWER"),      "OZONE matches POWER")
        assertTrue(AnomalousTrace.OZONE.matches("ARRAY"),      "OZONE matches ARRAY")
        assertTrue(AnomalousTrace.OZONE.matches("CORE"),       "OZONE matches CORE")
    }

    @Test
    void frost_matchesColdStorageRooms() {
        assertTrue(AnomalousTrace.FROST.matches("STORAGE"), "FROST matches STORAGE")
        assertTrue(AnomalousTrace.FROST.matches("VOID"),    "FROST matches VOID")
        assertTrue(AnomalousTrace.FROST.matches("CRYO"),    "FROST matches CRYO")
        assertTrue(AnomalousTrace.FROST.matches("WELL"),    "FROST matches WELL")
        assertTrue(AnomalousTrace.FROST.matches("VAULT"),   "FROST matches VAULT")
    }

    @Test
    void clicking_matchesMechanicalRooms() {
        assertTrue(AnomalousTrace.CLICKING.matches("MAINTENANCE"), "CLICKING matches MAINTENANCE")
        assertTrue(AnomalousTrace.CLICKING.matches("CLOCKWORK"),   "CLICKING matches CLOCKWORK")
        assertTrue(AnomalousTrace.CLICKING.matches("ROBOTICS"),    "CLICKING matches ROBOTICS")
        assertTrue(AnomalousTrace.CLICKING.matches("STATION"),     "CLICKING matches STATION")
        assertTrue(AnomalousTrace.CLICKING.matches("NODE"),        "CLICKING matches NODE")
        assertTrue(AnomalousTrace.CLICKING.matches("ARMORY"),      "CLICKING matches ARMORY")
    }

    @Test
    void humming_matchesHeavyIndustrialRooms() {
        assertTrue(AnomalousTrace.HUMMING.matches("ENGINE"),   "HUMMING matches ENGINE")
        assertTrue(AnomalousTrace.HUMMING.matches("TURBINE"),  "HUMMING matches TURBINE")
        assertTrue(AnomalousTrace.HUMMING.matches("REACTOR"),  "HUMMING matches REACTOR")
        assertTrue(AnomalousTrace.HUMMING.matches("DEPOT"),    "HUMMING matches DEPOT")
        assertTrue(AnomalousTrace.HUMMING.matches("HUB"),      "HUMMING matches HUB")
        assertTrue(AnomalousTrace.HUMMING.matches("BARRACKS"), "HUMMING matches BARRACKS")
        assertTrue(AnomalousTrace.HUMMING.matches("TACTICAL"), "HUMMING matches TACTICAL")
    }

    @Test
    void silence_matchesAbandonedOrResidentialRooms() {
        assertTrue(AnomalousTrace.SILENCE.matches("ABANDONED"), "SILENCE matches ABANDONED")
        assertTrue(AnomalousTrace.SILENCE.matches("QUARTERS"),  "SILENCE matches QUARTERS")
        assertTrue(AnomalousTrace.SILENCE.matches("UNIT"),      "SILENCE matches UNIT")
        assertTrue(AnomalousTrace.SILENCE.matches("CELL"),      "SILENCE matches CELL")
        assertTrue(AnomalousTrace.SILENCE.matches("CHAMBER"),   "SILENCE matches CHAMBER")
    }

    @Test
    void metallicTearing_matchesStructurallyUnstableRooms() {
        assertTrue(AnomalousTrace.METALLIC_TEARING.matches("BREACH"),   "METALLIC_TEARING matches BREACH")
        assertTrue(AnomalousTrace.METALLIC_TEARING.matches("UNSTABLE"), "METALLIC_TEARING matches UNSTABLE")
        assertTrue(AnomalousTrace.METALLIC_TEARING.matches("RUIN"),     "METALLIC_TEARING matches RUIN")
        assertTrue(AnomalousTrace.METALLIC_TEARING.matches("PULSE"),    "METALLIC_TEARING matches PULSE")
    }

    // --- Case insensitivity: matches() uppercases input before comparison ---

    @Test
    void matches_isCaseInsensitive() {
        assertTrue(AnomalousTrace.OZONE.matches("server"),     "matches() should be case-insensitive")
        assertTrue(AnomalousTrace.FROST.matches("vault"),      "matches() should be case-insensitive")
        assertTrue(AnomalousTrace.HUMMING.matches("Reactor"),  "matches() should be case-insensitive")
    }

    // --- Substring matching: keyword appears anywhere in the room type string ---

    @Test
    void matches_handlesCompositeRoomTypeStrings() {
        assertTrue(AnomalousTrace.OZONE.matches("DEEP_SERVER_CLUSTER"), "keyword contained within composite type")
        assertTrue(AnomalousTrace.FROST.matches("CRYO_VAULT"),          "keyword contained within composite type")
    }

    // --- Cross-contamination: each trace must NOT match another trace's keywords ---

    @Test
    void ozone_doesNotMatchFrostKeywords() {
        assertFalse(AnomalousTrace.OZONE.matches("STORAGE"), "OZONE must not match STORAGE (FROST keyword)")
        assertFalse(AnomalousTrace.OZONE.matches("VAULT"),   "OZONE must not match VAULT (FROST keyword)")
        assertFalse(AnomalousTrace.OZONE.matches("CRYO"),    "OZONE must not match CRYO (FROST keyword)")
    }

    @Test
    void frost_doesNotMatchOzoneKeywords() {
        assertFalse(AnomalousTrace.FROST.matches("SERVER"),      "FROST must not match SERVER (OZONE keyword)")
        assertFalse(AnomalousTrace.FROST.matches("LABORATORY"),  "FROST must not match LABORATORY (OZONE keyword)")
    }

    @Test
    void humming_doesNotMatchClickingKeywords() {
        assertFalse(AnomalousTrace.HUMMING.matches("CLOCKWORK"),   "HUMMING must not match CLOCKWORK (CLICKING keyword)")
        assertFalse(AnomalousTrace.HUMMING.matches("MAINTENANCE"), "HUMMING must not match MAINTENANCE (CLICKING keyword)")
    }

    @Test
    void silence_doesNotMatchMetallicTearingKeywords() {
        assertFalse(AnomalousTrace.SILENCE.matches("BREACH"),   "SILENCE must not match BREACH (METALLIC_TEARING keyword)")
        assertFalse(AnomalousTrace.SILENCE.matches("UNSTABLE"), "SILENCE must not match UNSTABLE (METALLIC_TEARING keyword)")
    }
}
