import { EntityBase } from 'src/common/abstracts/base.entity';
import { Column, Entity, OneToOne } from 'typeorm';
import { User } from './user.entity';
import { Gender } from '../enums/gender.enum';

@Entity({ name: 'profiles' })
export class Profile extends EntityBase {
	@Column({ unique: true })
	nickname: string;

	@Column({ nullable: true })
	bio: string;

	@Column({ nullable: true })
	avatar: string;

	@Column({ nullable: true })
	bgImage: string;

	@Column({ type: String, enum: Gender, nullable: true })
	gender: string;

	@Column({ nullable: true })
	birthday: Date;

	@Column({ unique: true, default: '', nullable: true })
	linkedin: string;

	@Column({ unique: true, default: '', nullable: true })
	twitter: string;

	@Column({ nullable: true })
	userId: number;

	@OneToOne(() => User, user => user.profile, { onDelete: 'CASCADE' })
	user: User;
}
