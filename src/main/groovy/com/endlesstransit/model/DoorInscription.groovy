package com.endlesstransit.model

import groovy.transform.CompileStatic
import groovy.transform.Immutable

/**
 * InscriptionStyle: The physical representation of written text on a surface.
 */
@CompileStatic
enum InscriptionStyle {
    STAMPED,   // Formal/System: [WORD]
    SCRAWLED,  // Graffiti/Ghost: _word_
    ETCHED,    // Lore/Abstract: ⟨WORD⟩
    BURNED     // Warning: !! WORD !!
    
    String format(String text) {
        switch (this) {
            case STAMPED:  return "[${text}]"
            case SCRAWLED: return "_${text.toLowerCase()}_"
            case ETCHED:   return "⟨${text}⟩"
            case BURNED:   return "!! ${text} !!"
            default:       return text
        }
    }

    /**
     * Returns a narrative fragment describing how the word was applied.
     */
    String getNarrative(String text) {
        switch (this) {
            case STAMPED:  return "The word '${text}' is stamped into the metal in block letters."
            case SCRAWLED: return "The word '${text.toLowerCase()}' is scrawled across the surface in jagged, desperate lines."
            case ETCHED:   return "The word '${text}' is finely etched into the frame, appearing almost as a structural glyph."
            case BURNED:   return "The word '${text}' is burned into the material with a high-intensity plasma torch."
            default:       return "There is an inscription: '${text}'."
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
    
    String getFormattedText() {
        return style.format(text)
    }

    String getNarrative() {
        return style.getNarrative(text)
    }
}
