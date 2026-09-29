/** What a scene asks of `SceneEvents`: to ask, from its host, for the child with this option id to be entered. */
export interface ScenePick {
  pick(host: EventTarget, id: string): void;
}
