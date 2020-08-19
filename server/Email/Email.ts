import Api from '../Api/Api';
const nodemailer = require('nodemailer');

export default class Email {
	private static getTransporter() {
		return nodemailer.createTransport({
			host: 'smtp.gmail.com',
			port: 587,
			secure: false,
			auth: {
				user: process.env.EMAIL_LOGIN,
				pass: process.env.EMAIL_PASSWORD,
			},
			tls: {
				rejectUnauthorized: false,
			},
		});
	}

	static sendConfirmationEmail(email: string) {
		const token = Api.generateToken(email);
		const mailOptions = {
			from: process.env.EMAIL_LOGIN,
			to: email,
			subject: 'Confirm Your Registration',
			html: Email.getConfirmationMarkup(token),
		};

		return Email.getTransporter().sendMail(mailOptions);
	}

	private static getConfirmationMarkup(token: string) {
		return `
			<div style="padding: 20px;">
				<p style="padding-bottom: 20px;">
					Open the link below to confirm your account:
				</p>
				<a href="http://localhost:3000/confirmation?id=${token}"
						 style="background-color: #65b6ef; 
										width: 100px; 
										height: 40px; 
										text-decoration: none; 
										color: #fff; 
										padding: 20px; 
										font-weight: 700; 
										font-size: 18px; 
										letter-spacing: 1px; 
										text-shadow: 1px 1px 1px #000; 
										border-radius: 3px; 
										border: 1px solid #000;">
					Confirmation Link
				</a>
			</div>
		`;
	}
}
