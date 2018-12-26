import { Resolver, clone, range } from "@@/utils";
import { DefaultsEntity, AddwareEntity } from "@@/XMLTypes/X4WareGenXML";

export interface IMockGeneratorArgs {
  defaults: DefaultsEntity;
  resolver: Resolver;
  addWares: AddwareEntity[];
}

export const mockGeneratorArgs = (): IMockGeneratorArgs => ({
  resolver: mockResolver(),
  defaults: mockDefaults(),
  addWares: mockAddwares(4)
});

export const mockResolver = (): Resolver =>
  new Resolver(
    "/test/Game",
    "test_prefix",
    "test_extensions/test_mod",
    "test_unpacked"
  );

export const mockDefaults = (): DefaultsEntity => ({
  ware: [defaultWare()]
});

export const mockAddwares = (count: number): AddwareEntity[] => {
  return range(count).map(
    (i: number): AddwareEntity => ({
      Attributes: {
        baskets: `[test_basket_${i}]`,
        cloneProductionModuleFrom: `prod_module_macro_${i}`,
        id: `test_ware_${i}`
      }
    })
  );
};

const defaultWare = () =>
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
    ],
    container: [{ Attributes: { ref: "sm_gen_pickup_container_01_macro" } }],
    icon: [
      { Attributes: { active: "ware_default", video: "ware_noicon_macro" } }
    ]
  });
