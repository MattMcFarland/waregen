import { Attributes as IndexEntryAttributes } from "@@/XMLTypes/X4Index";
import { IndexHashInterface } from "./IndexHash";

export type IndexEntryAttribute = "name" | "value";

export function isIndexEntry(arg: any): arg is IndexEntryAttributes {
  return (
    (<IndexEntryAttributes>arg).name !== undefined ||
    (<IndexEntryAttributes>arg).value !== undefined
  );
}

export function isIndexEntryAttribute(str: string): str is IndexEntryAttribute {
  return (
    <IndexEntryAttribute>str === "name" || <IndexEntryAttribute>str === "value"
  );
}

export function withIndexEntryDefaults(entry: IndexHashInterface) {
  const defaults = {
    name: "",
    value: ""
  };
  return Object.assign({}, defaults, entry);
}
