/**
 * 配列でなければ配列化する
 * @param value 対象の値
 * @return 配列化された値
 */
export function arrayify<T>(value: T): T extends any[] ? T : T[] {
  return (Array.isArray(value) ? value : [value]) as any;
}
