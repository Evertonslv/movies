import { Request, RequestHandler, Response } from 'express'

import { Controller, HttpRequest, HttpResponse } from '@/application/protocols'

type Adapter = (controller: Controller) => RequestHandler
export const adaptRoute: Adapter = controller => async (req: Request, res: Response): Promise<void> => {
  const httpRequest: HttpRequest = {
    body: req.body
  }
  const httpResponse: HttpResponse = await controller.handle(httpRequest)
  res.status(httpResponse.statusCode).json(httpResponse.body)
}
