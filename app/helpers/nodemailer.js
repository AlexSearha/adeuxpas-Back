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
		from: '"adeuxpas" <contact@mytechcompanion.fr>',
		to: emailTo,
		subject: "Réinitialisation de votre mot de passe",
		html: `
		<p>Bonjour,</p>
		<p>Veuillez cliquer sur le lien suivant pour réinitialiser votre mot de passe : <a href="http://localhost:5173/reset-password/${token}">http://localhost:5173/reset-password/${token}</a></p>
		<p>Ce lien sera valable pendant 25 minutes, au-delà, il vous sera demandé de réitérer votre demande de changement de mot de passe.</p>
		<p>Cordialement,<br>L'équipe Adeuxpas</p>
	  `,
	});

	console.log("Message sent: %s", info.messageId);
}

export async function emailContactForm(body) {
	const { firstname, email, message } = body;
	const info = await transporter.sendMail({
		// eslint-disable-next-line quotes
		from: '"adeuxpas" <contact@mytechcompanion.fr>',
		to: "alexis.marouf@hotmail.fr",
		subject: "Nouveau message de formulaire de contact",
		html: `
		<p>Nouveau message de formulaire de contact reçu:</p>
  
		<p><strong>Nom:</strong> ${firstname}</p>
		<p><strong>Email:</strong> ${email}</p>
		<p><strong>Message:</strong></p>
		<p>${message}</p>
	  `,
	});

	console.log("Message sent: %s", info.messageId);
}

// emailConfirmationSubscribeToken().catch(console.error);
