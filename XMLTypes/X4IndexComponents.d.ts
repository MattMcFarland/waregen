export interface X4IndexComponents {
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
