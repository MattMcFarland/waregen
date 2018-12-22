export interface X4LibraryBaskets {
  baskets: Baskets;
}
export interface Baskets {
  Children: Children;
}
export interface Children {
  basket?: (BasketEntity)[] | null;
}
export interface BasketEntity {
  Attributes: Attributes;
  Children: Children1;
}
export interface Attributes {
  id: string;
  name?: string | null;
  description?: string | null;
}
export interface Children1 {
  wares?: (WaresEntityOrWareEntity)[] | null;
  ware?: (WaresEntityOrWareEntity)[] | null;
}
export interface WaresEntityOrWareEntity {
  Children: Children2;
}
export interface Children2 {
  ware?: (WareEntity)[] | null;
}
export interface WareEntity {
  Attributes: Attributes1;
}
export interface Attributes1 {
  ware: string;
}
