import client from "../helpers/pg.driver.js";

export default {
	async findByPk() {
		const index = await client.query("SELECT * FROM visitor");

		return index.rows;
	},

	async insert() {
		const login = await client.query("SELECT * FROM visitor");

		return login.rows;
	},

	async logout() {
		const logout = await client.query("SELECT * FROM visitor");

		return logout.rows;
	}
};