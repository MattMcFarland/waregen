export interface X4LibraryIcons {
  icons: Icons;
}
export interface Icons {
  Children: Children;
}
export interface Children {
  icon?: (IconEntity)[] | null;
}
export interface IconEntity {
  Attributes: Attributes;
}
export interface Attributes {
  name: string;
  texture: string;
  height: number;
  width: number;
}
