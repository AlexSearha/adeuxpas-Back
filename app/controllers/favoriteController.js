import favoriteDatamapper from "../models/favoriteDatamapper.js";

export default {
	async getAllFavorites(_, response) {
		const favorites = await favoriteDatamapper.findAll();
		console.log(favorites);

		return response.status(200).json(favorites);
	},
	async getAllFavoritesByMember(request, response) {
		const favorites = await favoriteDatamapper.findAllByPk(
			request.params.id
		);
		console.log(favorites);

		return response.status(200).json(favorites);
	},

	async getFavoriteByAddress(request, response) {
		const favoriteByAddress = await favoriteDatamapper.findByAddress(
			request.body.address_destination
		);
		console.log("favoriteByAddress: ", favoriteByAddress);

		return response.status(200).json(favoriteByAddress);
	},

	async getOneFavorite(request, response) {
		const oneFavorite = await favoriteDatamapper.findByPk(request.params);
		console.log("oneFavorite: ", oneFavorite);

		return response.status(200).json(oneFavorite);
	},

	async postOneFavorite(request, response) {
		const insertFavorite = await favoriteDatamapper.insert(request.body);
		console.log("insertFavorite: ", insertFavorite);

		return response.status(200).json(insertFavorite);
	},

	async deleteOneFavorite(request, response) {
		const deleteFavorite = await favoriteDatamapper.delete(request.params);
		console.log("deleteFavorite: ", deleteFavorite);

		return response.status(200).json(deleteFavorite);
	},
};
