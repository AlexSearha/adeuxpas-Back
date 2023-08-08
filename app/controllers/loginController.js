import loginDatamapper from "../models/loginDatamapper.js";
import bcrypt from "bcrypt";
import pool from "../helpers/pg.driver.js";
import {jwtTokens} from "../helpers/jwt-helpers.js";

export default {
	
	index: async (request, response) => {
		const search = await loginDatamapper.index(request.body);
        
		return response.json(search);
	},
	
	login: async (request, response) => {
		try {
			const {email, password} = request.body;
			console.log(email,password);
			const users = await pool.query("SELECT * FROM member WHERE email = $1",[email]);
			if(users.rows.length === 0) return response.status(401).json({error : "Email incorrect"});
			//PASSWORD CHECK
			const validPassword = await bcrypt.compare(password, users.rows[0].password);
			if(!validPassword) return response.status(401).json({error : "Incorrect password"});
			//return response.status(200).json("Success");
			//JWT
			let tokens = jwtTokens(users.rows[0]);
			response.cookie("refresh_token", tokens.refreshToken, { httpOnly: true });
			response.json(tokens);

		} catch(error) {
			response.status(401).json({error:error.message});
		}
	},
	
	logout: async (request, response) => {
		const index = await loginDatamapper.index(request.body);
		
		return response.json(index);
	},
};