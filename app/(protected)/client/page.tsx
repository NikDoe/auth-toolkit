'use client'

import {useCurrentUser} from "@/hooks/use-current-user";
import {UserInfo} from "@/components/UserInfo";

function ClientPage() {
    const user = useCurrentUser();

    return (
        <UserInfo label='👾 клиентский компонент' user={user} />
    )
}

export  default  ClientPage;