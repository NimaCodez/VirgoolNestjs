import { EntityBase } from "src/common/abstracts/base.entity";
import { Column, Entity } from "typeorm";

@Entity({ name: 'categories' })
export class Category extends EntityBase {
    @Column()
    name: string;

    @Column()
    slug: string;
}
