import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  Index
} from 'typeorm'
import Category from '../categories/entities/category.entity'
import User from '../users/entities/user.entity'

@Entity()
class Post {
  @PrimaryGeneratedColumn()
  public id: number

  @Column()
  public title: string

  @Column('text', { array: true })
  public paragraphs: string[]

  @Column({ nullable: true })
  public category?: string

  @Index('post_authorId_index')
  @ManyToOne(() => User, (author: User) => author.posts)
  public author: User

  @ManyToMany(() => Category, (category: Category) => category.posts)
  @JoinTable()
  public categories: Category[]
}

export default Post
