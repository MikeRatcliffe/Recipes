const markdownpdf = require("markdown-pdf");
const fs = require("fs");
const dir = fs.opendirSync(".");

let dirent = null;
let filenames = [];

// Refresh PDF files
while ((dirent = dir.readSync()) !== null) {
  if (dirent.name.endsWith(".md") && dirent.name !== "README.md") {
    const name = dirent.name.substr(0, dirent.name.length - 3);

    console.log(`Processing ${dirent.name}`);
    markdownpdf({
      cssPath: "style.css",
      paperBorder: "30px",
    })
      .from(`./${name}.md`)
      .to(`./PDF/${name}.pdf`, function () {
        console.log(`Processed ${name}.md`);
      });

    filenames.push(name);
  }
}
dir.closeSync();

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
console.log("Done");
