export default {
	auth: async (req, res, next) => {
		try {
			console.log("ca marche");
			next();
		} catch (error) {
			throw new Error(error);
		}
	},
};
