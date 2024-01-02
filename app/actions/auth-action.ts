'use server'
import { cookies } from 'next/headers'

import { db } from "@/lib/db"
import { accessToken, hashPassword } from "@/lib/jwt-token";
import { redirect } from 'next/navigation';



export const register = async (formData: FormData) => {
    const name = formData.get('name')
    const email = formData.get('email')
    const password = formData.get('password')

    const user = await db.user.findFirst()
    if (user) {
        console.log(user)
    }

    const hashedPassword = await hashPassword(password as string)
    const userDoc = await db.user.create({
        data: {
            name: name as string,
            email: email as string,
            password: hashedPassword
        }
    })
    const token = accessToken(userDoc.id, userDoc.name)
    cookies().set('accessToken', token)
    redirect('/')
}