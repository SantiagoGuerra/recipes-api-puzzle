import { Query, Resolver, Mutation, InputType, Field, Arg, Authorized } from 'type-graphql'
import { Category } from '../entity/Category'
import { getRepository } from 'typeorm'


@InputType()
class CreateCategoryInput {
	@Field(() => String)
	name!: string
}


@Resolver()
export class CategoryResolver {

	@Authorized()
	@Mutation(() => Category)
	async createCategory(
		@Arg('params', () => CreateCategoryInput) params: CreateCategoryInput
	) {
		
		const categoryRepository = getRepository(Category)

		const category = categoryRepository.create(params)

		return await categoryRepository.save(category)
			.catch(err => {
				throw new Error(err)
				
			})

	}

	@Authorized()
  @Query(() => [Category])
	async getCategories() {
		return Category.find()
	}

}