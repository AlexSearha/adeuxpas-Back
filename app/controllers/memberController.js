import memberDatamapper from "../models/memberDatamapper.js";

export default {
	async getResult(request, response){
		const results = await memberDatamapper.getResult(request.body);
		console.log(results);

		return response.json(results);
	},
	async getAllMembers(request, response){
		const members = await memberDatamapper.findAll();
		console.log(members);
		
		return response.json(members);
	},
    
	async getMemberByPk(request, response){
		const member = await memberDatamapper.findByPk(request.params.id);
		console.log(member);
		
		if(!member) {
			return response.status(404).json({ error: "Membre inconnu/e" });
		}
        
		return response.json(member);
	},
	async createMember(request, response){
		const newMember = await memberDatamapper.insert(request.body);
		console.log(newMember);
        
		if(!newMember) {
			return response.status(404).json({ error: "Membre déjà existant/e" });
		}

		return response.json(newMember);
	},
	async modifyMember(request, response){
		const modifyMember = await memberDatamapper.update(request.params.id, request.body);
		console.log(modifyMember);
        
		if(!modifyMember) {
			return response.status(404).json({ error: "Veuillez modifier la saisie" });
		}
		
        
		return response.json(modifyMember);
	},
	async deleteMember(request, response){
		const deleteMember = await memberDatamapper.delete(request.params.id);
		console.log(deleteMember);

		if(!deleteMember) {
			return response.status(404).json({ error: "Membre inconnu/e" });
		}
        
		return response.status(204).json(deleteMember);
	},

};