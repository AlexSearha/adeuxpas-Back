import jwt from "jsonwebtoken";


function jwtTokens(test) 
{
	// const user = {user_id, user_firstname, user_email} ;
	console.log("TEST :", test );
	const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "1h"});
	return ({accessToken});
}

export {jwtTokens};