const rimraf = require("rimraf");
const mkdirp = require("mkdirp");

rimraf.sync("./dist");
rimraf.sync("./build");

mkdirp.sync("build");
mkdirp.sync("dist");
