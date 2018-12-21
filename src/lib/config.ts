import { XMLUtils } from "./XMLUtils";
import { log } from "./System";
import lodash from "lodash";
import { SelectedValue } from "xpath";
import {
  X4WareGenXML,
  PrefixEntityOrGamepathEntityOrModpathEntityOrUnpackedPathEntity
} from "../../XMLTypes/X4WareGenXML";
export type WareGenConfigItem =
  | "prefix"
  | "gamepath"
  | "modpath"
  | "unpackedPath"
  | "defaults";

export const setupConfig = async (
  configPath: string
): Promise<
  (
    selector: WareGenConfigItem
  ) => PrefixEntityOrGamepathEntityOrModpathEntityOrUnpackedPathEntity
> => {
  const configData = await XMLUtils.readAbsXMLFile<string>(configPath);
  return (selector: WareGenConfigItem) => {
    const obj: any = configData.XMLObject;
    const result = lodash.get(
      obj,
      `addwares.configuration[0].${selector}[0].$.value`
    );

    return result.replace(
      /%(.*)%/gm,
      (match: string, p1: string, offset: number, str: string): string =>
        str.replace(match, process.env[p1])
    );
  };
};
