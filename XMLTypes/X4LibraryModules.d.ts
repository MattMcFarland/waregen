export interface X4LibraryModules {
  modules: Modules;
}
export interface Modules {
  module?: (ModuleEntity)[] | null;
}
export interface ModuleEntity {
  $: $;
  category?: (CategoryEntity)[] | null;
  compatibilities?: (CompatibilitiesEntity)[] | null;
}
export interface $ {
  id: string;
  group: string;
}
export interface CategoryEntity {
  $: $1;
}
export interface $1 {
  ware?: string | null;
  tags: string;
  race: string;
  faction: string;
}
export interface CompatibilitiesEntity {
  limits?: (LimitsEntity)[] | null;
  production?: (ProductionEntity)[] | null;
}
export interface LimitsEntity {
  $: $2;
}
export interface $2 {
  production: string;
}
export interface ProductionEntity {
  $: $3;
}
export interface $3 {
  ware: string;
  chance: string;
}
