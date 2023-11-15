import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity('movies')
export class Movie {
  @PrimaryColumn('uuid')
    id: string

  @Column('int')
    year: number

  @Column('varchar')
    title: string

  @Column('varchar')
    studios: string

  @Column('varchar')
    producers: string

  @Column('boolean')
    winner: boolean
}
