
import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	BaseEntity,
	CreateDateColumn,
	OneToMany
} from 'typeorm'
import { Field, Int, ObjectType } from 'type-graphql'
import { Recipe } from './Recipe'

@ObjectType()
@Entity()
export class Category extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  name!: string;

  @Field(() => [Recipe], {nullable: true})
  @OneToMany(() => Recipe, recipe => recipe.category)
  recipes!: Recipe[];

  @Field(() => String)
  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: string;
}