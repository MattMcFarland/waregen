export interface X4WareProductionMacro {
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
  component?: (ComponentEntityOrSetEntity)[] | null;
  properties?: (PropertiesEntity)[] | null;
}
export interface ComponentEntityOrSetEntity {
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
  build?: (BuildEntity)[] | null;
  explosiondamage?: (ExplosiondamageEntity)[] | null;
  hull?: (HullEntityOrWorkforceEntity)[] | null;
  secrecy?: (SecrecyEntity)[] | null;
  production?: (ProductionEntity)[] | null;
  workforce?: (HullEntityOrWorkforceEntity)[] | null;
}
export interface IdentificationEntity {
  Attributes: Attributes2;
}
export interface Attributes2 {
  name: string;
  shortname: string;
  makerrace: string;
  description: string;
}
export interface BuildEntity {
  Children: Children3;
}
export interface Children3 {
  sets?: (SetsEntity)[] | null;
}
export interface SetsEntity {
  Children: Children4;
}
export interface Children4 {
  set?: (ComponentEntityOrSetEntity)[] | null;
}
export interface ExplosiondamageEntity {
  Attributes: Attributes3;
}
export interface Attributes3 {
  value: number;
}
export interface HullEntityOrWorkforceEntity {
  Attributes: Attributes4;
}
export interface Attributes4 {
  max: number;
}
export interface SecrecyEntity {
  Attributes: Attributes5;
}
export interface Attributes5 {
  level: number;
}
export interface ProductionEntity {
  Attributes: Attributes6;
  Children: Children5;
}
export interface Attributes6 {
  wares: string;
}
export interface Children5 {
  queue?: (QueueEntity)[] | null;
}
export interface QueueEntity {
  Attributes: Attributes7;
}
export interface Attributes7 {
  ware: string;
  method: string;
}
