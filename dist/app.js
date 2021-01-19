"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pathOfTheRootProject = void 0;
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const path_1 = __importDefault(require("path"));
const passport_1 = __importDefault(require("passport"));
const passport_2 = __importDefault(require("./middlewares/passport"));
const createRoles_1 = __importDefault(require("./libs/initialSetup/createRoles"));
const createAdmin_1 = __importDefault(require("./libs/initialSetup/createAdmin"));
const auth_routes_1 = __importDefault(require("./routes/userRoutes/auth.routes"));
const special_routes_1 = __importDefault(require("./routes/userRoutes/specialUserRoutes/special.routes"));
const articles_special_routes_1 = __importDefault(require("./routes/articleRoutes/specialArticlesRoutes/articles.special.routes"));
const replays_route_1 = __importDefault(require("./routes/replaysRoutes/replays.route"));
const pathOfTheRootProject = __dirname;
exports.pathOfTheRootProject = pathOfTheRootProject;
class App {
    constructor() {
        this.app = express_1.default();
        this.config();
        this.initRoles();
        this.initRoutes();
    }
    config() {
        this.app.set("port", process.env.PORT || 3000);
        this.app.use(morgan_1.default("dev"));
        this.app.use(cors_1.default());
        this.app.use(express_1.default.urlencoded({ extended: false }));
        this.app.use(express_1.default.json());
        this.app.use(express_fileupload_1.default());
        this.app.use(passport_1.default.initialize());
        passport_1.default.use(passport_2.default);
        this.app.get("/", (req, res) => {
            res.send(`THE API is at http://localhost:${this.app.get("port")}`);
        });
        this.app.use(express_1.default.static(path_1.default.resolve("public")));
    }
    initRoles() {
        createRoles_1.default();
        createAdmin_1.default();
    }
    initRoutes() {
        this.app.use(auth_routes_1.default);
        this.app.use(special_routes_1.default);
        this.app.use(replays_route_1.default);
        this.app.use(articles_special_routes_1.default);
    }
}
exports.default = new App().app;
