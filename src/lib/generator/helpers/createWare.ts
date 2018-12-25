import { AddwareEntity, DefaultsEntity } from "@@/XMLTypes/X4WareGenXML";
import { Resolver } from "@@/lib/utils";
import { log } from "@@/lib/utils/System";

export default async function processWare(
  addware: AddwareEntity,
  resolver: Resolver,
  defaults: DefaultsEntity
) {
  const wareId = addware.Attributes.id;
  const cloneProductionModuleFrom =
    addware.Attributes.cloneProductionModuleFrom;
  const baskets = addware.Attributes.baskets;
  const wareName = resolver.getWareName(wareId);
  log.process(
    `${wareId} as ${wareName}, extending ${cloneProductionModuleFrom}, baskets: ${baskets}`
  );
}
