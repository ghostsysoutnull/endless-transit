/** What every presenter asks of the masthead (`BuildMasthead`): the game's name, and the build line under it. */
export interface Masthead {
  name(): string;
  buildLine(): string;
}
