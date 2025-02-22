import express, { Express } from 'express'

import setupMiddlewares from '@/main/config/middlewares'
import setupSwagger from '@/main/config/swagger'
import setupMovieRoutes from '@/main/routes/movie-routes'

export const setupApp = (): Express => {
  const app = express()
  setupSwagger(app)
  setupMiddlewares(app)
  setupMovieRoutes(app)
  return app
}
