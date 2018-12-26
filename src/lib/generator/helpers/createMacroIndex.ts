import { Resolver } from "@@/utils";
import { DefaultsEntity, AddwareEntity } from "@@/XMLTypes\\X4WareGenXML";
import { IndexHash } from "@@/entities";

export default function createMacroIndex(
  resolver: Resolver,
  defaults: DefaultsEntity,
  addWares: AddwareEntity[]
): IndexHash {
  return new IndexHash();
  // const index = addWares.reduce((acc, addware) => {}, {});
}
