/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import express from 'express'
import {ApolloServer} from 'apollo-server-express'
import { buildSchema } from 'type-graphql'

import {UserResolver} from './resolvers/User'

export async function startServer() {
	const app = express()
	const server = new ApolloServer({
		schema: await buildSchema({
			resolvers: [UserResolver]
		})
	})

	server.applyMiddleware({app, path:'/graphql'})

	return app
}