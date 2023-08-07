import logger from "./logger.helper.js";

// eslint-disable-next-line no-unused-vars
export default (err, req, res, next) => {
	logger.log(err.name);
	
	if (err.name === "ValidationError") {
		// C'est une erreur renvoyée par Joi

		// Dans l'erreur Joi le message d'erreur est stocké dans une
		// propriété details avec un tableau ayant un seul objet
		return res.status(400).json({ error: err.details[0].message });
	}

	if (err.name === "NotFoundError") {
		return res.status(404).json({ error: err.message });
	}

	// Si ce n'est pas une erreur Joi, on considère cela, pour le moment comme une erreur serveur
	logger.error(err.message);
	return res.status(500).json({ error: "Internal Server Error" });
};