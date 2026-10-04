/**
 * This mirrors the future Google Sheets build rule:
 * an item is included only when every required field is present and valid.
 * Incomplete rows are ignored, so they never reach the static build.
 */
export function hasRequiredFields<T extends object>(
  item: T,
  required: (keyof T)[]
): boolean {
  return required.every((key) => {
    const value = item[key];
    if (typeof value === "string") return value.trim().length > 0;
    if (typeof value === "number") return Number.isFinite(value);
    if (typeof value === "boolean") return true;
    return value !== null && value !== undefined;
  });
}
