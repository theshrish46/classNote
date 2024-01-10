import ContactFormEmail from "@/email/contact-form-email";
import { db } from "@/lib/db"
import { emailTemplate } from "@/lib/email";
import { accessToken, hashPassword } from "@/lib/jwt-token"
import { redirect } from "next/navigation"
import { NextResponse } from "next/server"
import React from "react";
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

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

    // const populatedEmailTemplate = emailTemplate.replace(/{{username}}/g, name)


    const hashedPassword = await hashPassword(password as string)
    const userDoc = await db.user.create({
        data: {
            name: name as string,
            email: email as string,
            password: hashedPassword
        }
    })
    const emailToken = accessToken(userDoc.id, userDoc.name)
    resend.emails.send({
        from: 'onboarding@resend.dev',
        to: email,
        subject: "classnote authorization your email",
        react: React.createElement(ContactFormEmail, {
            token: emailToken as string
        })
    })

    // redirect('/')
    return NextResponse.json(userDoc)
}