import "dotenv/config";
import http from "http";
import fs from "fs/promises";
import path from "path";
import url from "url";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pathUrl = {
  "/": path.join(__dirname, "routes", "index.html"),
  "/about": path.join(__dirname, "routes", "about.html"),
  "/contact-me": path.join(__dirname, "routes", "contact-me.html"),
  "/404": path.join(__dirname, "routes", "404.html"),
};

const server = http.createServer(async (req, res) => {
  const filePath = pathUrl[req.url] || pathUrl["/404"];
  const statusCode = filePath.includes("404") ? 404 : 200;

  try {
    const data = await fs.readFile(filePath);
    res.writeHead(statusCode, { "content-type": "text/html" });
    res.end(data);
  } catch (err) {
    res.writeHead(500, { "content-type": "text/html" });
    res.end("Internal Server Error");
  }
});

const PORT = process.env.PORT;
server.listen(PORT);
