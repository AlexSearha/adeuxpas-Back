import bunyan from "bunyan";
import * as url from "url";

const dirname = url.fileURLToPath(new URL(".", import.meta.url));

const streams = [];

if (process.env.NODE_ENV !== "production") {
	// Pour tous les environnement autres que production : development et test
	streams.push({
		// A partir du niveau info : info, warn, error, fatal
		level: "info",
		stream: process.stdout, // log INFO and above to stdout
	});
} else {
	streams.push({
		// A partir du niveau error : error, fatal
		level: "error",
		path: `${dirname}../../logs/error.log`, // log ERROR and above to a file
		type: "rotating-file",
		period: "10000ms", // '1d', // On utilise un fichier par jour
		count: 3, // On conserve 3 fichier d'historique, donc 3 jours
	});
	streams.push({
		// A partir du niveau error : error, fatal
		level: "info",
		path: `${dirname}../../logs/combined.log`, // log ERROR and above to a file
		type: "rotating-file",
		period: "10000ms", // '1d',
		count: 7,
	});
}

const logger = bunyan.createLogger({
	name: "a2P",
	streams,
});

// logger.info est une méthode dons un objet donc une valeur de type non-scalaire, donc une
// référence. Je peux stocker cette référence dans une nouvelle propriété pour créer un alias de
// méthode.
logger.log = logger.info;

export default logger;
