'use client'

import {UserRole} from "@prisma/client";
import {toast} from "sonner";

import RoleGate from "@/components/auth/RoleGate";
import {FormSuccess} from "@/components/form/FormSuccess";
import {Button} from "@/components/ui/button";

import {adminAction} from "@/actions/admin";

function AdminPage () {
    const onApiRouteClick = () => {
        fetch('/api/admin')
            .then(response => {
                if(response.ok) {
                    toast.success('Разрешенный API маршрут')
                }else {
                    toast.error('у вас нет доступа для этого API маршрута')
                }
            })
    }

    const onServerActionClick = () => {
        adminAction()
            .then(data => {
                if(data.success) {
                    toast.success(data.success);
                }

                if(data.error) {
                    toast.error(data.error);
                }
            })
    }

    return (
        <div
            className="w-full flex flex-col items-center gap-y-4 p-5 rounded-sm border bg-white max-w-[480px]"
        >
            <RoleGate allowedRole={UserRole.ADMIN}>
                <FormSuccess message='Добро паложовать в админку'/>
            </RoleGate>
            <div className='flex items-center justify-between w-full border rounded-md p-2'>
                <p
                    className='text-sm'
                >
                    API route только для Админа
                </p>
                <Button onClick={onApiRouteClick}>
                    нажмите
                </Button>
            </div>
            <div className='flex items-center justify-between w-full border rounded-md p-2'>
                <p
                    className='text-sm'
                >
                    server action только для Админа
                </p>
                <Button onClick={onServerActionClick}>
                    нажмите
                </Button>
            </div>
        </div>
    )
}

export default AdminPage;