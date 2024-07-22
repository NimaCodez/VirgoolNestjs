import { PrimaryGeneratedColumn } from "typeorm";

export class EntityBase {
    @PrimaryGeneratedColumn('increment')
    id: number;    
}