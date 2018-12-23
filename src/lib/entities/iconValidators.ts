import {
  Icons,
  Attributes as IconAttributes
} from "@@/XMLTypes/X4LibraryIcons";

export type IconAttribute =
  | "name"
  | "texture"
  | "height"
  | "width"
  | "active"
  | "inactive"
  | "selected";

export function isIcons(arg: any): arg is Icons {
  return (<Icons>arg).icon !== undefined;
}

export function isIconEntry(arg: any): arg is IconAttributes {
  return (
    (<IconAttributes>arg).name !== undefined ||
    (<IconAttributes>arg).texture !== undefined ||
    (<IconAttributes>arg).height !== undefined ||
    (<IconAttributes>arg).width !== undefined ||
    (<IconAttributes>arg).active !== undefined ||
    (<IconAttributes>arg).inactive !== undefined ||
    (<IconAttributes>arg).selected !== undefined
  );
}

export function isIconAttribute(str: string): str is IconAttribute {
  return (
    <IconAttribute>str === "name" ||
    <IconAttribute>str === "texture" ||
    <IconAttribute>str === "height" ||
    <IconAttribute>str === "width" ||
    <IconAttribute>str === "active" ||
    <IconAttribute>str === "inactive" ||
    <IconAttribute>str === "selected"
  );
}
