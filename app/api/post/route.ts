
import mongoose from 'mongoose'
import { db } from "@/lib/db";
import { decodedToken } from "@/lib/jwt-token";
import { Prisma } from "@prisma/client";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request, response: Response) {
    const { title, author, category, description, value } = await request.json()

    console.log(title, category, author, description, value)
    const token = cookies().get('accessToken')
    const decoded = decodedToken(token?.value)

    const objectId = decoded.id
    const user = await db.user.findFirst({
        where: {
            id: decoded.id
        }
    })
    console.log(user)

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
