import jwt from "jsonwebtoken";

function generateJwtTokens(encodingDatas) {
	const { email, role_id, id } = encodingDatas;
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

function sendEmailResetPasswordJwt(encodingDatas) {
	const { email, role_id, id } = encodingDatas;
	const data = {
		email,
		role_id,
		id,
	};
	return jwt.sign(data, process.env.RESET_PASSWORD_TOKEN_SECRET, {
		expiresIn: 25 * 60,
	});
}

function testJwtValidity(token) {
	return new Promise((resolve, reject) => {
		jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
			if (err) {
				reject(err);
			} else {
				resolve(decoded);
			}
		});
	});
}

export { generateJwtTokens, testJwtValidity, sendEmailResetPasswordJwt };
