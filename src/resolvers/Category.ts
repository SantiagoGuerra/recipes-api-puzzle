import { Query, Resolver, Mutation, InputType, Field, Arg, Authorized, Int } from 'type-graphql'
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

	@Query(() => Category)
	async getOneCategory(
		@Arg('id', () => Int) id: number
	) {

		const categoryRepository = getRepository(Category)

		const category = await categoryRepository.findOne({
			where: {
				id
			}
		})

		console.log(category)

		return category
	}

}