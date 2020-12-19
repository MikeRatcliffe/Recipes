const markdownpdf = require("markdown-pdf");
const fs = require("fs");
const path = require("path");
const dir = fs.opendirSync(".");

let dirent = null;
let filenames = [];
let count = 0;

// Refresh PDF files

// Firest delete them
console.log("Deleting PDF files...");
fs.readdirSync("./PDF", (err, files) => {
  for (const file of files) {
    fs.unlink(path.join("./PDF", file), (err) => {
      if (err) throw err;
    });
  }
});

// Now recreate them
while ((dirent = dir.readSync()) !== null) {
  if (dirent.name.endsWith(".md") && dirent.name !== "README.md") {
    const name = dirent.name.substr(0, dirent.name.length - 3);

    filenames.push(name);

    console.log(`Processing ${dirent.name}...`);

    markdownpdf({
      cssPath: "style.css",
      paperBorder: "30px",
    })
      .from(`./${name}.md`)
      .to(`./PDF/${name}.pdf`, function () {
        count++;

        console.log(`Written ${name}.pdf`);

        if (count === filenames.length) {
          console.log("Done");
        }
      });
  }
}
dir.closeSync();

// Sort filenames so that our index is in alphabetic order
filenames.sort();

// Refresh README
console.log("Creating README.md...");
let stream = fs.createWriteStream("./README.md");
stream.once("open", function (fd) {
  stream.write("# Recipes\n\n");

  for (const name of filenames) {
    const escapedName = name.replace(/\s/g, "%20");
    stream.write(`- [${name}](./${escapedName}.md)\n`);
  }
  stream.end();
});

console.log("Waiting for file writes to complete...");
