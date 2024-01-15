'use server'

import { db } from "@/lib/db"


export const viewsAction = async (viewd: string, id: string) => {
    console.log(viewd)
    const post = await db.post.update({
        where: {
            id: id,
        },
        data: {
            views: { increment: 1 }
        }
    })
    if (!post) {
        return { error: "Error while incrementing the views" }
    }
    return { success: "Ok" }
}