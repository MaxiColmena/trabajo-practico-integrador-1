import express from "express";
import dotenv from "dotenv";
import { startDB } from "./src/config/database.js";
import { routerUser } from "./src/routes/user.routes.js";
import { routerArticle } from "./src/routes/article.routes.js";
import { routerArticleTag } from "./src/routes/articleTag.routes.js";
import { routerAuth } from "./src/routes/auth.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use("/api", routerUser);
app.use("/api", routerArticle);
app.use("/api", routerAuth);
app.use("/api", routerUser);
app.use("/api", routerArticle);
app.use("/api", routerArticleTag);


app.listen(PORT, async () => {
    await startDB();
    console.log("Servidor corriendo en el puerto: ", PORT)
});
