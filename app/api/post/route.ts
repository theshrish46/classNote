
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { decodedToken } from "@/lib/jwt-token";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

type JwtPayload = {
    id: string
}

export async function POST(request: Request, response: Response) {
    const session = await auth()
    const { title, author, category, description, value } = await request.json()

    console.log(title, category, author, description, value)

    const post = await db.post.create({
        data: {
            title: title,
            authorName: author,
            category: category,
            description: description,
            content: value,
            author: {
                connect: {
                    id: session?.user.id
                }
            }
        }
    })

    return NextResponse.json(post)
}
