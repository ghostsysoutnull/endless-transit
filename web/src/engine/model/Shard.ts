import { LocationKind } from './LocationKind.ts';
import { Room } from './Room.ts';

export const SHARD_KIND = new LocationKind({ key: 'shard', title: 'Shard', icon: '☠', indexLabel: 'SHARD' });

/**
 * A room below the bedrock (Guide:279, 331-332; Room.groovy:39-65): the one place whose icon on the path turns
 * to `☠`. It holds and hands over what a room does; the culture bonus comes from the Artery's vibe above it.
 */
export class Shard extends Room {
  override kind(): LocationKind {
    return SHARD_KIND;
  }

  override leaveLabel(): string {
    return 'Exit Crypt';
  }
}
