// @flow

export function isNil(v: mixed): boolean {
  // intentionally use `==` rather than `===`
  // which is `true` for both null and undefined
  return v == null;
}
