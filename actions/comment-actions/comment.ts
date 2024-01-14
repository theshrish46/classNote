'use server';
import { currentServerUser } from "@/hooks/use-server-user"
import { db } from "@/lib/db"

export const comment = async (comment: string, postId: string) => {

    console.log("Inside the comment action ", comment, postId)
    const post = await db.post.findFirst({
        where: {
            id: postId
        }
    })
    if (!post) {
        return { error: "Post doesn't exists to comment on it" }
    }

    const user = await currentServerUser()
    if (!user) {
        return { error: "User doesn't exist to comment" }
    }

    const newComment = await db.comment.create({
        data: {
            comment: comment,
            postId: postId,
            userId: user?.id
        }
    })
    if (!newComment) {
        return { error: "Something went wrong while creating the comment" }
    }
    console.log("Inside the actions", newComment)
    return { success: "Successfully commented" }

}