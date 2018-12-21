export interface X4LibraryBaskets {
  baskets: Baskets;
}
export interface Baskets {
  basket?: (BasketEntity)[] | null;
}
export interface BasketEntity {
  $: $;
  wares?: (WaresEntityOrWareEntity)[] | null;
  ware?: (WaresEntityOrWareEntity)[] | null;
}
export interface $ {
  id: string;
  name?: string | null;
  description?: string | null;
}
export interface WaresEntityOrWareEntity {
  ware?: (WareEntity)[] | null;
}
export interface WareEntity {
  $: $1;
}
export interface $1 {
  ware: string;
}
