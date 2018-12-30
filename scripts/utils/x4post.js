const DEFAULT_OPTIONS = {
  paragraphTag: "div",
  tableAttr: "",
  tableAlign: true
};

function extend(obj, src) {
  for (var key in src) {
    if (!obj.hasOwnProperty(key)) {
      obj[key] = src[key];
    }
  }
  return obj;
}

class Renderer {
  constructor() {
    this._options = {};
  }

  // Use getter and setter to hack options. Because marked directly set options
  // instead of passing in as constructor option.
  get options() {
    return this._options;
  }

  set options(value) {
    this._options = extend(value, DEFAULT_OPTIONS);
  }

  code(code) {
    return `[code]${code}\n[/code]`;
  }

  blockquote(quote) {
    return `\n  [size=110]💡[i][color=#CCCCCC]${quote}[/color][/i][/size]\n`;
  }

  html(html) {
    return html;
  }

  heading(text, level) {
    return `[size=${levelToSize(level)}]\n${text}[/size]\n`;
  }

  hr() {
    return "[hr]\n";
  }

  list(body, ordered) {
    let type = ordered ? "list=I" : "list";
    return `[${type}]\n${body}[/${type}]\n`;
  }

  listitem(text) {
    return `[*]${text}\n`;
  }

  paragraph(text) {
    return `${text}\n`;
  }

  table(header, body) {
    let space = this.options.tableAttr ? " " : "";

    return `[table${space}${
      this.options.tableAttr
    }]\n${header}${body}[/table]\n`;
  }

  tablerow(content) {
    return `[tr]\n${content}[/tr]\n`;
  }

  tablecell(content, flags) {
    let type = flags.header ? "th" : "td";
    let tag =
      flags.align && this.options.tableAlign
        ? `[${type} align=${flags.align}]`
        : `[${type}]`;
    return `${tag}${content}[/${type}]\n`;
  }

  // span level renderer
  strong(text) {
    return `[b]${text}[/b]`;
  }

  em(text) {
    return `[i]${text}[/i]`;
  }

  codespan(text) {
    return `[color=#BFBFBF]${text}[/color]`;
  }

  br() {
    return "\n";
  }

  del(text) {
    return `[s]${text}[/s]`;
  }

  link(href, title, text) {
    return `[url=${href}]${text}[/url]`;
  }

  image(href) {
    return `[img=${href}]`;
  }

  text(text) {
    return text.replace(/\<|\<\//g, "|");
  }
}

module.exports = Renderer;

const levelToSize = level => {
  switch (level) {
    case 1:
      return 170;
    case 2:
      return 150;
    case 3:
      return 140;
    case 4:
      return 130;
    case 5:
      return 120;
    default:
      return 115;
  }
};
