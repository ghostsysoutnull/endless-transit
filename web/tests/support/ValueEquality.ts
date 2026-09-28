import { expect } from 'vitest';

/** An object that says for itself whether another one is the same value. */
interface Value {
  equals(other: unknown): boolean;
}

/** The one type check of this file: an object with an `equals` method. */
function isValue(candidate: unknown): candidate is Value {
  return (
    typeof candidate === 'object' &&
    candidate !== null &&
    typeof (candidate as { equals?: unknown }).equals === 'function'
  );
}

/**
 * Deep equality for value objects: a value keeps its state in `#private` fields, which `toEqual` cannot see, so two
 * different values would compare equal. Two objects of one class with `equals` are compared by it; a value and
 * anything of another class never match; everything else is left to the default. A module function because
 * `expect.addEqualityTesters` takes functions — the framework's entry point.
 */
function valueEquality(one: unknown, other: unknown): boolean | undefined {
  if (!isValue(one) && !isValue(other)) return undefined;
  if (!isValue(one) || !isValue(other)) return false;
  if (Object.getPrototypeOf(one) !== Object.getPrototypeOf(other)) return false;
  return one.equals(other);
}

expect.addEqualityTesters([valueEquality]);
