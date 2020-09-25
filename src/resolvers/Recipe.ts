import { Query, Resolver, Authorized, Mutation, InputType, Field, Int, Arg, Ctx } from 'type-graphql'
import { Recipe } from '../entity/Recipe'
import { getRepository } from 'typeorm'
import { User } from '../entity/User'
import { Category } from '../entity/Category'



@InputType()
class CreateRecipeInput {

  @Field(() => String)
  name!: string

  @Field(() => String)
  description!: string

  @Field(() => String)
  ingredients!: string

  @Field(() => Int)
  categoryId!: number

}

@Resolver()
export class RecipeResolver {

  @Authorized()
  @Mutation(() => Recipe)
	async createRecipe(
    @Arg('params', () => CreateRecipeInput) params: CreateRecipeInput,
    @Ctx() context: any
	) {

		const {
			name,
			description,
			ingredients,
			categoryId
		} = params

		const recipeRepository = getRepository(Recipe)

		const categoryRepository = getRepository(Category)
		const category = await categoryRepository.findOne(categoryId)

		const userId = context.user.id
		const userRepository = getRepository(User)
		const user = await userRepository.findOne(userId)

		if(user && category) {


      
			const recipe = await recipeRepository.create({
				name,
				description,
				ingredients,
				user,
				category
			})

			return await recipeRepository.save(recipe)
			
		}

		throw new Error('P Error')
    
	}


  @Authorized()
  @Query(() => [Recipe])
  async getRecipes() {
  	const recipeRepository = getRepository(Recipe)

  	const recipe = await recipeRepository.find({
  		relations: ['user', 'category']
  	})

  	return recipe
  }

  @Authorized()
  @Query(() => Recipe)
  async getOneRecipe(
    @Arg('id', () => Int) id: number
  ){
  	const recipeRepository = getRepository(Recipe)

  	const recipe = await recipeRepository.findOne({
  		relations: ['category', 'user'],
  		where: {
  			id
  		}
  	})


  	return recipe
  }
}