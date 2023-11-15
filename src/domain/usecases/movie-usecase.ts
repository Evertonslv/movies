import { ProducerList } from '@/domain/models'

export interface MovieUsecase {
  load: () => Promise<MovieUsecase.Result>
}

export namespace MovieUsecase {
  export type Result = ProducerList
}
