export class IdRoster {
  private rootId: string;
  private prefix: string;

  /**
   * (**ID**)Occurances:
   *
   *  - `<ware.id>` - *wares.xml*
   *  - `<ware.ware>` - *wares.xml*, *baskets.xml*
   *  - `<category.ware>` - *modules.xml*
   *  - `<production.ware>` - *modules.xml*
   *  - `<production.wares>` - *(this.productionMacro).xml*
   *  - `<queue.ware>` - *(this.productionMacro).xml*
   *
   */
  get ware() {
    return `${this.prefix}_${this.rootId}`;
  }
  /**
   * (**ID**)Occurances:
   *
   *  - **Filename** > `AssetWareMacro`
   *  - `<macro.name>` - *(this).xml*
   *  - `<entry>` - *macros.xml*
   */
  get wareMacro() {
    return `ware_${this.prefix}_${this.rootId}_macro`;
  }

  /**
   * (**ID**)Occurances:
   *
   *  - `<group.name>` - *modulegroups.xml*
   *  - `<module.id>` - *modules.xml*
   *  - `<module.group>` - *modules.xml*
   *
   */
  get production() {
    return `${this.prefix}_prod_gen_${this.rootId}`;
  }
  /**
   * (**ID**)Occurances:
   *  - **(this).xml** > `AssetWareProdMacro`
   *  - **(this).dds** > `Icon`
   *  - `<macro.name>` - *(this).xml*
   *  - `<entry.name>` - *macros.xml*
   *  - `<entry.value>` - (path-tail)*macros.xml*
   *  - `<select.macro>` - *modulegroups.xml*
   *  - `<component.ref>` - *wares.xml*
   *  - `<icon.texure>` - (this.dds)*icons.xml*
   */
  get productionMacro() {
    return `${this.prefix}_prod_gen_${this.rootId}_macro`;
  }

  /**
   * (**ID**)Occurances:
   *  - `<icon.name>` - *icons.xml*
   */
  get iconName() {
    return `module_${this.prefix}_prod_gen_${this.rootId}_macro`;
  }
  /**
   * (**ID**)Occurances:
   * - `<ware.id>` - *wares.xml*
   * - `<add_blueprints.wares>`- *MissionDirector*
   */
  get productionBlueprintId() {
    return `${this.prefix}_prod_gen_${this.rootId}_macro_01`;
  }
  constructor(rootId: string, prefix: string) {
    this.rootId = rootId;
    this.prefix = prefix;
  }
}
