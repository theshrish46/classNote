'use server'

import { currentServerUser } from "@/hooks/use-server-user"
import { db } from "@/lib/db"

export const updateBlog = async (id: string, title: string, author: string, category: string, description: string, value: string) => {
    console.log("Post id is ", id)
    const user = await currentServerUser()
    if (!user) {
        return { error: "No user found" }
    }
    const updatePost = await db.post.update({
        where: {
            id: id
        },
        data: {
            title: title,
            authorName: author,
            category: category,
            description: description,
            content: value,
            authorId: user?.id
        }
    })
    if (!updatePost) {
        return { error: "Error while updating the post" }
    }
    return { success: "Successfully updated the post" }
}