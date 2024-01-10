'use server'
import { cookies } from 'next/headers'

import { db } from "@/lib/db"
import { accessToken, comparePassword, hashPassword } from "@/lib/jwt-token";
import { redirect } from 'next/navigation';



export const register = async (formData: FormData) => {
    const name = formData.get('name')
    const email = formData.get('email')
    const password = formData.get('password')

    
}

export const login = async (formData: FormData) => {
    const email = formData.get('email')
    const password = formData.get('password')
    
}

export const logout = async () => {
    cookies().delete('accessToken')
    console.log('loggedout successfully')
    redirect('/auth')
}