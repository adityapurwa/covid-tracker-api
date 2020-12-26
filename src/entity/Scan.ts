import {BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Scan extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: 512})
    nik: string;

    @Column()
    name: string;

    @Column({type: 'date'})
    birthday: Date;

    @Column({type: 'varchar', length: 512})
    birthplace: string;

    @Column({type: 'varchar', length: 512})
    address1: string;

    @Column({type: 'varchar', length: 512})
    address2: string;

    @Column({type: 'varchar', length: 512})
    city: string;

    @Column({type: 'varchar', length: 512})
    province: string;

    @CreateDateColumn({type: 'timestamp'})
    createdAt: Date;


}
