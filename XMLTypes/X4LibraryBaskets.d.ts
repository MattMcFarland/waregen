export interface X4LibraryBaskets {
  baskets: Baskets;
}
export interface Baskets {
  basket?: (BasketEntity)[] | null;
}
export interface BasketEntity {
  Attributes: Attributes;
  wares?: (WaresEntityOrWareEntity)[] | null;
  ware?: (WaresEntityOrWareEntity)[] | null;
}
export interface Attributes {
  id: string;
  name?: string | null;
  description?: string | null;
}
export interface WaresEntityOrWareEntity {
  ware?: (WareEntity)[] | null;
}
export interface WareEntity {
  Attributes: Attributes1;
}
export interface Attributes1 {
  ware: string;
}
