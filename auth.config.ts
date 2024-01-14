import bcrypt from 'bcryptjs'
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';


import { LoginSchema } from "./schemas";
import { db } from "./lib/db";

export default {
  providers: [
    // Google({
    //   clientId: process.env.GOOGLE_CLIENT_ID,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET
    // }),
    // TODO: work on gmail credentials
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET
    }),
    Credentials({
      async authorize(credentials) {
        const validatedSchema = LoginSchema.safeParse(credentials)

        if (validatedSchema.success) {
          const { email, password } = validatedSchema.data

          const user = await db.user.findUnique({
            where: {
              email: email
            }
          })
          if (!user || !user.password) return null;

          const comparePassword = await bcrypt.compare(password, user.password)
          if (comparePassword) return user

        }
        return null
      }
    })
  ],
} satisfies NextAuthConfig