import { Query, Resolver, Authorized } from 'type-graphql'
import { Recipe } from '../entity/Recipe'
import { getRepository } from 'typeorm'

@Resolver()
export class RecipeResolver {



  
  @Authorized()
  @Query(() => [Recipe])
  async getRecipes() {
    const recipeRepository = getRepository(Recipe)

    return await recipeRepository.find()
  }
}