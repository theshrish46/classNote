import { middleware } from "@/middlewares/middleware";
import { redirect, permanentRedirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, { params }: { params: { token: string } }) {
    const token = params.token;
    if (!token) {
        return NextResponse.json({ msg: "not authorized" })
    }
    console.log(request)
    // permanentRedirect('/auth')
    const response = new Promise((resolve, reject) => {
        if (token) {
            resolve("Token verified")
        } else {
            reject("Token not verified")
        }
    })
    return NextResponse.json(response)
}