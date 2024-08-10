import e from 'express';
import { EntityBase } from 'src/common/abstracts/base.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, UpdateDateColumn } from 'typeorm';
import { PostStatus } from '../enums/post-status.enum';
import { User } from 'src/modules/user/entities/user.entity';
import { Likes } from './like.entity';
import { Bookmarks } from './bookmark.entity';
import { Comments } from './comment.entity';

@Entity({ name: 'blogs' })
export class Blog extends EntityBase {
	@Column()
	title: string;

	@Column()
	shortDescription: string;

	@Column({ type: 'text' })
	content: string;

	@Column({ enum: PostStatus, default: PostStatus.Draft, type: 'enum' })
	status: PostStatus;

	@Column({ nullable: true })
	image: string;

	@Column({ unique: true })
	slug: string;

	@Column()
	timeToRead: string;

	@Column()
	authorId: number;

    @ManyToOne(() => User, user => user.blogs, { onDelete: 'CASCADE' })
    author: User;

    @OneToMany(() => Likes, Likes => Likes.blog)
    likes: Likes[];

    @OneToMany(() => Bookmarks, bookmarks => bookmarks.blog)
    bookmarks: Bookmarks[];

    @OneToMany(() => Comments, comment => comment.blog)
    comments: Comments[];

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}
