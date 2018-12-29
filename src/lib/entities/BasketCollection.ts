import { X4Entity, X4EntityType, XMLPatchTypes } from "./X4Entity";
import {
  BasketEntity,
  Baskets,
  WareEntity as BasketWareEntity,
  WaresEntityOrWareEntity as BasketEntityWares
} from "..//XMLTypes/X4LibraryBaskets";
import { BuilderOptions } from "../utils/xml";
import { Basket, BasketInterface } from "./Basket";

export type BasketWareEntity = BasketWareEntity;
export type BasketWareEntities = BasketWareEntity[];
export interface BasketIndex {
  [key: string]: Basket;
}
export class BasketCollection extends X4Entity<Baskets> {
  private basketIndex: BasketIndex = {};
  protected onImport(_xmlDef: Baskets) {
    delete this.basketIndex;
    this.basketIndex = {};
    delete this.xmlDef;
    this.xmlDef = { basket: [] };

    if (Array.isArray(_xmlDef.basket)) {
      _xmlDef.basket.forEach((basketEntity: BasketEntity) => {
        const constructorOptions: BasketInterface = {
          id: basketEntity.Attributes && basketEntity.Attributes.id,
          name:
            (basketEntity.Attributes && basketEntity.Attributes.name) ||
            undefined,
          description:
            (basketEntity.Attributes && basketEntity.Attributes.description) ||
            undefined,
          wares:
            (basketEntity.wares && importBasketWares(basketEntity.wares)) ||
            undefined
        };
        const basket = new Basket(constructorOptions);
        this.add(basket);
      });
    }
  }
  add = (basket: Basket) => {
    if (this.basketIndex[basket.id]) {
      throw new Error(
        `basket ${basket.id} already exists, did you mean replaceWare?`
      );
    }
    this.basketIndex[basket.id] = basket;
    if (Array.isArray(this.xmlDef.basket)) {
      this.xmlDef.basket = [...this.xmlDef.basket, basket.__xmlDef];
    }
  };
  remove = (id: string) => {
    if (!this.basketIndex[id]) {
      throw new Error(`cant remove basket ${id} because it does not exist`);
    }
    delete this.basketIndex[id];
    if (Array.isArray(this.xmlDef.basket)) {
      this.xmlDef.basket = this.xmlDef.basket.filter(
        basketEntity => basketEntity.Attributes.id !== id
      );
    }
  };
  public toXmlPatch(
    patchType: XMLPatchTypes,
    selector?: string,
    pretty: boolean = true,
    options: BuilderOptions = {}
  ) {
    options.rootName = "diff";
    const obj = {
      [patchType]: Object.values(this.basketIndex).map(basket => {
        return {
          ...basket.__xmlDef,
          Attributes: { sel: basket.selector }
        };
      })
    };
    return this.xmlBuild(obj, pretty, options);
  }
  replace = (basket: Basket) => {
    this.remove(basket.id);
    this.add(basket);
  };
  extract = (wareId: string) => {
    return this.basketIndex[wareId];
  };
  constructor(optionalBasketList?: Basket[]) {
    super(X4EntityType.LIBRARY_BASKETS, "baskets", {
      basket: []
    });
    if (Array.isArray(optionalBasketList)) {
      optionalBasketList.forEach((basket: Basket) => {
        this.add(basket);
      });
    }
  }
}

export function importBasketWares(wares: BasketEntityWares[]) {
  if (wares[0].ware) {
    return wares[0].ware.map(ware => ware.Attributes.ware);
  }
}

export default BasketCollection;
