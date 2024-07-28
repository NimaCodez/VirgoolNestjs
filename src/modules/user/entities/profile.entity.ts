import { EntityBase } from 'src/common/abstracts/base.entity';
import { Column, Entity, OneToOne } from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'profiles' })
export class Profile extends EntityBase {
	@Column()
	nickname: string;

	@Column({ nullable: true })
	bio: string;

	@Column({ nullable: true })
	avatar: string;

	@Column({ nullable: true })
	bgImage: string;

	@Column({ nullable: true })
	gender: number;

	@Column({ nullable: true })
	birthday: Date;

	@Column({ nullable: true })
	linkedin: string;

	@Column({ nullable: true })
	twitter: string;

	@Column({ nullable: true })
	userId: number;

	@OneToOne(() => User, user => user.profile, { onDelete: 'CASCADE' })
	user: User;
}
