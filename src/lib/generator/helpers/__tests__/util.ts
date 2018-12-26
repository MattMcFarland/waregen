import { Resolver } from "@@/lib/utils";
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

export const mockDefaults = (): DefaultsEntity => ({});

export const mockAddwares = (count: number): AddwareEntity[] => {
  let i = 0;
  while (i <= count) {}
};
