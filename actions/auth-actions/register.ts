'use server'

import * as z from 'zod';
import bcrypt from 'bcryptjs';

import { RegisterSchema } from '@/schemas'
import { db } from '@/lib/db';
import { getUserByEmail } from '@/data/user';
import { generateVerificationToken } from '@/data/token';
// import { sendVerificationEmail } from '@/lib/mail';

export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validatedFields = RegisterSchema.safeParse(values)

    if (!validatedFields.success) {
        return { error: "Fields are required" }
    }

    const { name, email, password } = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await getUserByEmail(email)

    if (existingUser) {
        return { error: "Email already in use" }
    }

    const user = await db.user.create({
        data: {
            name: name,
            email: email,
            password: hashedPassword,
            emailVerified: new Date()
        }
    })

    // TODO: Send Verification token
    const verificationToken = await generateVerificationToken(email)
    // await sendVerificationEmail(verificationToken.email, verificationToken.token);


    return { success: "Confirmation Email Sent" }
}