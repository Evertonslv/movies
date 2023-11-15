import { MovieModel } from '@/domain/models'

export interface MovieRepository {
  load: () => Promise<LoadMovieRepository.Result>
  add: (params: AddMovieRepository.Params) => Promise<void>
  clear: () => Promise<void>
}

export namespace LoadMovieRepository {
  export type Result = MovieModel[]
}

export namespace AddMovieRepository {
  export type Params = MovieModel
}
