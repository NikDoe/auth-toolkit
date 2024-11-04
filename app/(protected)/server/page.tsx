import {currentUser} from "@/lib/auth";
import {UserInfo} from "@/components/UserInfo";

async function ServerPage() {
    const user = await currentUser();

    return (
        <UserInfo label='👽 Серверный компонент' user={user} />
    )
}

export default ServerPage;