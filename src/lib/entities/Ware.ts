import { X4Entity, X4EntityType } from "./X4Entity";

import idx from "idx";
import {
  WareEntity as BaseWareEntity,
  ContainerEntity,
  Attributes3,
  Attributes10,
  ProductionEntity2,
  Attributes13,
  Attributes11,
  Attributes14,
  Attributes12
} from "@@/XMLTypes/X4LibraryWares";

export type ProductionEntities = ProductionEntity2[];
export type ProductionEntity = ProductionEntity2;
export type ComponentAttributes = Attributes11;
export type PriceAttributes = Attributes3;
export type IconAttributes = Attributes10;
export type RestrictionAttributes = Attributes13;
export type OwnerAttributes = Attributes14;
export type UseAttributes = Attributes12;
export interface WareEntity extends BaseWareEntity {
  container?: (ContainerEntity)[] | null;
}

export class Ware extends X4Entity<WareEntity> {
  set id(v: string) {
    this.xmlDef.Attributes.id = v;
  }
  get id() {
    return this.xmlDef.Attributes.id;
  }
  set name(v: string) {
    this.xmlDef.Attributes.name = v;
  }
  get name() {
    return this.xmlDef.Attributes.name;
  }
  set description(v: string | null) {
    this.xmlDef.Attributes.description = v;
  }
  get description() {
    return this.xmlDef.Attributes.description || null;
  }
  set factoryname(v: string | null) {
    this.xmlDef.Attributes.factoryname = v;
  }
  get factoryname() {
    return this.xmlDef.Attributes.factoryname || null;
  }
  set group(v: string | null) {
    this.xmlDef.Attributes.group = v;
  }
  get group() {
    return this.xmlDef.Attributes.group || null;
  }
  set transport(v: string) {
    this.xmlDef.Attributes.transport = v;
  }
  get transport() {
    return this.xmlDef.Attributes.transport;
  }
  set volume(v: number) {
    this.xmlDef.Attributes.volume = v;
  }
  get volume() {
    return this.xmlDef.Attributes.volume;
  }
  set tags(v: string | null) {
    this.xmlDef.Attributes.tags = v;
  }
  get tags() {
    return this.xmlDef.Attributes.tags || null;
  }
  set illegal(v: string | null) {
    this.xmlDef.Attributes.illegal = v;
  }
  get illegal() {
    return this.xmlDef.Attributes.illegal || null;
  }

  set price(v: PriceAttributes) {
    this.xmlDef.price = [{ Attributes: v }];
  }
  get price(): PriceAttributes {
    return <PriceAttributes>idx(this.xmlDef.price, _ => _[0].Attributes);
  }

  set icon(v: IconAttributes) {
    this.xmlDef.icon = [{ Attributes: v }];
  }
  get icon() {
    return <IconAttributes>idx(this.xmlDef, _ => _.icon[0].Attributes) || null;
  }

  set productionNodes(v: ProductionEntities) {
    this.xmlDef.production = v;
  }
  get productionNodes() {
    return <ProductionEntities>this.xmlDef.production || null;
  }

  set component(v: ComponentAttributes) {
    this.xmlDef.component = [{ Attributes: v }];
  }
  get component() {
    return (
      <ComponentAttributes>idx(this.xmlDef, _ => _.component[0].Attributes) ||
      null
    );
  }

  set restriction(v: RestrictionAttributes) {
    this.xmlDef.restriction = [{ Attributes: v }];
  }
  get restriction() {
    return (
      <RestrictionAttributes>(
        idx(this.xmlDef, _ => _.restriction[0].Attributes)
      ) || null
    );
  }

  set owner(v: OwnerAttributes) {
    this.xmlDef.owner = [{ Attributes: v }];
  }
  get owner() {
    return <OwnerAttributes>(
      (idx(this.xmlDef, _ => _.owner[0].Attributes) || null)
    );
  }

  set use(v: UseAttributes) {
    this.xmlDef.use = [{ Attributes: v }];
  }
  get use() {
    return <UseAttributes>idx(this.xmlDef, _ => _.use[0].Attributes) || null;
  }

  constructor(options?: WareEntity) {
    super(
      X4EntityType.LIBRARY_WARE,
      "ware",
      {
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
        container: [
          { Attributes: { ref: "sm_gen_pickup_container_01_macro" } }
        ],
        icon: [
          { Attributes: { active: "ware_default", video: "ware_noicon_macro" } }
        ]
      },
      options
    );
  }
}
