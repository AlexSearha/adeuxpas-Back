import loginDatamapper from "../models/loginDatamapper.js";
import bcrypt from "bcrypt";
import pool from "../helpers/pg.driver.js";
import { jwtTokens } from "../helpers/jwt-helpers.js";

export default {
	index: async (request, response) => {
		const search = await loginDatamapper.index(request.body);

		return response.json(search);
	},

	login: async (request, response) => {
		try {
			const { email, password } = request.body;
			const users = await pool.query(
				"SELECT * FROM member WHERE email = $1",
				[email]
			);
			if (users.rows.length === 0)
				return response.status(401).json({ error: "Email incorrect" });
			//PASSWORD CHECK
			const validPassword = await bcrypt.compare(
				password,
				users.rows[0].password
			);
			if (!validPassword)
				return response
					.status(401)
					.json({ error: "Incorrect password" });

			let tokens = jwtTokens(users.rows[0]);
			response.setHeader("Authorization", `Bearer ${tokens.accessToken}`);
			response.cookie("refresh_token", tokens.refreshToken, {
				httpOnly: true,
			});

			const bodyDatas = {
				refreshToken: tokens.refreshToken,
				userInformations: {
					id: users.rows[0].id,
					email: users.rows[0].email,
					firstname: users.rows[0].firstname,
					lastname: users.rows[0].lastname,
					phone_number: users.rows[0].phone_number,
					address: users.rows[0].address,
				},
			};
			response.status(200).json(bodyDatas);
		} catch (error) {
			response.status(401).json({ error: error.message });
		}
	},

	logout: async (_, response) => {
		try {
			response.clearCookie("refresh_token");
			response.status(200).json({ message: "logout successfull" });
		} catch (error) {
			response
				.status(500)
				.json({ error: "an error occurred when data where fetched" });
		}
	},
};
