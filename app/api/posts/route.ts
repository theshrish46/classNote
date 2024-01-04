import { db } from "@/lib/db";
import { decodedToken } from "@/lib/jwt-token";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request, response: Response) {
    console.log('start')
    console.log('req', request)
    console.log('req.body', request.body)
    const { title, author, description, category, value } = request.body;

    const existingPost = await db.post.findFirst({
        where: {
            title: title
        }
    })
    if (existingPost) {
        return new NextResponse(JSON.stringify({ mes: 'already exists' }))
    }
    const token = cookies().get("accessToken");
    const decoded = decodedToken(token?.value);

    // const post = await db.post.create({
    //     data: {
    //         title: title,
    //         authorName: author,
    //         category: category,
    //         description: description,
    //         content: value,
    //         // author: id
    //     }
    // })
    return new NextResponse(JSON.stringify({ message: 'ok' }))
}