export interface X4WareGenXML {
  addwares: Addwares;
}
export interface Addwares {
  configuration?: (ConfigurationEntity)[] | null;
  generation?: (GenerationEntity)[] | null;
}
export interface ConfigurationEntity {
  prefix?:
    | (PrefixEntityOrGamepathEntityOrModpathEntityOrUnpackedPathEntity)[]
    | null;
  gamepath?:
    | (PrefixEntityOrGamepathEntityOrModpathEntityOrUnpackedPathEntity)[]
    | null;
  modpath?:
    | (PrefixEntityOrGamepathEntityOrModpathEntityOrUnpackedPathEntity)[]
    | null;
  unpackedPath?:
    | (PrefixEntityOrGamepathEntityOrModpathEntityOrUnpackedPathEntity)[]
    | null;
  defaults?: (DefaultsEntity)[] | null;
}
export interface PrefixEntityOrGamepathEntityOrModpathEntityOrUnpackedPathEntity {
  $: $;
}
export interface $ {
  value: string;
}
export interface DefaultsEntity {
  ware?: (WareEntity)[] | null;
}
export interface WareEntity {
  price?: (PriceEntity)[] | null;
  production?: (ProductionEntity)[] | null;
  icon?: (IconEntity)[] | null;
}
export interface PriceEntity {
  $: $1;
}
export interface $1 {
  min: string;
  average: string;
  max: string;
}
export interface ProductionEntity {
  $: $2;
  primary?: (PrimaryEntity)[] | null;
  effects?: (EffectsEntity)[] | null;
}
export interface $2 {
  time: string;
  amount: string;
  method: string;
}
export interface PrimaryEntity {
  ware?: (WareEntity1)[] | null;
}
export interface WareEntity1 {
  $: $3;
}
export interface $3 {
  ware: string;
  amount: string;
}
export interface EffectsEntity {
  effect?: (EffectEntity)[] | null;
}
export interface EffectEntity {
  $: $4;
}
export interface $4 {
  type: string;
  product: string;
}
export interface IconEntity {
  $: $5;
}
export interface $5 {
  active: string;
  video: string;
}
export interface GenerationEntity {
  addware?: (AddwareEntity)[] | null;
}
export interface AddwareEntity {
  $: $6;
  ware?: (WareEntity2)[] | null;
}
export interface $6 {
  id: string;
  cloneProductionModuleFrom: string;
}
export interface WareEntity2 {
  $: $7;
  price?: (PriceEntity)[] | null;
  production?: (ProductionEntity1)[] | null;
}
export interface $7 {
  name: string;
  group: string;
  transport: string;
  volume: string;
  tags: string;
}
export interface ProductionEntity1 {
  $: $8;
  primary?: (PrimaryEntity)[] | null;
  effects?: (EffectsEntity)[] | null;
}
export interface $8 {
  time: string;
  amount: string;
  method: string;
  name: string;
}
