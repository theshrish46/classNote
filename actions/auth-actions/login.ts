'use server'

import * as z from 'zod';

import { signIn } from '@/auth';

import { LoginSchema } from '@/schemas';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { AuthError } from 'next-auth';
import { getUserByEmail } from '@/data/user';
import { generateVerificationToken } from '@/data/token';

export const login = async (values: z.infer<typeof LoginSchema>) => {
    const validatedFields = LoginSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid Fields!" }
    }


    const { email, password } = validatedFields.data;
    const existingUser = await getUserByEmail(email)
    if (!existingUser || !existingUser.email || !existingUser.password) {
        return { error: "Invalid Credentials" }
    }

    // if (!existingUser.emailVerified) {
    //     const verificationToken = await generateVerificationToken(existingUser.email);
    //     await sendVerificationEmail(verificationToken.email, verificationToken.token)

    //     return { success: "Confirmation Email Sent" }
    // }



    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT,
        })
        return { success: 'Ok login' }
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Invalid Credentials" }
                default:
                    return { error: "Something went wrong" }
            }
        }
        throw error;
    }


}