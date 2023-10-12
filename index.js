import http from "node:http";
import "./app/helpers/env.load.helper.js";
import logger from "./app/helpers/logger.helper.js";
import app from "./app/index.app.js";

const port = process.env.PORT ?? 3000;

const server = http.createServer(app);

server.listen(port, () => {
	logger.log(`Server started on http://localhost:${port}`);
});

export default port;
