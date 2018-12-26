import idx from "idx";
import { X4Entity, X4EntityType } from "./X4Entity";
import {
  BasketEntity,
  WareEntity as BasketWareEntity
} from "@@/XMLTypes/X4LibraryBaskets";
import { clone } from "../../lib/utils/object";
export type BasketWareEntity = BasketWareEntity;
export type BasketWareEntities = BasketWareEntity[];

export interface BasketInterface {
  id?: string;
  name?: string;
  description?: string;
  wares?: string[];
}
export class Basket extends X4Entity<BasketEntity> {
  private proxy: any;
  private _wares: string[] = [];
  onImport(xmlDef: BasketEntity) {}
  set id(v: string) {
    this.xmlDef.Attributes.id = v;
  }
  get id() {
    return this.xmlDef.Attributes.id;
  }
  set name(v: string) {
    this.xmlDef.Attributes.name = v;
  }
  get name() {
    return <string>idx(this.xmlDef, _ => _.Attributes.name);
  }
  set description(v: string) {
    this.xmlDef.Attributes.description = v;
  }
  get description() {
    return <string>idx(this.xmlDef, _ => _.Attributes.description);
  }
  get wares() {
    return this.proxy;
  }
  set wares(v: string[]) {
    const xmlDef = this.xmlDef;
    const handler = {
      set(target: string[], key: string, value: string) {
        xmlDef.wares = [
          {
            ware: [
              ...((xmlDef.wares && xmlDef.wares[0] && xmlDef.wares[0].ware) ||
                []),
              mapName(value)
            ]
          }
        ];
        return Reflect.set(target, key, value);
      },
      deleteProperty(target: string[], key: string) {
        return Reflect.deleteProperty(target, key);
      }
    };
    this.proxy = new Proxy(this._wares, handler);
    Object.assign(this.proxy, v);
  }

  constructor(basketInterface?: BasketInterface, xmlDefOptions?: BasketEntity) {
    super(
      X4EntityType.LIBRARY_BASKET,
      "basket",
      xmlDefOptions || getBasketDefaults()
    );
    this.wares = [];
    if (basketInterface) {
      if (basketInterface.description)
        this.description = basketInterface.description;
      if (basketInterface.id) this.id = basketInterface.id;
      if (basketInterface.name) this.name = basketInterface.name;
      if (basketInterface.wares) this.wares = basketInterface.wares;
    }
  }
}

export function getBasketDefaults() {
  return clone(<BasketEntity>(<unknown>{
    Attributes: {}
  }));
}

export function mapName(name: string): any {
  return {
    Attributes: {
      ware: name
    }
  };
}

export function findInXmlDef(xmlDef: BasketEntity, value: string) {
  const waresArray = <BasketWareEntities>idx(xmlDef, _ => _.wares[0].ware);
  return waresArray.find((e: BasketWareEntity) => e.Attributes.ware === value);
}

export default Basket;
