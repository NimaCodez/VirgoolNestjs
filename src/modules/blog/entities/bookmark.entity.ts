import { EntityBase } from "src/common/abstracts/base.entity";
import { User } from "src/modules/user/entities/user.entity";
import { Column, Entity, ManyToMany, ManyToOne } from "typeorm";
import { Blog } from "./blog.entity";

@Entity({ name: 'bookmarks' })
export class Bookmarks extends EntityBase {
    @Column()
    blogId: number;

    @Column()
    userId: number;

    @ManyToMany(() => User, user => user.bookmarkedBlogs, { onDelete: 'CASCADE'})
    user: User;

    @ManyToOne(() => Blog, blog => blog.bookmarks, { onDelete: 'CASCADE' })
    blog: Blog;
}