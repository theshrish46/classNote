import { db } from "@/lib/db"
import ContactFormEmail from "@/email/contact-form-email";
import { accessToken, hashPassword } from "@/lib/jwt-token"
import { NextResponse } from "next/server"
import React from "react";
import { Resend } from 'resend'

export async function GET() {
    return new NextResponse('ok')
}

export async function POST(request: Request) {
    const { name, email, password } = await request.json()
    console.log('name email password', name, email, password)
    const user = await db.user.findFirst()
    if (user) {
        console.log(user)
    }
    const hashedPassword = await hashPassword(password as string)
    const emailToken = accessToken(name, email)
    const userDoc = await db.user.create({
        data: {
            name: name as string,
            email: email as string,
            password: hashedPassword,
            isVerified: false,
            verificationToken: emailToken
        }
    })

    resend.emails.send({
        from: 'onboarding@resend.dev',
        to: email,
        subject: "classnote authorization your email",
        react: React.createElement(ContactFormEmail, {
            token: emailToken as string,
            email: email as string
        })
    })
    return NextResponse.json(userDoc)
}