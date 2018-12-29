import Path from "path";
import { IdRoster } from "./IdRoster";
import { GeneratorConfig } from "../generator";
import { log } from "../utils";

const maybeExt = (ext?: string) => (ext ? `.${ext}` : "");

export class PathBuilder {
  private gamepath: string;
  private modPath: string;
  private unpackedPath: string;
  private build: string;
  private modPrefix: string;
  private ids: IdRoster | undefined;
  private freeze: boolean = false;
  private _baseId: string | undefined;

  get baseId() {
    return this._baseId;
  }
  set baseId(v: string | undefined) {
    this._baseId = v;
    if (!this._baseId) {
      this._baseId = undefined;
      this.ids = undefined;
    }
    if (undefined !== this._baseId) {
      this.ids = new IdRoster(this._baseId, this.modPrefix);
    }
  }
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
  dirProductionMacros() {
    return this.append("assets", "structures", "production", "macros");
  }
  dirIcons() {
    return this.append("assets", "fx", "gui", "textures", "stationmodules");
  }
  dirWareMacro() {
    return this.append("assets", "wares", "macros");
  }
  fileLibrary(baseName: string, ext?: string) {
    return this.append("libraries", `${baseName}${maybeExt(ext)}`);
  }
  fileIndex(baseName: string, ext?: string) {
    return this.append("index", `${baseName}${maybeExt(ext)}`);
  }
  fileProductionMacroXML(ext?: string) {
    if (!this.ids) {
      throw new Error(
        "cannot call fileProductionMacroXML without baseId being set"
      );
    }
    return this.append(
      "assets",
      "structures",
      "production",
      "macros",
      `${this.ids.productionMacro}${maybeExt(ext)}`
    );
  }
  fileWareMacroXML(ext?: string) {
    if (!this.ids) {
      throw new Error("cannot call fileWareMacroXML without baseId being set");
    }
    return this.append(
      "assets",
      "wares",
      "macros",
      `${this.ids.wareMacro}${maybeExt(ext)}`
    );
  }
  fileIconGZ(ext: string = "gz") {
    if (!this.ids) {
      throw new Error("cannot call fileIconGZ without baseId being set");
    }
    return this.append(
      "assets",
      "fx",
      "gui",
      "textures",
      "stationmodules",
      `${this.ids.productionMacro}${maybeExt(ext)}`
    );
  }
  fileIconDDS(ext: string = "dds") {
    if (!this.ids) {
      throw new Error("cannot call fileIconDDS without baseId being set");
    }
    return this.append(
      "assets",
      "fx",
      "gui",
      "textures",
      "stationmodules",
      `${this.ids.productionMacro}${maybeExt(ext)}`
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
  constructor(config: GeneratorConfig, baseId?: string) {
    this._baseId = baseId || undefined;
    this.modPrefix = config.modPrefix;
    this.ids = (baseId && new IdRoster(baseId, config.modPrefix)) || undefined;
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
