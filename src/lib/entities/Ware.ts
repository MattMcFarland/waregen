import { X4Entity } from "./X4Entity";
import { WareEntity, Attributes8 } from "../../../XMLTypes/X4LibraryWares";

const baseXmlDef = {
  Attributes: {
    id: "",
    name: "",
    transport: "",
    volume: 1
  },
  Children: {}
};

export class Ware extends X4Entity {
  xmlDef: WareEntity = baseXmlDef;
  rootName: string = "ware";
  constructor(
    options: WareConstructOptions | WareEntity | undefined = baseXmlDef
  ) {
    super("ware");
  }
}

interface WareConstructOptions extends Attributes8 {}
