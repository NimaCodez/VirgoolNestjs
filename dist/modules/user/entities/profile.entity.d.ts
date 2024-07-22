import { EntityBase } from "src/common/abstracts/base.entity";
export declare class Profile extends EntityBase {
    nickname: string;
    bio: string;
    avatar: string;
    bgImage: string;
    gender: number;
    birthday: Date;
    linkedin: string;
    twitter: string;
}
