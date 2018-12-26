export interface X4LibraryModuleGroups {
  groups: Groups;
}
export interface Groups {
  group?: (GroupEntity)[] | null;
}
export interface GroupEntity {
  Attributes: Attributes;
  select?: (SelectEntity)[] | null;
}
export interface Attributes {
  name: string;
}
export interface SelectEntity {
  Attributes: Attributes1;
}
export interface Attributes1 {
  macro: string;
}
