import Jetpack from "fs-jetpack";
import { log } from "../../utils";

export default async function safeWrite(
  targetPath: string,
  data: string,
  options: any
) {
  if (Jetpack.exists(targetPath)) {
    if (!options.force) {
      log.skip(targetPath, "exists, use --force to overwrite");
      return targetPath;
    } else {
      await Jetpack.writeAsync(targetPath, data);
      log.warn(`replaced ${targetPath}`);
    }
  } else {
    await Jetpack.writeAsync(targetPath, data);
    log.write(targetPath);
  }
}
