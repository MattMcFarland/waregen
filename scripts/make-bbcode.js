const md2bbc = require("md2bbc");
const makeReadme = require("./utils/readme");

makeReadme(
  {
    gfm: true,
    renderer: new md2bbc()
  },
  "bbcode"
);
