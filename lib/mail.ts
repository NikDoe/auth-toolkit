import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const domain = process.env.NEXT_PUBLIC_APP_URL;

export const sendVerificationEmail = async (
	email: string,
	token: string,
) => {
	const confirmLink = `${domain}/auth/new-verification?token=${token}`;

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
	const resetPasswordLink = `${domain}/auth/new-password?token=${token}`;

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