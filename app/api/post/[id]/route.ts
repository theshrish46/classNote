import { currentServerUser } from "@/hooks/use-server-user"
import { db } from "@/lib/db"
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
    const user = await currentServerUser()
    const existingUser = await db.user.findFirst({
        where: {
            id: user?.id
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
                    id: existingUser?.id
                }
            }
        }
    })
    console.log("updated post", updatedPost)
    return NextResponse.json({ updatedPost })
}