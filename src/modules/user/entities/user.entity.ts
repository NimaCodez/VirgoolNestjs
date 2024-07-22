import { EntityBase } from "src/common/abstracts/base.entity";
import { Column, CreateDateColumn, Entity, UpdateDateColumn } from "typeorm";

@Entity({ name: "users" })
export class User extends EntityBase {
    @Column({ unique: true })
    username: string;

    @Column({ unique: true })
    phoneNumber: string;
    
    @Column({ unique: true })
    email: string;

    @Column({ nullable: true })
    password: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
