export interface X4WareGenXML {
  addwares: Addwares;
}
export interface Addwares {
  Children: Children;
}
export interface Children {
  configuration?: (ConfigurationEntity)[] | null;
  generation?: (GenerationEntity)[] | null;
}
export interface ConfigurationEntity {
  Children: Children1;
}
export interface Children1 {
  prefix?:
    | (PrefixEntityOrGamepathEntityOrModpathEntityOrUnpackedpathEntity)[]
    | null;
  gamepath?:
    | (PrefixEntityOrGamepathEntityOrModpathEntityOrUnpackedpathEntity)[]
    | null;
  modpath?:
    | (PrefixEntityOrGamepathEntityOrModpathEntityOrUnpackedpathEntity)[]
    | null;
  unpackedpath?:
    | (PrefixEntityOrGamepathEntityOrModpathEntityOrUnpackedpathEntity)[]
    | null;
  defaults?: (DefaultsEntity)[] | null;
}
export interface PrefixEntityOrGamepathEntityOrModpathEntityOrUnpackedpathEntity {
  Attributes: Attributes;
}
export interface Attributes {
  value: string;
}
export interface DefaultsEntity {
  Children: Children2;
}
export interface Children2 {
  ware?: (WareEntity)[] | null;
}
export interface WareEntity {
  Children: Children3;
}
export interface Children3 {
  price?: (PriceEntity)[] | null;
  production?: (ProductionEntity)[] | null;
  icon?: (IconEntity)[] | null;
}
export interface PriceEntity {
  Attributes: Attributes1;
}
export interface Attributes1 {
  min: number;
  average: number;
  max: number;
}
export interface ProductionEntity {
  Attributes: Attributes2;
  Children: Children4;
}
export interface Attributes2 {
  time: number;
  amount: number;
  method: string;
}
export interface Children4 {
  primary?: (PrimaryEntity)[] | null;
  effects?: (EffectsEntity)[] | null;
}
export interface PrimaryEntity {
  Children: Children5;
}
export interface Children5 {
  ware?: (WareEntity1)[] | null;
}
export interface WareEntity1 {
  Attributes: Attributes3;
}
export interface Attributes3 {
  ware: string;
  amount: number;
}
export interface EffectsEntity {
  Children: Children6;
}
export interface Children6 {
  effect?: (EffectEntity)[] | null;
}
export interface EffectEntity {
  Attributes: Attributes4;
}
export interface Attributes4 {
  type: string;
  product: number;
}
export interface IconEntity {
  Attributes: Attributes5;
}
export interface Attributes5 {
  active: string;
  video: string;
}
export interface GenerationEntity {
  Children: Children7;
}
export interface Children7 {
  addware?: (AddwareEntity)[] | null;
}
export interface AddwareEntity {
  Attributes: Attributes6;
  Children: Children8;
}
export interface Attributes6 {
  id: string;
  cloneProductionModuleFrom: string;
}
export interface Children8 {
  ware?: (WareEntity2)[] | null;
}
export interface WareEntity2 {
  Attributes: Attributes7;
  Children: Children9;
}
export interface Attributes7 {
  name: string;
  group: string;
  transport: string;
  volume: number;
  tags: string;
}
export interface Children9 {
  price?: (PriceEntity)[] | null;
  production?: (ProductionEntity1)[] | null;
}
export interface ProductionEntity1 {
  Attributes: Attributes8;
  Children: Children4;
}
export interface Attributes8 {
  time: number;
  amount: number;
  method: string;
  name: string;
}
