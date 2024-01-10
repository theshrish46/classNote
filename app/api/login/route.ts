import { db } from "@/lib/db"
import { accessToken, comparePassword } from "@/lib/jwt-token"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
    const { email, password } = await request.json()
    const existingUser = await db.user.findFirst({
        where: {
            email: email as string
        }
    })
    if (!existingUser) {
        console.log('No user found')
    }
    const comparedPassword = await comparePassword(password as string, existingUser?.password as string)
    if (!comparedPassword) {
        console.log("Password didn't match")
    }
    const userDoc = await db.user.findFirst({
        where: {
            id: existingUser?.id
        }
    })
    console.log(userDoc)
    console.log('userdoc.id', userDoc?.id)

    const token = accessToken(userDoc?.id as string, userDoc?.name as string)
    cookies().set('accessToken', token)
    redirect('/')
    return NextResponse.json(userDoc)
}