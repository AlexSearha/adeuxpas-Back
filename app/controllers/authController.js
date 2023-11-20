import loginDatamapper from "../models/loginDatamapper.js";
import bcrypt from "bcrypt";
import pool from "../helpers/pg.driver.js";
import {
	generateJwtTokens,
	sendEmailResetPasswordJwt,
	testJwtValidity,
} from "../helpers/jwt-helpers.js";
import registerDatamapper from "../models/registerDatamapper.js";
import memberDatamapper from "../models/memberDatamapper.js";
import { emailReinitPassword } from "../helpers/nodemailer.js";

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

			let tokens = generateJwtTokens(users.rows[0]);
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

	form: async (request, response) => {
		const index = await registerDatamapper.form(request.body);
		console.log(index);

		return response.json(index);
	},

	register: async (request, response) => {
		const register = await registerDatamapper.register(request.body);
		console.log(register);

		return response.json(register);
	},

	tokenValidity: async (request, response) => {
		const refreshToken = request.cookies.refresh_token;
		if (!refreshToken) {
			return response.status(403).json({ message: "missing token" });
		}
		try {
			const isValid = await testJwtValidity(refreshToken);
			const { email, id, role_id } = isValid;
			const user = await memberDatamapper.findByPk(id);
			console.log("User infos: ", user);

			if (isValid.id && user) {
				const newToken = generateJwtTokens({
					email: email,
					id: id,
					role_id: role_id,
				});
				console.log("newToken: ", newToken.accessToken);
				response.setHeader(
					"Authorization",
					`Bearer ${newToken.accessToken}`
				);
				delete user.password;
				response.status(200).json(user);
			}
		} catch (error) {
			return response.status(403).json(error.message);
		}
	},

	resetPassword: async (request, response) => {
		const { email: bodyEmail } = request.body;
		console.log("bodyEmail: ", bodyEmail);
		console.log("RESET PASSWORD middleware");
		try {
			if (!bodyEmail) {
				return response.status(400).json({ message: "missing email" });
			}
			const isEmailExist = await memberDatamapper.findByEmail(bodyEmail);
			if (!isEmailExist) {
				return response
					.status(400)
					.json({ message: "user does not exist" });
			}
			const generateTokenTosend = sendEmailResetPasswordJwt({
				email: isEmailExist.email,
				role_id: isEmailExist.role_id,
				id: isEmailExist.id,
			});
			await emailReinitPassword(
				"alexma225@hotmail.com",
				generateTokenTosend
			);
			response.status(200).json();
		} catch (error) {
			return response.status(403).json(error.message);
		}
	},
};
