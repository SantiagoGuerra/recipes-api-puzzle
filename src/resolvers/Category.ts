import { Query, Resolver, Mutation, InputType, Field, Arg, Authorized, Int, Ctx } from 'type-graphql'
import { Category } from '../entity/Category'
import { getRepository, In } from 'typeorm'
import { Context } from 'vm'


@InputType()
class CreateCategoryInput {
	@Field(() => String)
	name!: string
}

@InputType()
class UpdateCategoryInput {
	@Field(() => Int)
	id!: number
	
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
	@Mutation(() => Category)
	async updateCategory(
		@Arg('params', () => UpdateCategoryInput) params: UpdateCategoryInput
	) {
		
		const categoryRepository = getRepository(Category)
	
		const category = await categoryRepository.findOne({
			where: {
				id: params.id
			}
		})


		if(category?.name) {
			category.name = params.name	
			return await categoryRepository.save(category)
		}

		throw new Error('Id Category do not found')

	
	}

	@Authorized()
  @Query(() => [Category])
	async getCategories() {
		return Category.find()
	}

	@Authorized()
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

		return category
	}

}