export interface X4IndexMacros {
  index: Index;
}
export interface Index {
  entry?: (EntryEntity)[] | null;
}
export interface EntryEntity {
  Attributes: Attributes;
}
export interface Attributes {
  name: string;
  value: string;
}
