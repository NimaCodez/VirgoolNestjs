import { EntityBase } from "src/common/abstracts/base.entity";
export declare class User extends EntityBase {
    username: string;
    phoneNumber: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}
