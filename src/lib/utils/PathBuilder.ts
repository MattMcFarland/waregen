import Path from "path";
import { IdRoster } from "./IdRoster";
import { GeneratorConfig } from "@@/generator";
import { log } from "@@/utils";

export class PathBuilder {
  private gamepath: string;
  private modPath: string;
  private unpackedPath: string;
  private build: string;
  private ids: IdRoster;
  private freeze: boolean = false;
  public append(...parts: string[]) {
    if (this.freeze) {
      throw new Error(
        "PathBuilder instance cannot be modified after transform"
      );
    }
    this.build = Path.join(this.build, ...parts);
    return this;
  }
  dirFullGamepath() {
    return this.append(this.gamepath);
  }
  dirModPath() {
    return this.append(this.modPath);
  }
  dirUnpackedPath() {
    return this.append(this.unpackedPath);
  }
  fileLibrary(baseName: string, ext: string = "xml") {
    return this.append("libraries", `${baseName}.${ext}`);
  }
  fileIndex(baseName: string, ext: string = "xml") {
    return this.append("index", `${baseName}.${ext}`);
  }
  fileProductionMacroXML() {
    return this.append(
      "assets",
      "structures",
      "production",
      "macros",
      `${this.ids.productionMacro}.xml`
    );
  }
  fileWareMacroXML() {
    return this.append(
      "assets",
      "wares",
      "macros",
      `${this.ids.wareMacro}.xml`
    );
  }
  fileIconGZ() {
    return this.append(
      "assets",
      "fx",
      "gui",
      "textures",
      `${this.ids.productionMacro}.gz`
    );
  }
  fileIconDDS() {
    return this.append(
      "assets",
      "fx",
      "gui",
      "textures",
      `${this.ids.productionMacro}.dds`
    );
  }

  /**
   * Use only for testing
   * @returns {string} normalized path using
   * host system slashes (POSIX: /foo/bar, WINDOWS \foo\bar)
   */
  toHostString(): string {
    this.freeze = true;
    return Path.normalize(this.build);
  }

  /**
   * Use when you need to access the path for reading or writing.
   * @returns {string} resolved (absolute) pathusing
   * host system slashes (POSIX: /foo/bar, WINDOWS \foo\bar)
   */
  resolve(): string {
    this.freeze = true;
    return Path.resolve(Path.normalize(this.build));
  }

  /**
   * Use for value assignment within an XML document
   * @returns {string} WINDOWS path foo\bar\baz
   */
  toString(): string {
    this.freeze = true;
    return Path.win32.normalize(this.build);
  }
  /**
   * Use to seperate path into array, so you can join it later
   * @returns {string[]}
   */
  toArray(): string[] {
    this.freeze = true;
    return Path.normalize(this.build).split(Path.sep);
  }
  constructor(config: GeneratorConfig, baseId: string) {
    this.ids = new IdRoster(baseId, config.modPrefix);
    this.gamepath = config.gamePath;
    this.modPath = config.modPath;
    this.unpackedPath = config.unpackedPath;
    this.build = "";
  }
}
export default function pathBuilderFactory(
  config: GeneratorConfig,
  baseId: string
): PathBuilder;

export default function pathBuilderFactory(
  config: GeneratorConfig
): (baseId: string) => PathBuilder;

export default function pathBuilderFactory(
  config: GeneratorConfig,
  baseId?: string
) {
  if (!baseId) {
    return (baseId: string) => {
      return new PathBuilder(config, baseId);
    };
  } else {
    return new PathBuilder(config, baseId);
  }
}