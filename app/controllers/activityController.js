import activityDatamapper from "../models/activityDatamapper.js";
//import { ApiError } from "../helpers/errorHandler.js";

export default {
	
	async getAllActivities(request, response) {
		const activities = await activityDatamapper.findAll();
		console.log(activities);
        
		return response.json(activities);
	},

	async activity(request, response) {
		const activity = await activityDatamapper.findByPk(request.params.id);
		console.log(activity);
		
		if(!activity) {
			//throw new apiService("Catégorie inconnue", { statusCode: 404 });
			return response.status(404).json({ error: "Activité inconnue" });
		}

		return response.json(activity);

		
	},

	async createActivity(request, response) {
		const newActivity = await activityDatamapper.insert(request.body);
		console.log(newActivity);

		if(!newActivity) {
			//throw new ApiError("Activité déjà existante", { statusCode: 400 });
			return response.status(404).json({ error: "Activité déjà existante" });
		}

		return response.json(newActivity);
	},

	async modifyActivity(request, response) {
		const modifyActivity = await activityDatamapper.update(request.params.id, request.body);
		console.log(modifyActivity);

		if(!modifyActivity) {
			//throw new ApiError("Activité inconnue", { statusCode: 404 });
			return response.status(404).json({ error: "Activité inconnue" });
		}

		return response.json(modifyActivity);
	},

	async deleteActivity(request, response) {
		const deleteActivity = await activityDatamapper.delete(request.params.id);
		console.log(deleteActivity);

		if(!deleteActivity) {
			//throw new ApiError("Activité inconnue", { statusCode: 404 });
			return response.status(404).json({ error: "Activité inconnue" });
		}

		return response.status(204).json(deleteActivity);
	},

};