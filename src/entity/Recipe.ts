
import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	BaseEntity,
	CreateDateColumn,
	ManyToOne
} from 'typeorm'
import { Field, Int, ObjectType } from 'type-graphql'
import { User } from './User'

@ObjectType()
@Entity()
export class Recipe extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  name!: string;

  @Column()
  @Field()
  description!: string;

  @Column()
  @Field()
  ingredients!: string;

  @Field()
  @ManyToOne(() => User, user => user.recipes)
  user!: User;

  @Column()
  @Field()
  category!: string;


  @Field(() => String)
  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: string;
}