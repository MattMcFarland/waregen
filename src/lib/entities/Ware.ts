import { X4Entity } from "./X4Entity";
import { WareEntity, Attributes8 } from "../../../XMLTypes/X4LibraryWares";

const baseXmlDef: WareEntity = {
  Attributes: {
    id: "",
    name: "",
    transport: "",
    volume: 1
  }
};

export class Ware extends X4Entity {
  xmlDef: WareEntity = baseXmlDef;
  rootName: string = "ware";
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
    return this.xmlDef.Attributes.name;
  }
  set description(v: string | null) {
    this.xmlDef.Attributes.description = v;
  }
  get description() {
    return this.xmlDef.Attributes.description || null;
  }
  set factoryname(v: string | null) {
    this.xmlDef.Attributes.factoryname = v;
  }
  get factoryname() {
    return this.xmlDef.Attributes.factoryname || null;
  }
  set group(v: string | null) {
    this.xmlDef.Attributes.group = v;
  }
  get group() {
    return this.xmlDef.Attributes.group || null;
  }
  set transport(v: string) {
    this.xmlDef.Attributes.transport = v;
  }
  get transport() {
    return this.xmlDef.Attributes.transport;
  }
  set volume(v: number) {
    this.xmlDef.Attributes.volume = v;
  }
  get volume() {
    return this.xmlDef.Attributes.volume;
  }
  set tags(v: string | null) {
    this.xmlDef.Attributes.tags = v;
  }
  get tags() {
    return this.xmlDef.Attributes.tags || null;
  }
  set illegal(v: string | null) {
    this.xmlDef.Attributes.illegal = v;
  }
  get illegal() {
    return this.xmlDef.Attributes.illegal || null;
  }
  constructor(
    options: WareConstructOptions | WareEntity | undefined = baseXmlDef
  ) {
    super("ware");
    if (isXmlDef(options)) {
      this.xmlDef = options;
    } else if (isWareConstructionOptions(options)) {
      this.xmlDef = {
        Attributes: options
      };
    }
  }
}

interface WareConstructOptions extends Attributes8 {}

function isXmlDef(arg: any | WareEntity): arg is WareEntity {
  return (<WareEntity>arg && arg).$ !== undefined;
}
function isWareConstructionOptions(
  arg: any | WareConstructOptions
): arg is WareConstructOptions {
  return (<WareConstructOptions>arg).id !== undefined;
}
