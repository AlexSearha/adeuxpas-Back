import jwt from "jsonwebtoken";

function jwtTokens(test) {
	const { email, role_id, id } = test;
	const data = {
		email,
		role_id,
		id,
	};

	const accessToken = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, {
		expiresIn: "1h",
	});
	const refreshToken = jwt.sign(data, process.env.REFRESH_TOKEN_SECRET, {
		expiresIn: "15d",
	});
	return { accessToken, refreshToken };
}

export { jwtTokens };
