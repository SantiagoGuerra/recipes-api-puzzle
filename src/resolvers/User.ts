import { Query, Resolver, Mutation, ObjectType, Field } from 'type-graphql'


@ObjectType()
class TokenType {
  @Field(() => String)
  token!: string
}


@Resolver()
export class UserResolver {


  @Mutation(() => TokenType)

  @Query(() => String)
	hi():string {
		return 'hi'
	}

}