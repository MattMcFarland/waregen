// require modules
const fs = require("fs");
const Path = require("path");
const archiver = require("archiver");
const version = require("../package.json").version;

const paths = [
  ["waregen.exe", Path.resolve(__dirname, "../build/waregen.exe")],
  ["readme.html", Path.resolve(__dirname, "../build/readme.html")],
  ["example.xml", Path.resolve(__dirname, "../example.xml")],
  ["LICENSE.txt", Path.resolve(__dirname, "../LICENSE")]
];

const target = `build/waregen-${version}.zip`;

// create a file to stream archive data to.
const output = fs.createWriteStream(target);
const archive = archiver("zip", {
  zlib: { level: 9 } // Sets the compression level.
});

// listen for all archive data to be written
// 'close' event is fired only when a file descriptor is involved
output.on("close", function() {
  console.log(archive.pointer() + " total bytes");
  console.log(
    "archiver has been finalized and the output file descriptor has closed."
  );
});

// This event is fired when the data source is drained no matter what was the data source.
// It is not part of this library but rather from the NodeJS Stream API.
// @see: https://nodejs.org/api/stream.html#stream_event_end
output.on("end", function() {
  console.log("Data has been drained");
});

// good practice to catch warnings (ie stat failures and other non-blocking errors)
archive.on("warning", function(err) {
  if (err.code === "ENOENT") {
    // log warning
  } else {
    // throw error
    throw err;
  }
});

archive.pipe(output);

paths.forEach(([name, source]) =>
  archive.append(fs.createReadStream(source), { name })
);

archive.finalize();
