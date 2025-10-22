const http = require("http");
const fs = require("fs");
const { error } = require("console");

const pathUrl = {
  "/": "./routes/index.html",
  "/about": "./routes/about.html",
  "/contact-me": "./routes/contact-me.html",
  "/404": "./routes/404.html",
};
const server = http.createServer((req, res) => {
  const filePath = pathUrl[req.url] || "./routes/404.html";

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500, { "content-type": "text/html" });
      return res.end("Internal Server Error");
    }

    const statusCode = filePath.includes("404") ? 404 : 200;
    res.writeHead(statusCode, { "content-type": "text/html" });
    res.end(data);
  });
});

server.listen(8080);
