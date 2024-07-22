import { EntityBase } from "src/common/abstracts/base.entity";
import { Column, Entity } from "typeorm";

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
}