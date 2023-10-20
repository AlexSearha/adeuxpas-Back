import logger from "./logger.helper.js";

export default (req, _, next) => {
	logger.log(`${req.method} ${req.url} ${req.ip}`);
	next();
};
