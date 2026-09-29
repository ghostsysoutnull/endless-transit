/** A part of the screen that is shown, with what it shows, or not shown at all (a union of valid shapes, never `null`). */
export type Panel<T> = (T & { readonly shown: true }) | { readonly shown: false };
