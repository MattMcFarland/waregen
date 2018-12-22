export interface X4LibraryWares {
  wares: Wares;
}
export interface Wares {
  Children: Children;
}
export interface Children {
  production?: (ProductionEntity)[] | null;
  defaults?: (DefaultsEntity)[] | null;
  ware?: (WareEntity)[] | null;
}
export interface ProductionEntity {
  Children: Children1;
}
export interface Children1 {
  method?: (MethodEntity)[] | null;
}
export interface MethodEntity {
  Attributes: Attributes;
  Children: Children2;
}
export interface Attributes {
  id: string;
}
export interface Children2 {
  default?: (DefaultEntity)[] | null;
}
export interface DefaultEntity {
  Attributes: Attributes1;
}
export interface Attributes1 {
  race: string;
}
export interface DefaultsEntity {
  Attributes: Attributes2;
  Children: Children3;
}
export interface Attributes2 {
  id: string;
  name: string;
  transport: string;
  volume: number;
  tags: string;
}
export interface Children3 {
  price?: (PriceEntity)[] | null;
  production?: (ProductionEntity1)[] | null;
  container?: (ContainerEntity)[] | null;
  icon?: (IconEntity)[] | null;
}
export interface PriceEntity {
  Attributes: Attributes3;
}
export interface Attributes3 {
  min: number;
  average: number;
  max: number;
}
export interface ProductionEntity1 {
  Attributes: Attributes4;
  Children: Children4;
}
export interface Attributes4 {
  time: number;
  amount: number;
  method: string;
  name: string;
}
export interface Children4 {
  effects?: (EffectsEntity)[] | null;
}
export interface EffectsEntity {
  Children: Children5;
}
export interface Children5 {
  effect?: (EffectEntity)[] | null;
}
export interface EffectEntity {
  Attributes: Attributes5;
}
export interface Attributes5 {
  type: string;
  product: number;
}
export interface ContainerEntity {
  Attributes: Attributes6;
}
export interface Attributes6 {
  ref: string;
}
export interface IconEntity {
  Attributes: Attributes7;
}
export interface Attributes7 {
  active: string;
  video: string;
}
export interface WareEntity {
  Attributes: Attributes8;
  Children: Children6;
}
export interface Attributes8 {
  id: string;
  name: string;
  description?: string | null;
  factoryname?: string | null;
  group?: string | null;
  transport: string;
  volume: number;
  tags?: string | null;
  illegal?: string | null;
}
export interface Children6 {
  price?: (PriceEntity)[] | null;
  production?: (ProductionEntity2)[] | null;
  icon?: (IconEntity1)[] | null;
  component?: (ComponentEntity)[] | null;
  use?: (UseEntity)[] | null;
  restriction?: (RestrictionEntity)[] | null;
  owner?: (OwnerEntity)[] | null;
}
export interface ProductionEntity2 {
  Attributes: Attributes4;
  Children: Children7;
}
export interface Children7 {
  primary?: (PrimaryEntity)[] | null;
  effects?: (EffectsEntity)[] | null;
}
export interface PrimaryEntity {
  Children: Children8;
}
export interface Children8 {
  ware?: (WareEntity1)[] | null;
}
export interface WareEntity1 {
  Attributes: Attributes9;
}
export interface Attributes9 {
  ware: string;
  amount: number;
}
export interface IconEntity1 {
  Attributes: Attributes10;
}
export interface Attributes10 {
  active: string;
  video?: string | null;
}
export interface ComponentEntity {
  Attributes: Attributes11;
}
export interface Attributes11 {
  ref: string;
  amount: number;
}
export interface UseEntity {
  Attributes: Attributes12;
}
export interface Attributes12 {
  threshold: number;
}
export interface RestrictionEntity {
  Attributes: Attributes13;
}
export interface Attributes13 {
  licence: string;
}
export interface OwnerEntity {
  Attributes: Attributes14;
}
export interface Attributes14 {
  faction: string;
}
