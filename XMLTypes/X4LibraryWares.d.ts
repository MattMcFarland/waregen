export interface X4LibraryWares {
  wares: Wares;
}
export interface Wares {
  production?: (ProductionEntity)[] | null;
  defaults?: (DefaultsEntity)[] | null;
  ware?: (WareEntity)[] | null;
}
export interface ProductionEntity {
  method?: (MethodEntity)[] | null;
}
export interface MethodEntity {
  $: $;
  default?: (DefaultEntity)[] | null;
}
export interface $ {
  id: string;
}
export interface DefaultEntity {
  $: $1;
}
export interface $1 {
  race: string;
}
export interface DefaultsEntity {
  $: $2;
  price?: (PriceEntity)[] | null;
  production?: (ProductionEntity1)[] | null;
  container?: (ContainerEntity)[] | null;
  icon?: (IconEntity)[] | null;
}
export interface $2 {
  id: string;
  name: string;
  transport: string;
  volume: string;
  tags: string;
}
export interface PriceEntity {
  $: $3;
}
export interface $3 {
  min: string;
  average: string;
  max: string;
}
export interface ProductionEntity1 {
  $: $4;
  effects?: (EffectsEntity)[] | null;
}
export interface $4 {
  time: string;
  amount: string;
  method: string;
  name: string;
}
export interface EffectsEntity {
  effect?: (EffectEntity)[] | null;
}
export interface EffectEntity {
  $: $5;
}
export interface $5 {
  type: string;
  product: string;
}
export interface ContainerEntity {
  $: $6;
}
export interface $6 {
  ref: string;
}
export interface IconEntity {
  $: $7;
}
export interface $7 {
  active: string;
  video: string;
}
export interface WareEntity {
  $: $8;
  price?: (PriceEntity)[] | null;
  production?: (ProductionEntity2)[] | null;
  icon?: (IconEntity1)[] | null;
  component?: (ComponentEntity)[] | null;
  use?: (UseEntity)[] | null;
  restriction?: (RestrictionEntity)[] | null;
  owner?: (OwnerEntity)[] | null;
}
export interface $8 {
  id: string;
  name: string;
  description?: string | null;
  factoryname?: string | null;
  group?: string | null;
  transport: string;
  volume: string;
  tags?: string | null;
  illegal?: string | null;
}
export interface ProductionEntity2 {
  $: $4;
  primary?: (PrimaryEntity)[] | null;
  effects?: (EffectsEntity)[] | null;
}
export interface PrimaryEntity {
  ware?: (WareEntity1)[] | null;
}
export interface WareEntity1 {
  $: $9;
}
export interface $9 {
  ware: string;
  amount: string;
}
export interface IconEntity1 {
  $: $10;
}
export interface $10 {
  active: string;
  video?: string | null;
}
export interface ComponentEntity {
  $: $11;
}
export interface $11 {
  ref: string;
  amount: string;
}
export interface UseEntity {
  $: $12;
}
export interface $12 {
  threshold: string;
}
export interface RestrictionEntity {
  $: $13;
}
export interface $13 {
  licence: string;
}
export interface OwnerEntity {
  $: $14;
}
export interface $14 {
  faction: string;
}
