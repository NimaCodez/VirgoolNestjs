import { EntityBase } from 'src/common/abstracts/base.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'otp' })
export class OTP extends EntityBase {
    @Column()
	code: string;

	@Column()
	expiresIn: Date;

	@Column()
	userId: number;

	@OneToOne(() => User, user => user.otp, { onDelete: 'CASCADE' })
	@JoinColumn({ name: 'userId' })
	user: User;
}
