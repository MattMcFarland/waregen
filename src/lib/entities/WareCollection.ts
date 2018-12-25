import { X4Entity, X4EntityType } from "./X4Entity";
import { Ware, WareEntity } from "./Ware";
import { Wares } from "@@/XMLTypes/X4LibraryWares";
export interface WaresIndex {
  [key: string]: Ware;
}

export class WareCollection extends X4Entity<Wares> {
  private waresIndex: WaresIndex = {};

  protected onImport(_xmlDef: Wares) {
    delete this.waresIndex;
    this.waresIndex = {};
    delete this.xmlDef;
    this.xmlDef = { ware: [] };

    if (Array.isArray(_xmlDef.ware)) {
      _xmlDef.ware.forEach((wareEntity: WareEntity) => {
        const ware = new Ware(wareEntity);
        this.add(ware);
      });
    }
  }
  add = (ware: Ware) => {
    if (this.waresIndex[ware.id]) {
      throw new Error(
        `ware ${ware.id} already exists, did you mean replaceWare?`
      );
    }
    this.waresIndex[ware.id] = ware;
    if (Array.isArray(this.xmlDef.ware)) {
      this.xmlDef.ware = [...this.xmlDef.ware, ware.__xmlDef];
    }
  };
  remove = (id: string) => {
    if (!this.waresIndex[id]) {
      throw new Error(`cant remove ware ${id} because it does not exist`);
    }
    delete this.waresIndex[id];
    if (Array.isArray(this.xmlDef.ware)) {
      this.xmlDef.ware = this.xmlDef.ware.filter(
        wareEntity => wareEntity.Attributes.id !== id
      );
    }
  };
  replace = (ware: Ware) => {
    this.remove(ware.id);
    this.add(ware);
  };
  extract = (wareId: string) => {
    return this.waresIndex[wareId];
  };
  constructor(optionalWaresList?: Ware[]) {
    super(X4EntityType.LIBRARY_WARES, "wares", {
      ware: []
    });
    if (Array.isArray(optionalWaresList)) {
      optionalWaresList.forEach((ware: Ware) => {
        this.add(ware);
      });
    }
  }
}

export default WareCollection;
