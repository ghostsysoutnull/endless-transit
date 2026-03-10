package com.endlesstransit.model

import groovy.transform.CompileStatic
import groovy.transform.Immutable

/**
 * InscriptionStyle: The physical representation of written text on a surface.
 * Dictates the visual "vibe" and TUI formatting for inscriptions.
 */
@CompileStatic
enum InscriptionStyle {
    STAMPED,   // Formal/System: [WORD]
    SCRAWLED,  // Graffiti/Ghost: _word_
    ETCHED,    // Lore/Abstract: ⟨WORD⟩
    BURNED     // Warning: !! WORD !!
    
    /**
     * Formats the given text according to the style's visual grammar.
     */
    String format(String text) {
        switch (this) {
            case STAMPED:  return "[${text}]"
            case SCRAWLED: return "_${text.toLowerCase()}_"
            case ETCHED:   return "⟨${text}⟩"
            case BURNED:   return "!! ${text} !!"
            default:       return text
        }
    }
}

/**
 * DoorInscription: A value object representing text found on a door.
 */
@CompileStatic
@Immutable
class DoorInscription {
    String text
    InscriptionStyle style
    
    /**
     * Returns the formatted string for UI display.
     */
    String getFormattedText() {
        return style.format(text)
    }
}
