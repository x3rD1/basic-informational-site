import "dotenv/config";
import path from "path";
import url from "url";
import express from "express";

const app = express();

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "routes", "index.html"));
});

app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "routes", "about.html"));
});

app.get("/contact-me", (req, res) => {
  res.sendFile(path.join(__dirname, "routes", "contact-me.html"));
});

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "routes", "404.html"));
});

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).send("Internal Server Error");
});

const PORT = process.env.PORT;
app.listen(PORT || 3000, (error) => {
  if (error) {
    throw error;
  }
});
