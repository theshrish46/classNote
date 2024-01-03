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

export function decodedToken(token: any) {
    return jwt.verify(token, 'asdfadsf')
}

export async function hashPassword(password: string) {
    return await bcrypt.hash(password, 10)
}