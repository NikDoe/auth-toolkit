import {db} from "@/lib/db";

export const getUserAccountById = async (id: string) => {
    try {
        const account = await db.account.findFirst({ where: { userId: id } });

        return account;
    } catch {
        return null;
    }
}