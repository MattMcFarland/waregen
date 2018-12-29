import { GeneratorConfig } from "../../generator";
import { AddwareEntity } from "../../XMLTypes/X4WareGenXML";
import { IdRoster } from "../../utils/IdRoster";

interface MapItemInstance {
  addware: AddwareEntity;
  ids: IdRoster;
}

export default function mapFactory<T>(
  config: GeneratorConfig,
  mapFn: (
    value: MapItemInstance,
    index: Number,
    thisArg: MapItemInstance[]
  ) => T
) {
  const newMap = config.addwaresList.map(item => ({
    addware: item,
    ids: new IdRoster(item.Attributes.id, config.modPrefix)
  }));
  return newMap.map(mapFn);
}
