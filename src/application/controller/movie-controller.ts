import { ok, serverError } from '@/application/helpers'
import { Controller, HttpResponse } from '@/application/protocols'
import { MovieUsecase } from '@/domain/usecases'

export class MovieController implements Controller {
  constructor(private readonly movieUsecase: MovieUsecase) {
  }

  async handle(): Promise<HttpResponse> {
    try {
      const movieModel = await this.movieUsecase.load()
      return ok(movieModel)
    } catch (e) {
      return serverError(e as Error)
    }
  }
}
