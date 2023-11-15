import { Express, Router } from 'express'

import { adaptRoute } from '@/main/adapters'
import { makeMovieController } from '@/main/factories'

export default (app: Express): void => {
  const router = Router()
  app.use('/api', router)
  router.get('/', adaptRoute(makeMovieController()))
}
