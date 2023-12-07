import { Entity, Column, PrimaryGeneratedColumn, OneToMany, BeforeInsert, AfterLoad, BeforeUpdate } from 'typeorm';
import { Weather } from '../weather/weather.entity';
import * as bcrypt from 'bcryptjs';
import { Exclude } from 'class-transformer';
import { v4 } from 'uuid';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: false,
        unique: true
    })
    login: string;

    @Exclude({ toPlainOnly: true })
    @Column({
        nullable: false,
    })
    password: string;

    @Exclude({ toPlainOnly: true })
    previousPassword: string;

    @Column({
        nullable: false
    })
    fio: string;

    @Column()
    apiToken: string;

    @OneToMany(() => Weather, (weather) => weather.user)
    weathers: Weather[];

    @AfterLoad()
    public loadPreviousPassword(): void {
        this.previousPassword = this.password;
    }

    @BeforeInsert()
    @BeforeUpdate()
    async setPassword() {
        if (this.previousPassword !== this.password && this.password) {
            this.password = await bcrypt.hash(this.password, 6);
        }
    }

    @BeforeInsert()
    setApiToken() {
        this.apiToken = v4();
    }
}
