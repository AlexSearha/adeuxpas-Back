import client from "../helpers/pg.driver.js";

export default {
	async findByPk(id) {
		const findByPk = await client.query(
			"SELECT * FROM category WHERE id = $1",
			[id]
		);

		if (findByPk.rowCount === 0) {
			return undefined;
		}

		return findByPk.rows[0];
	},

	async insert() {
		const insert = await client.query("SELECT * FROM category");

		return insert.rows;
	},
};
