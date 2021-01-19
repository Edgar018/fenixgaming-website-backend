import express, { Express } from "express";
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

const pathOfTheRootProject = __dirname;
export { pathOfTheRootProject };

class App {
	public app: Express = express();

	constructor(){
		this.config();
		this.initRoles();
		this.initRoutes();
	}

	config(): void {
		this.app.set("port", process.env.PORT || 3000);
		this.app.use(morgan("dev"));
		this.app.use(cors());
		this.app.use(express.urlencoded({ extended: false }));
		this.app.use(express.json());
		this.app.use(fileUpload());
		this.app.use(passport.initialize());
		passport.use(passportMiddleware);
		this.app.get("/", (req, res) => {
			res.send(`THE API is at http://localhost:${this.app.get("port")}`);
		});
		this.app.use(express.static(path.resolve("public")));
	}

	initRoles(): void {
		createRoles();
		createAdmin();
	}

	initRoutes(): void {
		this.app.use(authRoutes);
		this.app.use(specialRoutes);
		this.app.use(replaysRouter);
		this.app.use(specialRoutesArticles);
	}
}

export default new App().app;
