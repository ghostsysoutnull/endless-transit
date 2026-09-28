/** A stylesheet token's raw value where a canvas sits (`cy` → the value of `--cy` there). */
export interface StyleSource {
  value(token: string): string;
}
