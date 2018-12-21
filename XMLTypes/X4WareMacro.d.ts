export interface X4WareMacro {
  macros: Macros;
}
export interface Macros {
  macro?: (MacroEntity)[] | null;
}
export interface MacroEntity {
  $: $;
  component?: (ComponentEntity)[] | null;
  properties?: (PropertiesEntity)[] | null;
}
export interface $ {
  name: string;
  class: string;
}
export interface ComponentEntity {
  $: $1;
}
export interface $1 {
  ref: string;
}
export interface PropertiesEntity {
  identification?: (IdentificationEntity)[] | null;
}
export interface IdentificationEntity {
  $: $2;
}
export interface $2 {
  unique: string;
}
