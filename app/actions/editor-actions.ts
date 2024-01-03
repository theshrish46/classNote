'use server'

import { db } from "@/lib/db"
import { decodedToken } from "@/lib/jwt-token"
import { cookies } from "next/headers"

export const write = async (formData: FormData) => {
    const title = formData.get('title')
    const author = formData.get('author')
    const category = formData.get('category')
    const description = formData.get('description')
    const value = formData.get('value')
    // const authorId = formData.get('authorId')

    console.log('title', title)
    console.log('author', author)
    console.log('category', category)
    console.log('description', description)
    console.log('value', value)



    const token = cookies().get('accessToken')
    const { id, name, } = decodedToken(token?.value)

    const existingPost = await db.post.findFirst()
    if (existingPost) {
        console.log(existingPost)
        console.log('already existing title')
    }

    const post = db.post.create({
        data: {
            title: title as string,
            authorName: author as string,
            category: category as string,
            description: description as string,
            content: value as string,
            author: id
        }
    })
    console.log('post', post.then((data) => console.log(data)))

}