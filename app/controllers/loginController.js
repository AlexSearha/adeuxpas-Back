import loginDatamapper from "../models/loginDatamapper.js";
//import { ApiError } from "../helpers/errorHandler.js";

export default {
	
	async login(request, response){
		const formulaire = await loginDatamapper.login(request.body);
		console.log(formulaire);
		
		return response.json(formulaire);
	},
	
	/*async index(request, response){
		const search = await loginDataMapper.index(request.body);
		console.log(search);
        
		return response.json(search);
	},
	
	async logout(request, response){
		const index = await loginDataMapper.logout(request.body);
		console.log(index);
		
		return response.json(index);
	},
	*/
};