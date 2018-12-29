import { GeneratorConfig } from "..";
import { Basket, BasketCollection } from "../../entities";
import { IdRoster } from "../../utils/IdRoster";

interface BasketHash {
  [key: string]: string[];
}

export default function createBasketCollection(
  config: GeneratorConfig
): BasketCollection {
  const baskets = new BasketCollection();
  const basketHash = <BasketHash>{};
  config.addwaresList.forEach(addware => {
    const ids = new IdRoster(addware.Attributes.id, config.modPrefix);
    const insertionList = addware.Attributes.baskets
      .replace("[", "")
      .replace("]", "")
      .split(",")
      .map(str => str.trim());
    insertionList.forEach(basketName => {
      if (!basketHash[basketName]) {
        basketHash[basketName] = [ids.ware];
      } else {
        basketHash[basketName].push(ids.ware);
      }
    });
  });
  Object.entries(basketHash).forEach(([id, wares]) => {
    baskets.add(new Basket({ id, wares }));
  });
  return baskets;
}
