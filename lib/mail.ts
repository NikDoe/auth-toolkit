import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (
	email: string,
	token: string,
) => {
	const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`;

	await resend.emails.send({
		from: 'onboarding@resend.dev',
		to: email,
		subject: "Подтвердите ваш email",
		html: `<p>Нажмите <a href="${confirmLink}">здесь</a>, чтобы подвердить ваш email</p>`
	})
}