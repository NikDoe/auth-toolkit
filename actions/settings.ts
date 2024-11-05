'use server'

import bcrypt from 'bcryptjs';
import { z } from 'zod'
import { db } from '@/lib/db'
import { SettingsSchema } from "@/schemas";
import {currentUser} from "@/lib/auth";
import {getUserByEmail, getUserById} from "@/data/user";
import {generateVerificationToken} from "@/lib/token";
import {sendVerificationEmail} from "@/lib/mail";

export const settingsAction = async (values: z.infer<typeof SettingsSchema>) => {
    const user = await currentUser();

    if(!user?.id) {
        return { error: 'Требуется авторизация' };
    }

    const dbUser = await getUserById(user.id);

    if(!dbUser) {
        return { error: 'Требуется авторизация' };
    }

    if(user.isOAuth) {
        values.isTwoFactorEnabled = undefined;
        values.email = undefined;
        values.password = undefined;
        values.newPassword = undefined;
    }

    if(values.email && values.email !== user.email) {
        const existingUser = await getUserByEmail(values.email);

        if(existingUser && existingUser.id !== user.id) {
            return { error: 'Данный email уже используется' }
        }

        const verificationToken = await generateVerificationToken(user.id);

        await sendVerificationEmail(
            verificationToken.email,
            verificationToken.token
        )

        return { success: 'Письмо для подтверждения нового email отправлено на вашу почту' }
    }

    if(values.password && values.newPassword && dbUser.password) {
        const isPasswordsMatch = await bcrypt.compare(
            values.password,
            dbUser.password,
        )

        if(!isPasswordsMatch) {
            return { error: 'Неверный текущий пароль' }
        }

        const newHashedPassword = await bcrypt.hash(values.newPassword, 10);

        values.password = newHashedPassword;
        values.newPassword = undefined;
    }

    await db.user.update({
        where: {id: dbUser.id},
        data: {...values},
    })

    return { success: 'данные обновлены' };
}