package com.endlesstransit.ui

import groovy.transform.CompileStatic

/**
 * FrameEntropy: the one source of randomness for HUD noise (spectrogram, void voices,
 * abyssal static, coherence glitches). Seeded from the frame's inputs — the location's
 * LIP and the player's step count — so the same place at the same moment always draws the
 * same frame, while moving still changes it. Replaces four `new Random()` / wall-clock
 * seeds (HK-001, 2026-09-11); the procgen law "seed from the locus" now holds for the UI.
 */
@CompileStatic
final class FrameEntropy {

    static Random forFrame(RenderContext ctx) {
        long lip = ctx.location != null ? (ctx.location.getLIP()?.hashCode() ?: 0) : 0
        long step = ctx.player != null ? ctx.player.stepCount : 0
        return new Random(31L * lip + step)
    }

    private FrameEntropy() {}
}
