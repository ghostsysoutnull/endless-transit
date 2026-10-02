/**
 * What a scene draws aside before a ride the player must see: it runs `then` once the ride can be seen — at once when
 * nothing hides the picture, after the turn when a room's card lies on its back (U03e).
 */
export type Curtain = (then: () => void) => void;
