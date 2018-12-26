import { Basket, findInXmlDef } from "./Basket";
import { BasketEntity } from "../../XMLTypes/X4LibraryBaskets";
const testBasketOps = {
  id: "foo",
  name: "bar",
  description: "foo bar",
  wares: ["baz", "bazbuzz"]
};
describe("Basket", () => {
  describe("constructor", () => {
    test("instance.wares are set", () => {
      const testBasket = new Basket(testBasketOps);
      expect(testBasket.wares).toContain("baz");
      expect(testBasket.wares).toContain("bazbuzz");
    });
    test("instance.wares mutate __xmlDef", () => {
      const testBasket = new Basket(testBasketOps);
      const basketEntity = <BasketEntity>testBasket.__xmlDef;
      const bazWare = findInXmlDef(basketEntity, "baz");
      const bazBuzzWare = findInXmlDef(basketEntity, "bazbuzz");
      expect(bazWare).toHaveProperty("Attributes");
      expect(bazWare && bazWare.Attributes.ware).toBe("baz");
      expect(bazBuzzWare).toHaveProperty("Attributes");
      expect(bazBuzzWare && bazBuzzWare.Attributes.ware).toBe("bazbuzz");
    });
    test("converts to xml", () => {
      const testBasket = new Basket(testBasketOps);
      expect(testBasket.toXml()).toMatchInlineSnapshot(`
"<basket description=\\"foo bar\\" id=\\"foo\\" name=\\"bar\\">
  <wares>
    <ware ware=\\"baz\\"/>
    <ware ware=\\"bazbuzz\\"/>
  </wares>
</basket>"
`);
    });
  });
});
