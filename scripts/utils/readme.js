const marked = require("marked");
const fs = require("fs");
const path = require("path");

const inBuildDir = p => path.resolve(process.cwd(), "build", p);
const inProjectDir = p => path.resolve(process.cwd(), p);

const readmeContent = fs.readFileSync(
  path.resolve(inProjectDir("README.md")),
  "utf8"
);

module.exports = (options, ext, stringFn) => {
  marked.setOptions(options);
  const txt = marked.parse(readmeContent);

  fs.writeFileSync(inBuildDir(`readme.${ext}`), stringFn ? stringFn(txt) : txt);
};
