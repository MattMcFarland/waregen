# waregen

This command-line utility will generate all of the necessary `.xml` files needed to add new ares to X4: Foundations.

Instead of having to comb over a dozen xml files making sure all of your `ids` and `references` are properly configured, this tool will wire all of that up for you.

## Prerequisites

- You will need an **unpacked** folder - see [this forum post](https://forum.egosoft.com/viewtopic.php?t=402452) for more information
- Comfort with XML, and running CLI(command line interface) programs
- You backup your mod ! Especially if you use this tool with it!!! (but really, you should be doing that anyway)

## Installation

- Unzip the latest release(it does not matter where), you will see the following contents:
  - waregen.exe
  - README.md (this file)
  - LICENSE (MIT license, you may review if needed)
  - example.xml (an example that you can run to create an example mod with plastic and glass added to the game)

## CLI Usage:

Providing you are running CMD.exe or PowerShell, you can run `waregen.exe` - if you are in the same directroy as the `waregen.exe` file.

```
waregen [configXmlPath] [options]

Positionals:
  configXmlPath  path to config file           [string] [default: "example.xml"]

Options:
  --version    Show version number                                     [boolean]
  -f, --force  Force overwrites
  --help       Show help                                               [boolean]
```

Providing you set the config vars, the included `example.xml` file will create a new mod called `example`, and place _glass_ and _plastic_ wares into the game.

## Configuration

All of the wares you wish to add to the game are within an `xml` file that follow the same schema as the `example.xml` file.

Here is basically what you will see:

```xml

<addwares>
  <configuration>
    <!-- prefix is used to avoid conflict with other mods, use an acronym for your mod or your name -->
    <prefix value="example"/>
    <!-- gamepath is the full path to your X4 game's folder -->
    <gamepath value="%PROGRAMFILES(X86)%\Steam\steamapps\common\X4 Foundations"/>
    <!-- modpath is the relative path from gamepath to the mod that the generator will create files in -->
    <modpath value="extensions\example"/>
    <!-- unpackedpath is the relative pat from gamepath to where all of the unpacked files are, including assets -->
    <unpackedpath value="unpacked-150"/>
    <!-- defaults include all the same values you use across your wares and blueprints, this way you can be less verbose -->
    <defaults> <!-- (see the example.xml file for details) -->
      <ware ... />
      </ware>
      <blueprint  .../>
      </blueprint>
    </defaults>
  </configuration>
  <generation> <!-- generation tag contains the recipes for creating your wares -->
    <!-- addware properties are for the generator, the child nodes will mostly be copy/pasted from the generator, using the same spec and schema as the game, with slight alteration around "blueprint" which will be explained later -->
    <addware id="glass" cloneProductionModuleFrom="prod_gen_refinedmetals" baskets="[refined, pirate_container, all_container, all]">
      <ware ... />
      <blueprint .../>
    </addware>
    <addware id="plastic" cloneProductionModuleFrom="prod_gen_refinedmetals" baskets="[refined, pirate_container, all_container, all]">
      <ware .../>
      <blueprint .../>
    </addware>
  </generation>
</addwares>

```

### `<configuration>`

This contains the following five nodes:

#### `<prefix>`

Set `value` to be equivelent to the prefix you wish to use for your mod. This will then automatically add this prefix to every internal id.

If you were you use the following tag:

```xml
<prefix value = "foo"/>
```

Then any of your wares are prefixed, so if you had a ware with an id of "plastic", internally the game would recognize it as `foo_plastic` - the generator makes it easy to ensure it is referenced properly, while you can still consider it as `platsic` . the `id` is not used to show to the player, but internally referenced. This means if someone with another mod had a ware called `plastic`, it would not interfere with your mod, ooverwrite it, etc.

Simply put, prefix is used to prevent collisions and help ensure compatibility.

#### `<gamepath>`

Set `value` to equal the full path to where you have X4 Foundations installed.

```xml
<gamepath value="%PROGRAMFILES(X86)%\Steam\steamapps\common\X4 Foundations"/>
```

Environment variables will be reference by text inbetween `%` characters, regardless of your operating system.

#### `<modpath>`

Set `value` to equal the **relative** path of your mod's installation. If the path does not exist, the generator _will create it for you_

If you have it set to this:

```xml
<gamepath value="\Gamez\X4"/>
<modpath value="extensions\my_cool_mod"/>
```

Then the generator would sent assume its full path to be `C:\Gamez\X4\extensions\my_cool_mod` - Where `C` drive could be whatever your current working directory (aka CWD) drive is, as the path will resolve the same drive as where you are running `waregen.exe`

#### `<unpackedpath>`

Just like modpath, set value to be the **relative** path of your unpacked installation.

```xml
<gamepath value="\Gamez\X4"/>
<modpath value="unpacked"/>
```

would translate to `C:\Gamez\X4\unpacked` - Where the Drive letter would depend on which drive you ran `waregen.exe` ..

#### About the relative paths

You have some advanced techniques available. If you know how pathing works, you can use allt he usual references such as `../` or `..\` (POSIX paths will be translated to win32 paths automatically, so it doesnt really matter what type of slash you use here) - You can also set the Drive letter for `gamepath`, but not for `modpath` or `extensions` - support for that seems like an edgecase which may or may not be added in the future, depending on demand.

#### `<defaults>`

Here you can set all of the default values for `wares` and `blueprints` (a word about blueprints later).
Any wares or blueprints you have defined in the `<addwares>` tag will automatically _extend_ from this, or _inherit_ the defaults. That way, you can be less verbose with your wares if they are using the same things over and over again.

### `<generation>`

This is where all of the magic happens. Most of it anyway.

#### `<addware>`

The `addware` tag is used by the generator to:

- create wares
- the production modules that produce the wares
- the blueprints which detail "how to build or research" the production module
- the `baskets` the wares will be patched into, so the **AI** will trade them, and pirates will have them in their cargo bays

Each addware has the following attributes, which **must** be set:

- **id** - used as a base identifier, when creating all of the necessary wares, modules, modulegroups, baskets, macros, etc (do not add a prefix here unless you want double prefixes)
- **cloneProductionModuleFrom** - the name of a production module macro in the game that you want to copy. This will copy the icon, the 3d model, hull, and race information around the station module you want this to copy. Not including this is unsupported. You can edit the cloned module (which will have all the corrected identifiers and names) after it is generated. You can find all of the names as the filenames for every module seen in `unpacked/assets/structures/production/macros/` folder.
- **baskets** - a comma delimited array of all of the **AI** baskets this belongs to. You can find a full list of the baskets in `unpacked/libraries/baskets.xml` - this will be used to generate the `xml_patch` for inserting the _ware_ into the corresponding baskets.

##### `<ware>`

Use this to fill in the same exact values you would for the `<ware>` tag found in `wares.xml` - the generator will automatically populate the `id`, `macro`, and `component` values and ensure your ware is mapped to all of the other `xml` files.

##### `<blueprint>`

Use this to set the cost of your production module, such as what parts are required to build it, and how much it costs to purchase from a faction leader. Your blueprint will be saved as a `<ware>` in the `wares.xml` file - but is called a blueprint only in this to help differentiate blueprint wares from regular wares. That means, if you are familiar with blueprints, you can put any xml in here that the game understands and it'll be copy-pasted right in. The only benefit you get from using addwares, is all of the ids, names, etc will be set for you.

## About

This project was built with node.js and is open source and MIT licensed. You can contribute to this project at https://github.com/MattMcFarland/waregen
