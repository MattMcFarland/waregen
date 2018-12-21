import { Signale } from "signale";

export default new Signale({
  disabled: false,
  interactive: true,
  stream: process.stdout,
  scope: "waregen"
});
