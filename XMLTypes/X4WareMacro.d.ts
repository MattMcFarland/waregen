export interface X4WareMacro {
  macros: Macros;
}
export interface Macros {
  Children: Children;
}
export interface Children {
  macro?: (MacroEntity)[] | null;
}
export interface MacroEntity {
  Attributes: Attributes;
  Children: Children1;
}
export interface Attributes {
  name: string;
  class: string;
}
export interface Children1 {
  component?: (ComponentEntity)[] | null;
  properties?: (PropertiesEntity)[] | null;
}
export interface ComponentEntity {
  Attributes: Attributes1;
}
export interface Attributes1 {
  ref: string;
}
export interface PropertiesEntity {
  Children: Children2;
}
export interface Children2 {
  identification?: (IdentificationEntity)[] | null;
}
export interface IdentificationEntity {
  Attributes: Attributes2;
}
export interface Attributes2 {
  unique: number;
}
