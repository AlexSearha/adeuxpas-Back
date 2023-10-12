import client from "../helpers/pg.driver.js";

export default {
  async findAll() {
    const findAll = await client.query("SELECT * FROM activity");

    return findAll.rows;
  },

  async findByPk(id) {
    const findByPk = await client.query(
      `
			SELECT * FROM 
			activity 
			WHERE id = $1 
			`,
      [id],
    );

    if (findByPk.rowCount === 0) {
      return undefined;
    }

    return findByPk.rows[0];
  },

  async insert(activity) {
    console.log(activity);

    const insertActivity = await client.query(
      `
            INSERT INTO activity 
            (label, address, latitude, longitude, photo, sub_category_id) 
            VALUES 
            ($1, $2, $3, $4, $5, $6) 
            RETURNING *
            `,
      [
        activity.label,
        activity.address,
        activity.latitude,
        activity.longitude,
        activity.photo,
        activity.sub_category_id,
      ],
    );

    return insertActivity.rows;
  },

  async update(id, activity) {
    console.log(activity);

    const updateActivity = await client.query(
      `
            UPDATE activity 
            SET
            label = $1,
            address = $2,
            latitude = $3,
            longitude = $4,
            photo = $5,
            sub_category_id = $6 
			WHERE id = $7
			RETURNING *
            `,
      [
        activity.label,
        activity.address,
        activity.latitude,
        activity.longitude,
        activity.photo,
        activity.sub_category_id,
        id,
      ],
    );

    return updateActivity.rows[0];
  },

  async delete(id) {
    const deleteActivity = await client.query(
      `
			DELETE FROM 
			activity 
			WHERE id = $1
			`,
      [id],
    );

    return !!deleteActivity.rowCount;
  },
};
