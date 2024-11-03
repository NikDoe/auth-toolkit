"use server"

import { signOut } from "@/auth";

export const logout = async () => {
	//какая-то серверная логика
	//(к примеру - удаление информации о пользователе или самого пользователя)
	await signOut();
}