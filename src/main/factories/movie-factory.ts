import { MovieController } from '@/application/controller'
import { Controller } from '@/application/protocols'
import { LoadMovieUsecase } from '@/domain/usecases'
import { DbMovieRepository } from '@/infra/repositories'

import { connection } from '../../../ormconfig'

export const makeMovieController = (): Controller => {
  const movieRepository = new DbMovieRepository(connection)
  const movieUsecase = new LoadMovieUsecase(movieRepository)
  return new MovieController(movieUsecase)
}
