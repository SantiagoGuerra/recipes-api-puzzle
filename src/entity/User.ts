
import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	BaseEntity,
	CreateDateColumn,
	OneToMany
} from 'typeorm'
import { Field, Int, ObjectType } from 'type-graphql'
import { IsEmail, MinLength } from 'class-validator'

import {Recipe} from './Recipe'

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  name!: string;

  @Column({unique: true})
  @Field()
  @IsEmail()
  email!: string;

  @Column()
  @MinLength(8)
  password!: string;

  @Field(() => [Recipe])
  @OneToMany(() => Recipe, recipe => recipe.user)
  recipes!: Recipe[];

  @Field(() => String)
  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: string;
}