import registerDatamapper from "../models/registerDatamapper.js";
//import { ApiError } from "../helpers/errorHandler.js";

export default {
	
	async form(request, response){
		const index = await registerDatamapper.form(request.body);
		console.log(index);

		return response.json(index);
	},
	
	async register(request, response){
		const register = await registerDatamapper.register(request.body);
		console.log(register);

		return response.json(register);
	},
};