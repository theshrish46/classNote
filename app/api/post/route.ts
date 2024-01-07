
import { db } from "@/lib/db";
import { decodedToken } from "@/lib/jwt-token";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

type JwtPayload = {
    id: string
}

export async function POST(request: Request, response: Response) {
    const { title, author, category, description, value } = await request.json()

    console.log(title, category, author, description, value)
    const token = cookies().get('accessToken')
    const decoded = decodedToken(token?.value as string) as JwtPayload

    const objectId = decoded.id
    console.log('objectid', objectId)
    const user = await db.user.findFirst({
        where: {
            id: decoded.id
        }
    })

    const post = await db.post.create({
        data: {
            title: title,
            authorName: author,
            category: category,
            description: description,
            content: value,
            author: {
                connect: {
                    id: user?.id
                }
            }
        }
    })

    return NextResponse.json(post)
}
