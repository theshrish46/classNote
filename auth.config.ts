import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from 'bcrypt'

import { LoginSchema } from "./schemas";
import { db } from "./lib/db";

export default {
  providers: [
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