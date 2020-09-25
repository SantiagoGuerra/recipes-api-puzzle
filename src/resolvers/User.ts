import { Query, Resolver } from 'type-graphql'

@Resolver()
export class UserResolver {

  @Query(() => String)
	hi():string {
		return 'hi'
	}

}