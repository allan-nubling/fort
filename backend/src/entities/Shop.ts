import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

import { State } from './State'

@Entity('shop')
export class Shop {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column('varchar', { length: 512, nullable: false })
    name: string

    @Column('varchar', { length: 1024, nullable: false })
    street: string

    @ManyToOne(() => State, { onDelete: 'CASCADE' })
    @JoinColumn()
    state: State
}
