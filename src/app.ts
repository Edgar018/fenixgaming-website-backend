import express from "express";
import morgan from "morgan";
import cors from "cors";
import passport from "passport";
import passportMiddleware from "./middlewares/passport";
import createRoles from "./libs/initialSetup/createRoles";
import createAdmin from "./libs/initialSetup/createAdmin";

import authRoutes from "./routes/userRoutes/auth.routes";
import specialRoutes from "./routes/specialUserRoutes/special.routes";

const app = express();

app.set("port", process.env.PORT || 3000);

createRoles();
createAdmin();

app.use(morgan("dev"));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());
passport.use(passportMiddleware);

app.get("/", (req, res) => {
	res.send(`THE API is at http://localhost:${app.get("port")}`);
});

app.use(authRoutes);
app.use(specialRoutes);

export default app;
