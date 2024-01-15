'use server';
import { currentServerUser } from "@/hooks/use-server-user"
import { db } from "@/lib/db"

export const comment = async (comment: string, postId: string) => {

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
            userName: user.name as string
        }
    })
    if (!newComment) {
        return { error: "Something went wrong while creating the comment" }
    }

    return { success: "Successfully commented" }

}


export const deleteComment = async (id: string) => {
    const post = await db.comment.delete({
        where: {
            id: id
        }
    })
    if (!post) {
        return { error: "There is no such comments to delete" }
    }
    console.log('comment deleted')
    return { success: "Deleted comment Successfully" }
}