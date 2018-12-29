import { IndexHash } from "../../entities";
import { IndexByString } from "../../utils/object/types";
import { PathBuilder } from "../../utils/PathBuilder";
import { GeneratorConfig } from "../../generator";
import { IdRoster } from "../../utils/IdRoster";

export default function createMacroIndex(config: GeneratorConfig): IndexHash {
  const hash: IndexByString = config.addwaresList.reduce(
    (acc: IndexByString, addware) => {
      const baseId = addware.Attributes.id;
      const ids = new IdRoster(baseId, config.modPrefix);

      acc[ids.productionMacro] = new PathBuilder(config, baseId)
        .dirModPath()
        .fileProductionMacroXML()
        .toString();
      acc[ids.wareMacro] = new PathBuilder(config, baseId)
        .dirModPath()
        .fileWareMacroXML()
        .toString();
      return acc;
    },
    {}
  );

  return new IndexHash(hash);
}
