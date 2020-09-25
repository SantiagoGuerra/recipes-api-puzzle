import jwt from 'jsonwebtoken'

const SECRET_KEY = process.env.SECRET_KEY || 'SECRET KEY NEEDED!'

export const createToken = async (payload:Record<string, unknown>, expiresIn:string) => {

	const token = await jwt.sign(payload, SECRET_KEY , { expiresIn })

	return token
}

export const authChecker = (
	{ root, args, context, info },
	roles,
) => {
 
	console.log(context.user)
	return true // or false if access is denied
}