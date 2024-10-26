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

export const sendResetPasswordEmail = async (
	email: string,
	token: string,
) => {
	const resetPasswordLink = `http://localhost:3000/auth/new-password?token=${token}`;

	await resend.emails.send({
		from: 'onboarding@resend.dev',
		to: email,
		subject: "Сброс пароля",
		html: `<p>Нажмите <a href="${resetPasswordLink}">здесь</a>, чтобы сбросить пароль</p>`
	})
}

export const sendTwoFactorTokenEmail = async (
	email: string,
	token: string,
) => {
	await resend.emails.send({
		from: 'onboarding@resend.dev',
		to: email,
		subject: "2FA код",
		html: `<p>Ваш код: ${token}`
	})
}