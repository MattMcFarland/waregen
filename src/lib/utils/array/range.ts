/**
 * Initializes an array containing the numbers in the specified range
 * where start and end are inclusive with their common difference step.
 * @param end length of array
 * @param start array head value
 * @param step increment each item by
 */
export default (end: number, start = 0, step = 1) =>
  Array.from(
    { length: Math.ceil((end - start + 1) / step) },
    (v, i) => i * step + start
  );
