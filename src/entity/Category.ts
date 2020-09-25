
import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	BaseEntity,
	CreateDateColumn,
	JoinColumn,
	OneToOne
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

  @OneToOne(() => Recipe)
  @JoinColumn()
  recipe!: Recipe;

  @Field(() => String)
  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: string;
}