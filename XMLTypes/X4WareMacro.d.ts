export interface X4WareMacro {
  macros: Macros;
}
export interface Macros {
  macro?: (MacroEntity)[] | null;
}
export interface MacroEntity {
  Attributes: Attributes;
  component?: (ComponentEntity)[] | null;
  properties?: (PropertiesEntity)[] | null;
}
export interface Attributes {
  name: string;
  class: string;
}
export interface ComponentEntity {
  Attributes: Attributes1;
}
export interface Attributes1 {
  ref: string;
}
export interface PropertiesEntity {
  identification?: (IdentificationEntity)[] | null;
}
export interface IdentificationEntity {
  Attributes: Attributes2;
}
export interface Attributes2 {
  unique: number;
}
