const shell = require("shelljs");

const commands = "build:typescript build:exe build:zip";

commands.split(" ").forEach(cmd => shell.exec(`yarn ${cmd}`));
