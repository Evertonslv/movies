import { HttpRequest, HttpResponse } from '@/application/protocols'

export interface Controller {
  handle: (httpRequest?: HttpRequest) => Promise<HttpResponse>
}
