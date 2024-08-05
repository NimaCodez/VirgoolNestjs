import { EntityBase } from 'src/common/abstracts/base.entity';
import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	OneToMany,
	OneToOne,
	UpdateDateColumn,
} from 'typeorm';
import { OTP } from './otp.entity';
import { Profile } from './profile.entity';
import { Blog } from 'src/modules/blog/entities/blog.entity';
import { Likes } from 'src/modules/blog/entities/like.entity';
import { Bookmarks } from 'src/modules/blog/entities/bookmark.entity';
import { Comments } from 'src/modules/blog/entities/comment.entity';

@Entity({ name: 'users' })
export class User extends EntityBase {
	@Column({ unique: true })
	username: string;

	@Column({ unique: true, nullable: true })
	phone: string;

	@Column({ unique: true, nullable: true })
	email: string;

	@Column({ nullable: true })
	password: string;

	@Column({ nullable: true })
	otpId: number;

	@OneToOne(() => OTP, otp => otp.user, { cascade: ['remove'], nullable: true })
	@JoinColumn({ name: 'otpId' })
	otp: OTP;

	@Column({ nullable: true })
	profileId: number;

	@OneToOne(() => Profile, prof => prof.user, { cascade: ['remove'] })
	@JoinColumn()
	profile: Profile;

	@OneToMany(() => Blog, blog => blog.author)
	blogs: Blog[];

	@OneToMany(() => Likes, Likes => Likes.user)
	likedBlogs: Likes[];

	@OneToMany(() => Bookmarks, bookmark => bookmark.user)
	bookmarkedBlogs: Bookmarks[];

	@OneToMany(() => Comments, comment => comment.user)
	comments: Comments[];

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}
