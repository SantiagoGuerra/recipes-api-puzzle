
import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	BaseEntity,
	CreateDateColumn
} from 'typeorm'
import { Field, Int, ObjectType } from 'type-graphql'
import { IsEmail, MinLength } from 'class-validator'

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


  @Field()
  @Column()
  @MinLength(8)
  password!: string;


  @Field(() => String)
  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: string;
}