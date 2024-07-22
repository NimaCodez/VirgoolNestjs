import { EntityBase } from 'src/common/abstracts/base.entity';
import { User } from './user.entity';
export declare class OTP extends EntityBase {
    code: string;
    expiresIn: Date;
    userId: number;
    user: User;
}
