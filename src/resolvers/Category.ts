import { Query, Resolver } from 'type-graphql'
import { Category } from '../entity/Category'

@Resolver()
export class CategoryResolver {

  @Query(() => String)
	async getCategories() {
		return 'dsdsda'
	}

}