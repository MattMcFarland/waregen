import { BasketCollection } from "../BasketCollection";
import { Basket } from "../Basket";
import { XMLPatchTypes } from "../X4Entity";

const basketTest = (id: string, wares: string[] = []) => ({
  id,
  wares,
  name: `name for ${id}`,
  description: `description of ${id}`
});

describe("BasketCollection", () => {
  describe("constructor", () => {
    test("adds baskets if passed in via an array", () => {
      const someBasketCollection = new BasketCollection([
        new Basket(basketTest("test_a")),
        new Basket(basketTest("test_b")),
        new Basket(basketTest("test_c"))
      ]);
      expect(someBasketCollection.extract("test_a")).toBeDefined();
      expect(someBasketCollection.extract("test_b")).toBeDefined();
      expect(someBasketCollection.extract("test_c")).toBeDefined();
    });
    test("empty constructor", () => {
      const basketCollection = new BasketCollection();
      expect(basketCollection).toBeDefined();
    });
  });
  describe("instance.add()", () => {
    let basketCollection: BasketCollection | null = null;
    beforeEach(() => {
      basketCollection = new BasketCollection();
      const myBasket = new Basket(basketTest("myBasket", ["ware_a", "ware_b"]));
      basketCollection.add(myBasket);
    });
    afterEach(() => {
      basketCollection = null;
    });
    test("index", () => {
      if (!basketCollection) {
        throw new TypeError("basketCollection must be defined at this point!");
      }
      expect(basketCollection.extract("myBasket")).toBeDefined();
    });
    test("instance.toJson()", () => {
      if (!basketCollection) {
        throw new TypeError("basketCollection must be defined at this point!");
      }
      expect(basketCollection.toJson()).toMatchInlineSnapshot(
        `"{\\"basket\\":[{\\"Attributes\\":{\\"description\\":\\"description of myBasket\\",\\"id\\":\\"myBasket\\",\\"name\\":\\"name for myBasket\\"},\\"wares\\":[{\\"ware\\":[{\\"Attributes\\":{\\"ware\\":\\"ware_a\\"}},{\\"Attributes\\":{\\"ware\\":\\"ware_b\\"}}]}]}]}"`
      );
    });
    test("instance.toXml()", () => {
      if (!basketCollection) {
        throw new TypeError("basketCollection must be defined at this point!");
      }
      expect(basketCollection.toXml()).toMatchInlineSnapshot(`
"<baskets>
  <basket description=\\"description of myBasket\\" id=\\"myBasket\\" name=\\"name for myBasket\\">
    <wares>
      <ware ware=\\"ware_a\\"/>
      <ware ware=\\"ware_b\\"/>
    </wares>
  </basket>
</baskets>"
`);
    });
  });
  describe("instance.remove()", () => {
    const basketCollection = new BasketCollection([
      new Basket(basketTest("test_a", ["foo", "bar"])),
      new Basket(basketTest("test_b", ["foo", "bar"])),
      new Basket(basketTest("test_c", ["foo", "bar"]))
    ]);
    test("success", () => {
      basketCollection.remove("test_c");
      expect(basketCollection.extract("test_c")).toBeUndefined();
    });
  });
  describe("instance.replace()", () => {
    const basketCollection = new BasketCollection([
      new Basket(basketTest("test_a", ["foo", "bar"])),
      new Basket(basketTest("test_b", ["foo", "bar"])),
      new Basket(basketTest("test_c", ["foo", "bar"]))
    ]);
    test("success", () => {
      const basketReplacement = new Basket();
      basketReplacement.name = "replacement";
      basketReplacement.id = "test_a";
      basketCollection.replace(basketReplacement);
      expect(basketCollection.extract("test_a").name).toBe("replacement");
    });
  });
  describe("instance.import()", () => {
    const testXml = () => {
      return `
      <baskets>
        <basket id='foo'>
          <wares>
            <ware ware='fooware1' />
            <ware ware='fooware2' />
            <ware ware='fooware3' />
          </wares>
        </basket>
        <basket id='bar'>
          <wares>
            <ware ware='barware1' />
            <ware ware='barware2' />
            <ware ware='barware3' />
          </wares>
        </basket>
        <basket id='baz'>
        <wares>
          <ware ware='bazware1' />
            <ware ware='bazware2' />
            <ware ware='bazware3' />
          </wares>
        </basket>
      </baskets>
      `;
    };
    test("toXML()", async () => {
      const testCollection = new BasketCollection();
      await testCollection.import(testXml());
      expect(testCollection.toXml()).toMatchSnapshot();
    });
    test("with add", async () => {
      const testCollection = new BasketCollection();
      await testCollection.import(testXml());
      testCollection.add(new Basket(basketTest("A")));
      expect(testCollection.toXml()).toMatchSnapshot();
    });
    test("with remove", async () => {
      const testCollection = new BasketCollection();
      await testCollection.import(testXml());
      testCollection.remove("baz");
      expect(testCollection.toXml()).toMatchSnapshot();
    });
  });
  describe("instance.toXmlPatch()", () => {
    const someBasketCollection = new BasketCollection([
      new Basket(basketTest("test_a", ["foo", "bar"])),
      new Basket(basketTest("test_b", ["foo", "bar"])),
      new Basket(basketTest("test_c", ["foo", "bar"]))
    ]);
    expect(someBasketCollection.toXmlPatch(XMLPatchTypes.ADD))
      .toMatchInlineSnapshot(`
"<diff>
  <add sel=\\"*/basket[@id='test_a']\\">
    <wares>
      <ware ware=\\"foo\\"/>
      <ware ware=\\"bar\\"/>
    </wares>
  </add>
  <add sel=\\"*/basket[@id='test_b']\\">
    <wares>
      <ware ware=\\"foo\\"/>
      <ware ware=\\"bar\\"/>
    </wares>
  </add>
  <add sel=\\"*/basket[@id='test_c']\\">
    <wares>
      <ware ware=\\"foo\\"/>
      <ware ware=\\"bar\\"/>
    </wares>
  </add>
</diff>"
`);
  });
});
