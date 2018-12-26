import { Index as IndexHashItems, EntryEntity } from "@@/XMLTypes/X4Index";

import { isIndexEntry } from "./indexValidators";
import { X4Entity, X4EntityType } from "./X4Entity";
import { clone } from "@@/utils/object";

export interface IndexHashInterface {
  [key: string]: string | number | boolean;
}

export const getIndexDefaults = () => {
  return clone(<IndexHashItems>{
    entry: []
  });
};

export function findInXmlDef(
  xmlDef: IndexHashItems,
  key: String
): EntryEntity | undefined {
  if (Array.isArray(xmlDef.entry)) {
    return xmlDef.entry.find((e: EntryEntity) => e.Attributes.name === key);
  }
}

export class IndexHash extends X4Entity<IndexHashItems> {
  private hash = {};
  private proxy: any;
  get entries(): IndexHashInterface {
    return this.proxy;
  }
  set entries(v: IndexHashInterface) {
    const xmlDef = this.xmlDef;
    const handler = {
      set(target: IndexHashInterface, key: string, value: string) {
        if (!Array.isArray(xmlDef.entry)) {
          xmlDef.entry = [mapKeyValue(key, value)];
          return Reflect.set(target, key, value);
        }

        const item = findInXmlDef(xmlDef, key);

        if (!item) {
          xmlDef.entry.push(mapKeyValue(key, value));
          return Reflect.set(target, key, value);
        }

        if (!isIndexEntry(item)) {
          throw new TypeError(`invalid entry assigned to IndexHash`);
        }
        item.Attributes.value = value;
        return Reflect.set(target, key, value);
      },
      deleteProperty(target: IndexHashInterface, key: string) {
        return Reflect.deleteProperty(target, key);
      }
    };
    this.proxy = new Proxy(this.hash, handler);
    Object.assign(this.proxy, v);
  }
  constructor(hash: IndexHashInterface = {}) {
    super(X4EntityType.HASH, "index", getIndexDefaults());
    this.entries = hash;
    delete this.import;
  }
}

export function mapKeyValue(key: string, value: string) {
  return {
    Attributes: {
      name: key,
      value: value
    }
  };
}

export default IndexHash;
