'use server'

import { currentServerUser } from "@/hooks/use-server-user"
import { db } from "@/lib/db"

export const handleLike = async (liked: boolean, postId: string) => {
    const user = await currentServerUser()
    if (!user) {
        return { error: "No user found" }
    }
    const postLikes = await db.post.findFirst({
        where: {
            id: postId
        }
    })
    if (!postLikes) {
        return { error: "No posts available" }
    }

    if (liked === true) {
        console.log("inside the like action", liked)
        const post = await db.post.update({
            where: {
                id: postId
            },
            data: {
                likes: { increment: 1 },
                likedBy: [user.id],
            }
        })
        if (!post) {
            return { error: "Error while liking the post" }
        }
        return { success: "Successfully liked the post" }
    } else {
        const likeCount = postLikes.likes
        if (likeCount as number <= 0) {
            return { error: "Cannot dislike" }
        }
        const post = await db.post.update({
            where: {
                id: postId,
            },
            data: {
                likes: {
                    decrement: 1
                },
                likedBy: {
                    push: user.id
                }
            }
        })
        if (!post) {
            return { error: "Error while disliking the post" }
        }
        return { error: "Successfully disliked the post" }
    }
}