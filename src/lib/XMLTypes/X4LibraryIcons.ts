export interface X4LibraryIcons {
  icons: Icons;
}
export interface Icons {
  icon?: (IconEntity)[] | null;
}
export interface IconEntity {
  Attributes: Attributes;
}
export interface Attributes {
  name: string;
  texture?: string | null;
  personal?: null;
  height?: number | null;
  width?: number | null;
  active?: string | null;
  inactive?: string | null;
  selected?: string | null;
}
