import yelp from "yelp-fusion";
const client = yelp.client(process.env.YELP_TOKEN);
const radius = 15000;

export default {
	async getFetchYelp(request, response) {
		try {
			const body = request.body;
			const data = { ...body, radius: radius };
			console.log("data: ", data);
			const yelpResponse = await client.search(data);
			return response.status(200).json(yelpResponse.jsonBody.businesses);
		} catch (error) {
			console.log(error);
			return response
				.status(500)
				.json({ error: "Internal Server Error" });
		}
	},
};
