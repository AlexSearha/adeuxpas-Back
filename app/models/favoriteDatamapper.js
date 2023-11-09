import client from "../helpers/pg.driver.js";

export default {
	async findAll() {
		const findAll = await client.query(
			`
		    SELECT * FROM
		    search_result
		`
		);

		return findAll.rows;
	},
	async findAllByPk(id) {
		const findAll = await client.query(
			`
		    SELECT * FROM
		    search_result
		    WHERE member_id = $1
		`,
			[id]
		);

		return findAll.rows;
	},

	async findByPk(ids) {
		const { userId, favoriteId } = ids;
		const oneFavorite = await client.query(
			`
		    SELECT * FROM
		    search_result
		    WHERE id = $1
		    AND member_id = $2
		`,
			[favoriteId, userId]
		);

		if (oneFavorite.rowCount === 0) {
			return undefined;
		}
		return oneFavorite.rows[0];
	},

	async insert(activity) {
		const insertFavorite = await client.query(
			`
            INSERT INTO search_result
            (address_departure, 
                address_destination,
                cardinal_point , 
                gps_latitude, 
                gps_longitude, 
                date_of_arrival, 
                date_of_departure, 
                category_id, 
                sub_category_id, 
                activity_id, 
                member_id)
            VALUES
            ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
            RETURNING *
        `,
			[
				activity.address_departure,
				activity.address_destination,
				activity.cardinal_point,
				activity.gps_latitude,
				activity.gps_longitude,
				activity.date_of_arrival,
				activity.date_of_departure,
				activity.category_id,
				activity.sub_category_id,
				activity.activity_id,
				activity.member_id,
			]
		);

		return insertFavorite.rows;
	},

	async delete(ids) {
		const { userId, favoriteId } = ids;
		console.log("userId: ", userId);
		console.log("favoriteId: ", favoriteId);
		const deleteFavorite = await client.query(
			`
		    DELETE FROM
		    search_result
		    WHERE id = $1
		    AND member_id = $2
		`,
			[favoriteId, userId]
		);

		return !!deleteFavorite.rowCount;
	},
};
