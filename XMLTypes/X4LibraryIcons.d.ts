export interface X4LibraryIcons {
  icons: Icons;
}
export interface Icons {
  icon?: (IconEntity)[] | null;
}
export interface IconEntity {
  $: $;
}
export interface $ {
  name: string;
  texture: string;
  height: string;
  width: string;
}
