import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { redirect } from "next/navigation"

export default async function AdminPage() {
    const {getPermission } = getKindeServerSession()

    const requiredPermission = await getPermission('access:dashboard')

    if (!requiredPermission?.isGranted) {
        redirect('/')
    }

    return (
        <div>
            only for admins
        </div>
    )
}
