'use server';

import { currentServerUser } from "@/hooks/use-server-user";
import { db } from "@/lib/db";

export const writeBlog = async (title: string, author: string, category: string, description: string, value: string) => {
    console.log('Inside the write blog actions', title, author, description, category, value)
    const user = await currentServerUser()
    if (!user) {
        return { error: "No user found" }
    }
    const post = await db.post.create({
        data: {
            title: title,
            authorName: author,
            category: category,
            description: description,
            content: value,
            authorId: user.id
        }
    })
    console.log(post)
    return { success: "Post was successfully created" }
}