import { IconCollection, Icon } from "../../entities";
import pathBuilder from "../../utils/PathBuilder";
import { GeneratorConfig } from "../../generator";
import { IdRoster } from "../../utils/IdRoster";

export default function createIcons(config: GeneratorConfig): IconCollection {
  const icons = config.addwaresList.map(ware => {
    const ids = new IdRoster(ware.Attributes.id, config.modPrefix);
    return new Icon({
      name: ids.iconName,
      texture: pathBuilder(config, ware.Attributes.id)
        .dirModPath()
        .fileIconDDS()
        .toString(),
      width: 256,
      height: 256
    });
  });

  return new IconCollection(icons);
}
