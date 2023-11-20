"use strict";
// require("dotenv").config();
import nodemailer from "nodemailer";
// const nodemailer = require("nodemailer");
const MAIL_PASSWORD = process.env.MAIL_PASSWORD;

const transporter = nodemailer.createTransport({
	host: "mail.mytechcompanion.fr",
	port: 465,
	secure: true,
	auth: {
		user: "contact@mytechcompanion.fr",
		pass: MAIL_PASSWORD,
	},
});

export async function emailReinitPassword(emailTo, token) {
	const info = await transporter.sendMail({
		// eslint-disable-next-line quotes
		from: '"adeuxpas" <contact@mytechcompanion.fr>', // sender address
		to: emailTo, // list of receivers
		subject: "Reinitialisation de votre mot de passe", // Subject line
		html: `<p>Bonjour,</p><br><p>Veuillez cliquer sur le lien suivant pour reinitialiser votre mot de passe : <span><a href="http://localhost:5173/reset-password/${token}">http://localhost:5173/reset-password/${token}</a></span></p><br>Ce lien sera valable pendant 25 minutes,au dela, il vous sera demander de reiterer votre demande de changement de mot de passe<p>Cordialement,</p><br><p>Katia Lemaire Sophrologue<br>22 rue des tisserands, 56190 Noyal-Muzillac<br>Tel: 07.60.31.10.52</p>`, // html body
	});

	console.log("Message sent: %s", info.messageId);
}

// emailConfirmationSubscribeToken().catch(console.error);
