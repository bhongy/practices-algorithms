export function isNil(v: unknown): boolean {
  // intentionally use `==` rather than `===`
  // which is `true` for both null and undefined
  return v == null;
}
