import express from "express";
import { fileURLToPath } from "url";
import path from "path";

const { APP_NAME } = process.env;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const staticPath = path.join(__dirname, "public");

console.log({
	APP_NAME,
	__dirname,
	__filename,
	staticPath,
	metaurl: import.meta,
});

const app = express();
app.use(express.json());
app.set("views", staticPath);
app.set("view engine", "ejs");
app.use(express.static(staticPath));

app.get("/", (req, res) => {
	res.render("index", { appName: APP_NAME || "DEFAULT" });
});
app.get("/health", (req, res) => {
	res.json({ status: "ok", app: APP_NAME });
});

const PORT = process.env.PORT || 80;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
