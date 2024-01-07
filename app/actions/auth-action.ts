'use server'
import { cookies } from 'next/headers'

import { db } from "@/lib/db"
import { accessToken, comparePassword, hashPassword } from "@/lib/jwt-token";
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
    redirect('/')
}

export const login = async (formData: FormData) => {
    const email = formData.get('email')
    const password = formData.get('password')
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

    const token = accessToken(userDoc?.id as string, userDoc?.name as string)
    cookies().set('accessToken', token)
    redirect('/')
}

export const logout = async () => {
    cookies().delete('accessToken')
    console.log('loggedout successfully')
}