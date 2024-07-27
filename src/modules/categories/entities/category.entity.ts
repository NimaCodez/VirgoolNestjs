import { EntityBase } from "src/common/abstracts/base.entity";
import { Column, Entity } from "typeorm";

@Entity({ name: 'categories' })
export class Category extends EntityBase {
    @Column()
    title: string;

    @Column({ nullable: true })
    priority: number;
}
