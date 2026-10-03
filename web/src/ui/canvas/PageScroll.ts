/**
 * Which way the page still scrolls under a finger on a picture: every way where the picture does not drag (`free`),
 * up and down where it drags sideways (`vertical`), no way where it drags up and down or pans (`held`).
 */
export type PageScroll = 'free' | 'vertical' | 'held';
