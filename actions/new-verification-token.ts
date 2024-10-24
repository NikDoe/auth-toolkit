'use server'

import { db } from "@/lib/db";

import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verification-token"

export const newVerificationToken = async (
	token: string,
) => {
	console.log('ЛОФВВЛА', token);

	const existingToken = await getVerificationTokenByToken(token);

	if (!existingToken) {
		return { error: 'токен не существует' };
	}

	const hasExpired = new Date(existingToken.expires) < new Date();

	if (hasExpired) {
		return { error: 'срок действий токена истёк' };
	}

	const existingUser = await getUserByEmail(existingToken.email);

	if (!existingUser) {
		return { error: 'такого email не существует' };
	}

	await db.user.update({
		where: { id: existingUser.id },
		data: {
			emailVerified: new Date(),
			email: existingToken.email,
		},
	})

	await db.verificationToken.delete({
		where: { id: existingToken.id },
	})

	return { success: 'email подтверждён 😊' }
}