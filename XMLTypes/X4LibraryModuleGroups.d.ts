export interface X4LibraryModuleGroups {
  groups: Groups;
}
export interface Groups {
  group?: (GroupEntity)[] | null;
}
export interface GroupEntity {
  $: $;
  select?: (SelectEntity)[] | null;
}
export interface $ {
  name: string;
}
export interface SelectEntity {
  $: $1;
}
export interface $1 {
  macro: string;
}
