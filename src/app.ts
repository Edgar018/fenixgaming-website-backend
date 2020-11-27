import express from "express";
import morgan from "morgan";
import cors from "cors";
import fileUpload from "express-fileupload";
import path from "path";
import passport from "passport";
import passportMiddleware from "./middlewares/passport";
import createRoles from "./libs/initialSetup/createRoles";
import createAdmin from "./libs/initialSetup/createAdmin";

import authRoutes from "./routes/userRoutes/auth.routes";
import specialRoutes from "./routes/userRoutes/specialUserRoutes/special.routes";
import specialRoutesArticles from "./routes/articleRoutes/specialArticlesRoutes/articles.special.routes";
import replaysRouter from "./routes/replaysRoutes/replays.route";

const app = express();

app.set("port", process.env.PORT || 3000);

createRoles();
createAdmin();
const pathOfTheRootProject = __dirname;
export { pathOfTheRootProject };

app.use(morgan("dev"));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(fileUpload());
app.use(passport.initialize());
passport.use(passportMiddleware);

app.get("/", (req, res) => {
	res.send(`THE API is at http://localhost:${app.get("port")}`);
});

app.use(authRoutes);
app.use(specialRoutes);
app.use(replaysRouter);
app.use(specialRoutesArticles);

app.use(express.static(path.resolve("public")));

export default app;
