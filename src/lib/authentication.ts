import jwt from 'jsonwebtoken'

const SECRET_KEY = process.env.SECRET_KEY || 'SECRET KEY NEEDED!'

export const createToken = async (payload:Record<string, unknown>, expiresIn:string) => {

	const token = await jwt.sign(payload, SECRET_KEY , { expiresIn })

	return token
}

export const authChecker = ( { context }: any) => {
 
	const { req } = context


	if(req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
		const token = req.headers.authorization.split(' ')[1]

		if(jwt.verify(token, SECRET_KEY)) {
			return true
		} else {
			false
		}
	}

	return false
}

export const decodeToken = async (token: string) => {
	const decoded = await jwt.decode(token)
	
	return decoded
}