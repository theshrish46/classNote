import { db } from "@/lib/db"
import { connect } from "http2"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function GET() {
    return new NextResponse('ok comment')
}

export async function POST(request: Request, { params }: { params: { id: string } }) {
    console.log('route has been hit')
    const { commentText, decodedToken } = await request.json()
    const postId = params.id
    const userName = decodedToken.name
    const userId = decodedToken.id
    console.log(decodedToken)

    const commentDoc = await db.comment.create({
        data: {
            comment: commentText as string,
            post: {
                connect: {
                    id: postId
                }
            },
            User: {
                connect: {
                    id: decodedToken.id
                }
            }
        }
    })
    return NextResponse.json(commentDoc)

}