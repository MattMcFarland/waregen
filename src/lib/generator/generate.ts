import processWares from "./helpers/async/processWares";
import { getConfig } from "./Config";
export default async function generate({ configXmlPath, ...options }: any) {
  const config = await getConfig(configXmlPath);
  return await processWares(config, options);
}
