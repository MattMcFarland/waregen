export interface X4WareGenXML {
  addwares: Addwares;
}
export interface Addwares {
  configuration?: (ConfigurationEntity)[] | null;
  generation?: (GenerationEntity)[] | null;
}
export interface ConfigurationEntity {
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
  ware?: (WareEntity)[] | null;
  blueprint?: (BlueprintEntity)[] | null;
}
export interface WareEntity {
  Attributes: Attributes1;
  price?: (PriceEntity)[] | null;
  production?: (ProductionEntity)[] | null;
  icon?: (IconEntity)[] | null;
}
export interface Attributes1 {
  transport: string;
  volume?: null;
  tags: string;
}
export interface PriceEntity {
  Attributes: Attributes2;
}
export interface Attributes2 {
  min: number;
  average: number;
  max: number;
}
export interface ProductionEntity {
  Attributes: Attributes3;
  primary?: (PrimaryEntity)[] | null;
  effects?: (EffectsEntity)[] | null;
}
export interface Attributes3 {
  time: number;
  amount: number;
  method: string;
}
export interface PrimaryEntity {
  ware?: (WareEntity1)[] | null;
}
export interface WareEntity1 {
  Attributes: Attributes4;
}
export interface Attributes4 {
  ware: string;
  amount: number;
}
export interface EffectsEntity {
  effect?: (EffectEntity)[] | null;
}
export interface EffectEntity {
  Attributes: Attributes5;
}
export interface Attributes5 {
  type: string;
  product: number;
}
export interface IconEntity {
  Attributes: Attributes6;
}
export interface Attributes6 {
  active: string;
  video: string;
}
export interface BlueprintEntity {
  Attributes: Attributes7;
  price?: (PriceEntity)[] | null;
  production?: (ProductionEntity1)[] | null;
  research?: (ResearchEntity)[] | null;
  component?: (ComponentEntity)[] | null;
  restriction?: (RestrictionEntity)[] | null;
  owner?: (OwnerEntity)[] | null;
}
export interface Attributes7 {
  description: string;
  transport: string;
  volume: number;
  tags: string;
}
export interface ProductionEntity1 {
  Attributes: Attributes8;
  primary?: (PrimaryEntity)[] | null;
}
export interface Attributes8 {
  time: number;
  amount: number;
  method: string;
  name: string;
}
export interface ResearchEntity {
  Attributes: Attributes9;
  research?: (ResearchEntity1)[] | null;
}
export interface Attributes9 {
  time: number;
}
export interface ResearchEntity1 {
  ware?: (WareEntity2)[] | null;
}
export interface WareEntity2 {
  Attributes: Attributes10;
}
export interface Attributes10 {
  ware: string;
}
export interface ComponentEntity {
  Attributes: Attributes11;
}
export interface Attributes11 {
  ref: string;
  amount: number;
}
export interface RestrictionEntity {
  Attributes: Attributes12;
}
export interface Attributes12 {
  licence: string;
}
export interface OwnerEntity {
  Attributes: Attributes13;
}
export interface Attributes13 {
  faction: string;
}
export interface GenerationEntity {
  addware?: (AddwareEntity)[] | null;
}
export interface AddwareEntity {
  Attributes: Attributes14;
  ware?: (WareEntity3)[] | null;
  blueprint?: (BlueprintEntity1)[] | null;
}
export interface Attributes14 {
  id: string;
  cloneProductionModuleFrom: string;
  baskets: string;
}
export interface WareEntity3 {
  Attributes: Attributes15;
  price?: (PriceEntity)[] | null;
  production?: (ProductionEntity2)[] | null;
}
export interface Attributes15 {
  name: string;
  group: string;
  transport: string;
  volume: number;
  tags: string;
}
export interface ProductionEntity2 {
  Attributes: Attributes8;
  primary?: (PrimaryEntity)[] | null;
  effects?: (EffectsEntity)[] | null;
}
export interface BlueprintEntity1 {
  Attributes: Attributes16;
  price?: (PriceEntity)[] | null;
  production?: (ProductionEntity1)[] | null;
}
export interface Attributes16 {
  name: string;
  description: string;
  transport: string;
  volume: number;
  tags: string;
}
