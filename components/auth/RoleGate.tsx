'use client'

import {ReactNode} from "react";
import {UserRole} from "@prisma/client";
import {useCurrentRole} from "@/hooks/use-current-role";
import {FormError} from "@/components/form/FormError";

interface RoleGateProps {
    children: ReactNode;
    allowedRole: UserRole
}

const RoleGate = ({
    allowedRole,
    children,
}: RoleGateProps) => {
    const role = useCurrentRole();

    if(role !== allowedRole) {
        return (
            <FormError
                message='У вас нет прав для просмотра данного контента'
            />
        )
    }

    return (
        <>{children}</>
    )
}

export  default  RoleGate;