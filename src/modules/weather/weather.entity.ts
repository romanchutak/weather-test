import { IsNotEmpty } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Weather {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('int')
    userId: number;

    @IsNotEmpty()
    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP'
    })
    actionTime: number;

    @IsNotEmpty()
    @Column({
        nullable: false
    })
    requestResult: number;

    @IsNotEmpty()
    @Column({
        default: null
    })
    tempC: number;

    @ManyToOne(() => User, (user) => user.weathers, {
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
    })
    user: User;
}
