import { EntityBase } from "src/common/abstracts/base.entity";
import { User } from "src/modules/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany } from "typeorm";
import { Blog } from "./blog.entity";

@Entity({ name: 'comments' })
export class Comments extends EntityBase {
    @Column()
    blogId: number;

    @Column()
    userId: number;

    @Column()
    parentId: number;

    @ManyToMany(() => User, user => user.comments, { onDelete: 'CASCADE'})
    user: User;

    @ManyToOne(() => Blog, blog => blog.comments, { onDelete: 'CASCADE' })
    blog: Blog;

    @ManyToOne(() => Comments, comment => comment.children, {onDelete: 'CASCADE'})
    parent: Comments;

    @OneToMany(() => Comments, comment => comment.parent)
    @JoinColumn({ name: 'parent'})
    children: Comments[];
    
    @Column({ type: 'text', nullable: false })
    content: string;

    @Column({ default: true })
    accepted: boolean;
    
    @CreateDateColumn()
    createdAt: Date;
}