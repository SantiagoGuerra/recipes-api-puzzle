import jwt from 'jsonwebtoken'

const SECRET_KEY = process.env.SECRET_KEY || 'SECRET KEY NEEDED!'

export const createToken = async (payload:Record<string, unknown>, expiresIn:string) => {

	const token = await jwt.sign(payload, SECRET_KEY , { expiresIn })

	return token
}