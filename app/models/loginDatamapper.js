import client from "../helpers/pg.driver.js";

export default {
	async index() {
		const index = await client.query("SELECT * FROM member");

		return index.rows;
	},
};
