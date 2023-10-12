import express from "express";
import router from "./routers/index.router.js";
//import doc from "./doc/swagger.doc.js";
import errorMiddleware from "./helpers/error.middleware.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import multer from "multer";
const whitelist = process.env.WHITELIST_DOMAINS;

const app = express();

const corsOptions = {
	origin: function (origin, callback) {
		if (whitelist.indexOf(origin) !== -1 || !origin) {
			callback(null, true);
		} else {
			callback(new Error("Not allowed by CORS"));
		}
	},
	credentials: true,
};
app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(errorMiddleware);
app.use(cookieParser());

const mutipartParser = multer();

app.use(mutipartParser.none());

app.use(router);

router.use((req, res) => {
	return res.status(404).json({ error: "404 - Page not found" });
});

//doc(app);

export default app;
