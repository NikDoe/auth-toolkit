import {Badge} from "@/components/ui/badge";
import {ExtendedUser} from "@/auth";

interface UserInfoProps {
    label: string;
    user?: ExtendedUser;
}

export const UserInfo = ({
    label,
    user,
}: UserInfoProps) => {
    return (
        <div
            className="w-full flex flex-col items-center gap-y-2 p-5 rounded-sm border bg-white max-w-[480px]"
        >
            <h1 className='text-lg'>{label}</h1>
            <div
                className='w-full flex flex-col gap-2 justify-between sm:flex-row sm:items-center border rounded-md p-2 text-sm'>
                <p className='font-bold'>ID</p>
                <p className='bg-slate-100 py-1 px-3 rounded-sm'>{user?.id}</p>
            </div>
            <div
                className='w-full flex flex-col gap-2 justify-between sm:flex-row sm:items-center border rounded-md p-2 text-sm'>
                <p className='font-bold'>Имя</p>
                <p className='bg-slate-100 py-1 px-3 rounded-sm'>{user?.name}</p>
            </div>
            <div
                className='w-full flex flex-col gap-2 justify-between sm:flex-row sm:items-center border rounded-md p-2 text-sm'>
                <p className='font-bold'>Email</p>
                <p className='bg-slate-100 py-1 px-3 rounded-sm'>{user?.email}</p>
            </div>
            <div
                className='w-full flex flex-col gap-2 justify-between sm:flex-row sm:items-center border rounded-md p-2 text-sm'>
                <p className='font-bold'>Роль</p>
                <p className='bg-slate-100 py-1 px-3 rounded-sm'>{user?.role}</p>
            </div>
            <div
                className='w-full flex flex-col gap-2 justify-between sm:flex-row sm:items-center border rounded-md p-2 text-sm'>
                <p className='font-bold'>2-x факторная аутентификация</p>
                <Badge
                    className=''
                    variant={user?.isTwoFactorEnabled ? 'success' : 'destructive'}
                >
                    {user?.isTwoFactorEnabled ? 'включена' : 'выключена'}
                </Badge>
            </div>
        </div>
    )
}