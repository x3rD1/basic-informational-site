const http = require("http");
const fs = require("fs");
const { error } = require("console");

const server = http.createServer((req, res) => {
  let path = "./routes/";
  switch (req.url) {
    case "/":
      path += "index.html";
      break;
    case "/about":
      path += "about.html";
      break;
    case "/contact-me":
      path += "contact-me.html";
      break;
    default:
      path += "404.html";
      break;
  }
  console.log(req.url);
  fs.readFile(path, (err, data) => {
    if (err) {
      res.writeHead(404, { "content-type": "text/html" });
      res.end();
      console.log(err);
    }

    res.writeHead(200, { "content-type": "text/html" });
    res.end(data);
  });
});

server.listen(8080);
