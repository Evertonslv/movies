import { Express } from 'express'
import request from 'supertest'

import { MovieRepository } from '@/domain/ports'
import { ReadCsvUsecase } from '@/domain/usecases'
import { DbMovieRepository } from '@/infra/repositories'
import { setupApp } from '@/main/config/app'

import { connection } from '../ormconfig'

const readCsv = async (movieRepository: MovieRepository): Promise<void> => {
  const dataPath = 'database/data/movielist.csv'
  const csvReader = new ReadCsvUsecase(dataPath, movieRepository)
  await csvReader.read()
}

describe('Integration Test: /api', () => {
  let movieRepository: MovieRepository
  let app: Express

  beforeAll(async () => {
    app = setupApp()
    await connection.initialize()
    movieRepository = new DbMovieRepository(connection)
    await movieRepository.clear()
  })

  afterEach(async () => {
    await movieRepository.clear()
  })

  test('should return producer stats two max and two min', async () => {
    await readCsv(movieRepository)

    const response = await request(app).get('/api')
    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      max: [
        {
          producer: 'Matthew Vaughn',
          interval: 13,
          previousWin: 2002,
          followingWin: 2015
        }
      ],
      min: [
        {
          producer: 'Joel Silver',
          interval: 1,
          previousWin: 1990,
          followingWin: 1991
        }
      ]
    })
  })
})
