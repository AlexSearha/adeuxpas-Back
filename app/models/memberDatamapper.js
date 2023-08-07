import client from "../helpers/pg.driver.js";

export default {
	
	async findAll() {
		const findAll = await client.query("SELECT * FROM member");

		return findAll.rows;
	},

    
	async findByPk(id) {
		const findByPk = await client.query(
			"SELECT * FROM member WHERE id = $1", 
			[id],
		);

		if (findByPk.rowCount === 0){
			return undefined;
		}

		return findByPk.rows[0];
	},

    
	async insert(member) {
		console.log(member);
        
		const insertMember = await client.query(
			`
            INSERT INTO 
            member 
            (firstname, lastname, email, password, dateofbirth, phone_number, photo, address, zipcode, 
            city, country) 
            VALUES 
            ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) 
            RETURNING *
            `,
			[
				member.firstname, 
				member.lastname, 
				member.email, 
				member.password, 
				member.dateofbirth,
				member.phone_number, 
				member.photo, 
				member.address, 
				member.zipcode, 
				member.city, 
				member.country
			],
		);

		return insertMember.rows;

	},
    
    
	async update(id, member) {
		console.log(member);

		const updateMember = await client.query(
			`
        	UPDATE sub_category 
        	SET 
        	label = $1,
        	category_id = $2
        	WHERE id = $3
        	RETURNING *
        	`,
			[
				member.firstname, 
				member.lastname, 
				member.email, 
				member.password, 
				member.dateofbirth,
				member.photo, 
				member.phone_number, 
				member.address, 
				member.zipcode, 
				member.city, 
				member.country, 
				id
			],
		);

		return updateMember.rows[0];
    
	},
    
    
	async delete(id) {
		const deleteMember = await client.query(
			"DELETE FROM member WHERE id = $1",
			[id],
		);
        
		return !!deleteMember.rowCount;
    
	},

};