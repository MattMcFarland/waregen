import { WareCollection, Ware } from "../../entities";
import { GeneratorConfig } from "../../generator";
import { IdRoster } from "../../utils/IdRoster";
import idx from "idx";
import { WareOrBlueprintEntity } from "../../entities/Ware";

export default function createWares(config: GeneratorConfig): WareCollection {
  const wares = config.addwaresList.map(addware => {
    const ids = new IdRoster(addware.Attributes.id, config.modPrefix);
    const wareDef = <WareOrBlueprintEntity>idx(addware, _ => _.ware[0]);
    const ware = new Ware(wareDef, config.defaultWare);
    ware.id = ids.ware;
    return ware;
  });
  const blueprintWares = config.addwaresList.map(addware => {
    const ids = new IdRoster(addware.Attributes.id, config.modPrefix);
    const wareDef = <WareOrBlueprintEntity>idx(addware, _ => _.blueprint[0]);
    const bpWare = new Ware(wareDef, config.defaultBlueprint);
    bpWare.id = ids.productionBlueprintId;
    bpWare.componentRef = ids.productionMacro;
    bpWare.componentAmount = 1;
    return bpWare;
  });
  return new WareCollection([...wares, ...blueprintWares]);
}
