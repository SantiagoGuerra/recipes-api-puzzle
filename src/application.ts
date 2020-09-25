/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import express from 'express'
import {ApolloServer} from 'apollo-server-express'
import { buildSchema } from 'type-graphql'

import {UserResolver} from './resolvers/User'
import { CategoryResolver } from './resolvers/Category'
import { authChecker, decodeToken } from './lib/authentication'

export async function startServer() {
	const app = express()
	const server = new ApolloServer({
		schema: await buildSchema({
			resolvers: [UserResolver, CategoryResolver],
			authChecker,
		}),
		context: async ({ req } ) => {
			
			let user:any = {}

			if(req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
				const token = req.headers.authorization.split(' ')[1]
				const decoded = await decodeToken(token)
				user = decoded
			} 


			return {
				req,
				user
			}

		}
	})

	server.applyMiddleware({app, path:'/graphql'})

	return app
}