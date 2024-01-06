import { db } from "@/lib/db"
import { decodedToken } from "@/lib/jwt-token"
import { JwtPayload } from "jsonwebtoken"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    console.log(request)
    const id = params.id
    // const { id } = request.query
    const { title, author, category, description, value } = await request.json()
    console.log('id', id)
    const post = await db.post.findFirst({
        where: {
            id: id
        }
    })
    if (!post) {
        console.log('No post available for this id')
    }
    const token = cookies().get('accessToken')
    const decoded = decodedToken(token?.value)
    const user = await db.user.findFirst({
        where: {
            id: decoded.id
        }
    })
    console.log(user)
    const updatedPost = await db.post.update({
        where: {
            id: id
        },
        data: {
            title: title,
            authorName: author,
            description: description,
            category: category,
            content: value,
            author: {
                connect: {
                    id: user?.id
                }
            }
        }
    })
    console.log("updated post", updatedPost)
    return NextResponse.json({ updatedPost })
}