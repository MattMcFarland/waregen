export interface X4LibraryModuleGroups {
  groups: Groups;
}
export interface Groups {
  Children: Children;
}
export interface Children {
  group?: (GroupEntity)[] | null;
}
export interface GroupEntity {
  Attributes: Attributes;
  Children: Children1;
}
export interface Attributes {
  name: string;
}
export interface Children1 {
  select?: (SelectEntity)[] | null;
}
export interface SelectEntity {
  Attributes: Attributes1;
}
export interface Attributes1 {
  macro: string;
}
