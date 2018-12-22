export interface X4LibraryModules {
  modules: Modules;
}
export interface Modules {
  module?: (ModuleEntity)[] | null;
}
export interface ModuleEntity {
  Attributes: Attributes;
  category?: (CategoryEntity)[] | null;
  compatibilities?: (CompatibilitiesEntity)[] | null;
}
export interface Attributes {
  id: string;
  group: string;
}
export interface CategoryEntity {
  Attributes: Attributes1;
}
export interface Attributes1 {
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
  Attributes: Attributes2;
}
export interface Attributes2 {
  production: number;
}
export interface ProductionEntity {
  Attributes: Attributes3;
}
export interface Attributes3 {
  ware: string;
  chance: number;
}
