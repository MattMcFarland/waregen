export interface X4Index {
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
