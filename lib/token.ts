import { v4 as uuidv4 } from 'uuid';

import { db } from '@/lib/db';
import { getVerificationTokenByEmail } from '@/data/verification-token';
import { getResetPasswordTokenByEmail } from '@/data/reset-password-token';

export const generateVerificationToken = async (email: string) => {
	const token = uuidv4();
	const expires = new Date(new Date().getTime() + 1000 * 900);

	const existingToken = await getVerificationTokenByEmail(email);

	if (existingToken) {
		await db.verificationToken.delete({
			where: {
				id: existingToken.id
			}
		})
	}

	const verificationToken = await db.verificationToken.create({
		data: {
			email,
			token,
			expires,
		}
	})

	return verificationToken;
}

export const generateResetPasswordToken = async (email: string) => {
	const token = uuidv4();
	const expires = new Date(new Date().getTime() + 1000 * 900);

	const existingToken = await getResetPasswordTokenByEmail(email);

	if (existingToken) {
		await db.resetPasswordToken.delete({
			where: {
				id: existingToken.id
			}
		})
	}

	const resetPasswordToken = await db.resetPasswordToken.create({
		data: {
			email,
			token,
			expires,
		}
	})

	return resetPasswordToken;
}