import { DataSource } from 'typeorm'

import { AddMovieRepository, LoadMovieRepository, MovieRepository } from '@/domain/ports'
import { Movie } from '@/infra/entities'

import { connection } from '../../../ormconfig'

export class DbMovieRepository implements MovieRepository {
  constructor(private readonly connection: DataSource) {
  }

  async load(): Promise<LoadMovieRepository.Result> {
    return await this.connection
      .getRepository(Movie)
      .createQueryBuilder('movie')
      .orderBy('movie.year')
      .getMany()
  }

  async add(params: AddMovieRepository.Params): Promise<void> {
    await this.connection
      .createQueryBuilder()
      .insert()
      .into(Movie)
      .values(params).execute()
  }

  async clear(): Promise<void> {
    await connection.getRepository(Movie).clear()
  }
}
