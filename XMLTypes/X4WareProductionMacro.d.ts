export interface X4WareProductionMacro {
  macros: Macros;
}
export interface Macros {
  macro?: (MacroEntity)[] | null;
}
export interface MacroEntity {
  $: $;
  component?: (ComponentEntityOrSetEntity)[] | null;
  properties?: (PropertiesEntity)[] | null;
}
export interface $ {
  name: string;
  class: string;
}
export interface ComponentEntityOrSetEntity {
  $: $1;
}
export interface $1 {
  ref: string;
}
export interface PropertiesEntity {
  identification?: (IdentificationEntity)[] | null;
  build?: (BuildEntity)[] | null;
  explosiondamage?: (ExplosiondamageEntity)[] | null;
  hull?: (HullEntityOrWorkforceEntity)[] | null;
  secrecy?: (SecrecyEntity)[] | null;
  production?: (ProductionEntity)[] | null;
  workforce?: (HullEntityOrWorkforceEntity)[] | null;
}
export interface IdentificationEntity {
  $: $2;
}
export interface $2 {
  name: string;
  shortname: string;
  makerrace: string;
  description: string;
}
export interface BuildEntity {
  sets?: (SetsEntity)[] | null;
}
export interface SetsEntity {
  set?: (ComponentEntityOrSetEntity)[] | null;
}
export interface ExplosiondamageEntity {
  $: $3;
}
export interface $3 {
  value: string;
}
export interface HullEntityOrWorkforceEntity {
  $: $4;
}
export interface $4 {
  max: string;
}
export interface SecrecyEntity {
  $: $5;
}
export interface $5 {
  level: string;
}
export interface ProductionEntity {
  $: $6;
  queue?: (QueueEntity)[] | null;
}
export interface $6 {
  wares: string;
}
export interface QueueEntity {
  $: $7;
}
export interface $7 {
  ware: string;
  method: string;
}
