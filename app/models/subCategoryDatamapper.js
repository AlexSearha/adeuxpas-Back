import client from "../helpers/pg.driver.js";

export default {
	
	async findAll() {
		const findAll = await client.query(
			`
			SELECT * FROM sub_category
			`
		);
		return findAll.rows;
    
	},
    
	async findByPk(id) {
		const findByPk = await client.query(
			`
			SELECT * FROM 
			sub_category 
			WHERE id = $1
			`, 
			[id],
		);

		if (findByPk.rowCount === 0) {
			return undefined;
		}

		return findByPk.rows[0];
    
	},
    
	async findAllByPk(subCategoryId) {
		const findAllByPk = await client.query(
			`
            SELECT 
            sub_category.label AS name,  
            json_agg(
                json_build_object
                (
                'nom', activity.label, 
                'address', activity.address, 
                'latitude', activity.latitude, 
                'longitude', activity.longitude, 
                'photo', activity.photo
                )
            ) 
            AS activites
            FROM  
            sub_category  
            JOIN  
            activity 
            ON sub_category.id = activity.sub_category_id  
            WHERE  
            sub_category.id = $1 
            GROUP by sub_category.label
            `,
			[subCategoryId],
		);

		if (findAllByPk.rowCount === 0) {
			return undefined;
		}
 
		return findAllByPk.rows;
    
	},
    
	async insert(subcategory) {
		console.log(subcategory);

		const insertSubCategory = await client.query(
			`
            INSERT INTO sub_category
            (label, category_id) 
            VALUES
            ($1, $2) 
            RETURNING *
            `,
			[
				subcategory.label, 
				subcategory.category_id
			],
		);
        
		return insertSubCategory.rows;
    
	},
    
	async update(id, sub_category) {
        
		const updateSubCategory = await client.query(
			`
			UPDATE sub_category SET 
			label = $1,
			category_id = $2
			WHERE id = $3
			RETURNING *
			`,
			[
				sub_category.label,
				sub_category.category_id,
				id
			],
		);

		return updateSubCategory.rows[0];
	
	/* async update(id, visitor) {
        const fields = Object.keys(visitor).map((prop, index) => "${prop}" = $${index + 1});
        const values = Object.values(visitor);

        const savedVisitor = await client.query(
            
                UPDATE visitor SET
                    ${fields}
                WHERE id = $${fields.length + 1}
                RETURNING *
            ,
            [...values, id],
        );

        return savedVisitor.rows[0];
    },
    */
	},
    
	async delete(id) {
		const deleteSubCategory = await client.query(
			`
			DELETE FROM 
			sub_category 
			WHERE id = $1 
			`, 
			[id],
		);

		return !!deleteSubCategory.rowCount;
	},
};