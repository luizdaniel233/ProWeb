const http = require("http");
const fs = require("fs");
const port = 3001;
let arg = process.argv[2];
arg = arg.replace("./", "");

let list_files = [];

fs.readdir(__dirname + `/${arg}`, { withFileTypes: true }, (err, files) => {
  if (err) console.log(err);
  else {
    files.forEach((file) => {
      list_files.push(file.name);
    });
    const server = http.createServer((req, res) => {
      list_files.forEach((element) => {
        res.write(`${element}\n`);
      });
      res.end();
    });

    server.listen(port, () => console.log(`Port ${port} available.`));
  }
});
