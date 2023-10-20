import client from "../helpers/pg.driver.js";

export default {
	async findAll() {
		const findAll = await client.query("SELECT * FROM category");

		return findAll.rows;
	},

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

	async findAllByPk(id) {
		const findAllByPk = await client.query(
			`
            SELECT 
            category.label AS name,  
            json_agg(
                json_build_object(
                    'name', sub_category.label,
					'id', sub_category.id
                )
            ) 
            AS souscategories
            FROM 
            category 
            JOIN 
            sub_category 
            ON category.id = sub_category.category_id 
            WHERE 
            category.id = $1
            GROUP by category.label
            `,
			[id]
		);

		if (findAllByPk.rowCount === 0) {
			return undefined;
		}

		return findAllByPk.rows[0];
	},

	async insert(category) {
		console.log(category);

		const insertCategory = await client.query(
			`
            INSERT INTO category
            (label) 
            VALUES
            ($1) 
            RETURNING *
            `,
			[category.label]
		);

		return insertCategory.rows[0];
	},

	async update(id, category) {
		console.log(category);

		const updateCategory = await client.query(
			`
            UPDATE category 
            SET 
            label = $1 
            WHERE id = $2
            RETURNING *
            `,
			[category.label, id]
		);

		return updateCategory.rows[0];
	},

	async delete(id) {
		const deleteCategory = await client.query(
			"DELETE FROM category WHERE id= $1",
			[id]
		);

		return !!deleteCategory.rowCount;
	},
};
