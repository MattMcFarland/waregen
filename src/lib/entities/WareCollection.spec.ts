import { WareCollection } from "./WareCollection";
import { Ware } from "./Ware";
import { WareEntity } from "../../../XMLTypes/X4LibraryWares";
const wareTest = (id: string): WareEntity => ({
  Attributes: {
    id,
    name: id,
    transport: "test",
    volume: 1
  }
});
describe("WaresCollection", () => {
  const wareCollection = new WareCollection();
  const ware = new Ware();
  const ware2 = <Ware>ware.clone();
  ware.id = "ware1";
  wareCollection.add(ware);
  ware2.id = "ware2";
  wareCollection.add(ware2);

  beforeEach(() => {});
  describe("constructor", () => {
    test("adds wares if passed in via an array", () => {
      const someWareCollection = new WareCollection([
        new Ware(wareTest("A")),
        new Ware(wareTest("B")),
        new Ware(wareTest("C"))
      ]);
      expect(someWareCollection.extract("A")).toBeDefined();
      expect(someWareCollection.extract("B")).toBeDefined();
      expect(someWareCollection.extract("C")).toBeDefined();
    });
  });
  describe("adding a ware", () => {
    test("index", () => {
      expect(wareCollection.extract("ware1")).toBeDefined();
      expect(wareCollection.extract("ware2")).toBeDefined();
    });
    test("toJson()", () => {
      expect(wareCollection.toJson()).toMatchSnapshot();
    });
    test("toXml()", () => {
      expect(wareCollection.toXml()).toMatchSnapshot();
    });
    test("throws error when an id already exists", () => {
      expect(() => {
        wareCollection.add(ware2);
      }).toThrow();
    });
  });
  describe("removing a ware", () => {
    beforeEach(() => {
      const ware3 = new Ware();
      ware3.id = "ware3";
      wareCollection.add(ware3);
      wareCollection.remove("ware3");
    });
    test("index", () => {
      expect(wareCollection.extract("ware1")).toBeDefined();
      expect(wareCollection.extract("ware2")).toBeDefined();
      expect(wareCollection.extract("ware3")).toBeUndefined();
    });
    test("toJson()", () => {
      expect(wareCollection.toJson()).toMatchSnapshot();
    });
    test("toXml()", () => {
      expect(wareCollection.toXml()).toMatchSnapshot();
    });
    test("throws error when an id doesn't exists", () => {
      expect(() => {
        wareCollection.remove("i dont exist");
      }).toThrow();
    });
  });
  describe("replacing wares", () => {
    beforeEach(() => {
      const wareReplacement = new Ware();
      wareReplacement.name = "replacement";
      wareReplacement.id = "ware2";
      wareCollection.replace(wareReplacement);
    });
    afterEach(() => {
      wareCollection.replace(ware2);
    });
    test("toJson()", () => {
      expect(wareCollection.toJson()).toMatchSnapshot();
    });
    test("toXml()", () => {
      expect(wareCollection.toXml()).toMatchSnapshot();
    });
    test("throws error when an id doesn't exists", () => {
      const nothere = new Ware();
      nothere.id = "nothere";
      expect(() => {
        wareCollection.replace(nothere);
      }).toThrow();
    });
  });
  describe("importing XML", () => {
    const testXml = () => {
      return `
      <wares>
    <ware id="advancedcomposites" name="{20201,401}" description="{20201,402}" factoryname="{20201,404}" group="hightech" transport="container" volume="32" tags="container economy">
    <price min="735" average="865" max="994" />
    <production time="300" amount="60" method="default" name="{20206,101}">
      <primary>
        <ware ware="energycells" amount="50" />
        <ware ware="graphene" amount="80" />
        <ware ware="refinedmetals" amount="80" />
      </primary>
      <effects>
        <effect type="work" product="0.2" />
      </effects>
    </production>
    <production time="300" amount="60" method="teladi" name="{20206,401}">
      <primary>
        <ware ware="energycells" amount="50" />
        <ware ware="graphene" amount="80" />
        <ware ware="teladianium" amount="58" />
      </primary>
      <effects>
        <effect type="work" product="0.2" />
      </effects>
    </production>
    <icon active="ware_advancedcomposites" video="ware_advancedcomposites_macro" />
  </ware>
  <ware id="advancedelectronics" name="{20201,101}" description="{20201,102}" factoryname="{20201,104}" group="shiptech" transport="container" volume="30" tags="container economy stationbuilding">
    <price min="1986" average="2207" max="2428" />
    <production time="720" amount="60" method="default" name="{20206,101}">
      <primary>
        <ware ware="energycells" amount="60" />
        <ware ware="microchips" amount="44" />
        <ware ware="quantumtubes" amount="20" />
      </primary>
      <effects>
        <effect type="work" product="0.22" />
      </effects>
    </production>
    <icon active="ware_advancedelectronics" video="ware_advancedelectronics_macro" />
  </ware>
  <ware id="antimattercells" name="{20201,201}" description="{20201,202}" factoryname="{20201,204}" group="refined" transport="container" volume="18" tags="container economy">
    <price min="181" average="202" max="222" />
    <production time="120" amount="110" method="default" name="{20206,101}">
      <primary>
        <ware ware="energycells" amount="100" />
        <ware ware="hydrogen" amount="320" />
      </primary>
      <effects>
        <effect type="work" product="0.21" />
      </effects>
    </production>
    <icon active="ware_antimattercells" video="ware_antimattercells_macro" />
  </ware>
  <ware id="antimatterconverters" name="{20201,301}" description="{20201,302}" factoryname="{20201,304}" group="shiptech" transport="container" volume="10" tags="container economy">
    <price min="626" average="737" max="847" />
    <production time="300" amount="150" method="default" name="{20206,101}">
      <primary>
        <ware ware="advancedcomposites" amount="20" />
        <ware ware="energycells" amount="80" />
        <ware ware="microchips" amount="30" />
      </primary>
      <effects>
        <effect type="work" product="0.23" />
      </effects>
    </production>
    <icon active="ware_antimatterconverters" video="ware_antimatterconverters_macro" />
  </ware>      
    </wares>`;
    };
    test("toXML()", async () => {
      const testCollection = new WareCollection();
      await testCollection.import(testXml());
      expect(testCollection.toXml()).toMatchSnapshot();
    });
    test("with add", async () => {
      const testCollection = new WareCollection();
      await testCollection.import(testXml());
      testCollection.add(new Ware(wareTest("A")));
      expect(testCollection.toXml()).toMatchSnapshot();
    });
    test("with remove", async () => {
      const testCollection = new WareCollection();
      await testCollection.import(testXml());
      testCollection.remove("advancedcomposites");
      expect(testCollection.toXml()).toMatchSnapshot();
    });
  });
});
