const makeReadme = require("./utils/readme");
const marked = require("marked");
makeReadme(
  {
    renderer: new marked().Renderer,
    gfm: true,
    paragraphTag: "div",
    tableAttr: "width=98% broder=1",
    codespan: "b"
  },
  "html"
);
