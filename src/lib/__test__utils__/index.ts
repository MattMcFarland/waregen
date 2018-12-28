import { clone, range } from "@@/utils";
import { DefaultWareEntity, DefaultBlueprintEntity } from "@@/entities/Ware";
import { AddwareEntity } from "@@/XMLTypes/X4WareGenXML";
import { GeneratorConfig } from "@@/generator";

export const mockGeneratorConfig = (): GeneratorConfig => ({
  defaultWare: defaultWare(),
  defaultBlueprint: defaultBlueprint(),
  addwaresList: mockAddwares(4),
  gamePath: "/test/Game",
  modPath: "extensions/test",
  modPrefix: "pfx",
  unpackedPath: "unpacked"
});

export const mockAddwares = (count: number): AddwareEntity[] => {
  const char = (code: number) => "abcdefghijklmnopqrstuvwxyz"[code];

  return range(count).map(
    (i: number): AddwareEntity => ({
      Attributes: {
        baskets: `[test_basket_${char(i)}]`,
        cloneProductionModuleFrom: `prod_cloned_macro_${char(i)}`,
        id: `${char(i)}`
      },
      ware: [mockWare(`${char(i)}`)],
      blueprint: [mockBlueprint(`${char(i)}`)]
    })
  );
};

export const mockWare = (name: string) => {
  const ware = defaultWare();
  ware.Attributes.name = name;
  return clone(ware);
};
export const mockBlueprint = (name: string) => {
  const bp = defaultBlueprint();
  bp.Attributes.name = `${name} production`;
  return clone(bp);
};

export const defaultBlueprint = (): DefaultBlueprintEntity => {
  const bp = <DefaultBlueprintEntity>defaultWare();
  bp.Attributes.tags = "module";
  bp.Attributes.description = "blueprint description";
  bp.restriction = [
    {
      Attributes: { licence: "station_gen_basic " }
    }
  ];
  bp.research = [
    {
      Attributes: { time: 10 },
      research: [
        { ware: [{ Attributes: { ware: "research_module_production" } }] }
      ]
    }
  ];
  bp.owner = [
    { Attributes: { faction: "antigone" } },
    { Attributes: { faction: "argon" } },
    { Attributes: { faction: "holyorder" } },
    { Attributes: { faction: "paranid" } },
    { Attributes: { faction: "teladi" } }
  ];
  bp.production = [
    {
      Attributes: {
        time: 791,
        amount: 1,
        method: "default",
        name: "{20206,101}"
      },
      primary: [
        {
          ware: [
            { Attributes: { ware: "claytronics", amount: 30 } },
            { Attributes: { ware: "energycells", amount: 75 } },
            { Attributes: { ware: "hullparts", amount: 150 } }
          ]
        }
      ]
    }
  ];
  return clone(bp);
};

export const defaultWare = (): DefaultWareEntity =>
  clone({
    Attributes: {
      id: "default",
      name: "default",
      transport: "container",
      volume: 1
    },
    price: [
      {
        Attributes: {
          min: 1,
          average: 1,
          max: 1
        }
      }
    ],
    production: [
      {
        Attributes: {
          time: 10,
          amount: 1,
          method: "default",
          name: "{20206, 101}"
        },
        primary: [
          {
            ware: [{ Attributes: { ware: "energycells", amount: 50 } }]
          }
        ],
        effects: [
          {
            effect: [
              {
                Attributes: { type: "efficiency", product: 1 }
              }
            ]
          }
        ]
      }
    ]
  });
