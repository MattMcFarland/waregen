const makeReadme = require("./utils/readme");
const x4post = require("./utils/x4post");

makeReadme(
  {
    gfm: true,
    renderer: new x4post(),
    sanitize: false
  },
  "x4post",
  txt =>
    txt
      .replace(/&lt;/gm, "<")
      .replace(/&gt;/gm, ">")
      .replace(/&#39;/gm, "'")
);
