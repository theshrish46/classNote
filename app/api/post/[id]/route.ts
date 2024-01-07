import { db } from "@/lib/db"
import { decodedToken } from "@/lib/jwt-token"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

type JwtPayload = {
    id: string
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    const reqId = params.id
    
    const { title, author, category, description, value } = await request.json()
    console.log('id', reqId)
    const post = await db.post.findFirst({
        where: {
            id: reqId
        }
    })
    if (!post) {
        console.log('No post available for this id')
    }
    const token = cookies().get('accessToken')
    const decoded = decodedToken(token?.value as string) as JwtPayload
    const user = await db.user.findFirst({
        where: {
            id: decoded.id
        }
    })
    console.log(user)
    const updatedPost = await db.post.update({
        where: {
            id: reqId
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