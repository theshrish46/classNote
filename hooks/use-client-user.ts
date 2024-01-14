import { useSession } from "next-auth/react"

export const currentClientUser = async () => {
    const session = await useSession()
    return session?.data?.user
}