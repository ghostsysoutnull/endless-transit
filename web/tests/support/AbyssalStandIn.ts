import { Street } from '#engine/model/Street.ts';

/** Test double: a stand-in for I07's floor below the bedrock — a place that answers the drain's depth multiplier with 2. */
export class AbyssalStandIn extends Street {
  override drainFactor(): number {
    return 2;
  }
}
