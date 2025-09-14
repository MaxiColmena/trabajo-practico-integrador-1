import express from "express";
import dotenv from "dotenv";
import { startDB } from "./src/config/database.js";
import {routerTag} from "./src/routes/tag.routes.js"
import { routerUser } from "./src/routes/user.routes.js";
import { routerArticle } from "./src/routes/article.routes.js";
import { routerArticleTag } from "./src/routes/articleTag.routes.js";
import { routerAuth } from "./src/routes/auth.routes.js";
import cors from "cors"
import morgan from "morgan";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(cookieParser());
app.use("/api", routerAuth);
app.use("/api", routerUser);
app.use("/api", routerTag);
app.use("/api", routerArticle);
app.use("/api", routerArticleTag);


app.listen(PORT, async () => {
    await startDB();
    console.log("Servidor corriendo en el puerto: ", PORT)
});
