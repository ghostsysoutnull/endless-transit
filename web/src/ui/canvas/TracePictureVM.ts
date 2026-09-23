/** The lattice trace as the canvas draws it: one row per level, its words already cased by the presenter. */
export interface TracePictureVM {
  readonly rows: readonly {
    /** `[02]` */
    readonly depth: string;
    readonly glyph: string;
    /** `GALACTIC SECTOR` */
    readonly kind: string;
    /** The name with the kind's note after it. */
    readonly name: string;
    readonly current: boolean;
    readonly abyssal: boolean;
  }[];
}
