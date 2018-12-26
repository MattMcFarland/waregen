/**
 * Returns the target value in a nested JSON object(POJO), based on the given key.
 *
 * @param obj nested Object
 * @param key check if key exists in obj
 */
const dig = (obj: any, key: string | number | symbol): any =>
  key in obj
    ? obj[key]
    : Object.values(obj).reduce((acc, val) => {
        if (acc !== undefined) return acc;
        if (typeof val === "object") return dig(val, key);
      }, undefined);
export default dig;
