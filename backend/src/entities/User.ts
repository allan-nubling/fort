import {
    BeforeInsert,
    BeforeUpdate,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm'

import Crypto from '@utils/Crypto'

@Entity('user')
export class User {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column('varchar', { length: 512, nullable: false })
    name: string

    @Column('varchar', { length: 1024, nullable: false, select: false })
    password: string

    @Column('varchar', { length: 512, nullable: false, unique: true })
    email: string

    @CreateDateColumn({ select: false })
    createdAt: Date

    @UpdateDateColumn({ select: false })
    updatedAt: Date

    @BeforeInsert()
    @BeforeUpdate()
    async encryptPassword(): Promise<void> {
        if (this.password) {
            this.password = await Crypto.hashPassword(this.password)
        }
    }

    async verifyPassword(password: string): Promise<boolean> {
        return Crypto.verifyPassword(password, this.password)
    }
}
