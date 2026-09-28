import { expect } from 'vitest';

/** An object that says for itself whether another one is the same value. */
interface Value {
  equals(other: unknown): boolean;
}

/** Whether an object has an `equals` method: a value object. */
function hasEquals(candidate: unknown): boolean {
  return (
    typeof candidate === 'object' &&
    candidate !== null &&
    typeof (candidate as { equals?: unknown }).equals === 'function'
  );
}

/** The one type check of this file: `one` is a value that can be asked about `other`, a value of its own class. */
function comparable(one: unknown, other: unknown): one is Value {
  return hasEquals(one) && hasEquals(other) && Object.getPrototypeOf(one) === Object.getPrototypeOf(other);
}

/**
 * Deep equality for value objects: a value keeps its state in `#private` fields, which `toEqual` cannot see, so two
 * different values would compare equal. Two objects of one class with `equals` are compared by it; a value and
 * anything of another class never match; everything else is left to the default. A module function because
 * `expect.addEqualityTesters` takes functions — the framework's entry point.
 */
function valueEquality(one: unknown, other: unknown): boolean | undefined {
  if (!hasEquals(one) && !hasEquals(other)) return undefined;
  return comparable(one, other) && one.equals(other);
}

expect.addEqualityTesters([valueEquality]);
