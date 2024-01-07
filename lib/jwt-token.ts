import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

type user = {
    id: string,
    name: string
}

export function accessToken(id: string, name: string) {
    return jwt.sign(
        {
            id: id,
            name: name,
        },
        'asdfadsf',
        { expiresIn: '2d' },
    )
}

export function decodedToken(token: string) {
    if (!token) return
    return jwt.verify(token, 'asdfadsf')
}

export async function hashPassword(password: string) {
    return await bcrypt.hash(password, 10)
}

export async function comparePassword(password: string, userPassword: string) {
    return await bcrypt.compare(password, userPassword)
}