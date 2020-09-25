/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import express from 'express'
import {ApolloServer} from 'apollo-server-express'
import { buildSchema } from 'type-graphql'


export async function startServer() {
	const app = express()
	const server = new ApolloServer({
		schema: await new buildSchema({
			resolvers: []
		})
	})

	server.applyMiddleware({app, path:'/graphql'})

	return app
}