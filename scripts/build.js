const shell = require("shelljs");

const commands =
  "build:clean build:typescript build:exe build:bbcode build:x4post build:html build:zip ";

commands.split(" ").forEach(cmd => shell.exec(`yarn ${cmd}`));
