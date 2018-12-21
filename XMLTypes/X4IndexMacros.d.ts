export interface X4IndexMacros {
  index: Index;
}
export interface Index {
  entry?: (EntryEntity)[] | null;
}
export interface EntryEntity {
  $: $;
}
export interface $ {
  name: string;
  value: string;
}
