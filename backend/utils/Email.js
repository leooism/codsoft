const nodeMailer = require("nodemailer");

const transporter = nodeMailer.createTransport({
	host: "smtp.forwardemail.net",
	port: 465,
	secure: true,
	auth: {
		user: process.env.NODEMAILER_EMAIL_PORTAL_USER,
		pass: process.env.NODEMAILER_EMAIL_PORTAL_PASS,
	},
});
const sendMail = async ({ to, subject, message }) => {
	await transporter.sendMail({
		from: '"Fred Foo 👻" <foo@example.com>', // sender address
		to: to, // list of receivers
		subject: subject, // Subject line
		text: message, // plain text body
		html: "<b>Hello world?</b>", // html body
	});
};

module.exports = sendMail;
