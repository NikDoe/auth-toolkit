'use server'

import {currentRole} from "@/lib/auth";
import {UserRole} from "@prisma/client";

export const adminAction = async () => {
    const role = await currentRole();

    if(role === UserRole.ADMIN) {
        return {success: 'серверный экшен использован успешно'}
    }

    return {error: 'у вас нет прав использовать данный сервеный экшен' }
}