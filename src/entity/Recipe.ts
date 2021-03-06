
import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	BaseEntity,
	CreateDateColumn,
	ManyToOne,
	JoinColumn,
	OneToOne
} from 'typeorm'
import { Field, Int, ObjectType } from 'type-graphql'
import { User } from './User'
import { Category } from './Category'

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

  @Field(() => User, {nullable: true})
  @ManyToOne(() => User, user => user.recipes)
  user!: User;

  @Field(() => Category, {nullable: true})
  @ManyToOne(() => Category, category => category.recipes)
  category!: Category;


  @Field(() => String)
  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: string;
}