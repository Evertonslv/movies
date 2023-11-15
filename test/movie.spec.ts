import { Express } from 'express'
import request from 'supertest'

import { MovieRepository } from '@/domain/ports'
import { ReadCsvUsecase } from '@/domain/usecases/read-csv-usecase'
import { DbMovieRepository } from '@/infra/repositories'
import { setupApp } from '@/main/config/app'

import { connection } from '../ormconfig'

const readCsv = async (file: string, movieRepository: MovieRepository): Promise<void> => {
  const dataPath = 'test/database/data'
  const csvReader = new ReadCsvUsecase(`${dataPath}/${file}`, movieRepository)
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

  test('should return 200 status', async () => {
    await readCsv('test-1.csv', movieRepository)
    const response = await request(app).get('/api')
    expect(response.status).toBe(200)
  })

  test('should return producer stats two max and two min', async () => {
    await readCsv('test-2.csv', movieRepository)

    const response = await request(app).get('/api')
    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      max: [
        {
          producer: 'Jennings Lang',
          interval: 10,
          previousWin: 1980,
          followingWin: 1990
        },
        {
          producer: 'William Frye',
          interval: 10,
          previousWin: 1985,
          followingWin: 1995
        }
      ],
      min: [
        {
          producer: 'Allan Carr',
          interval: 1,
          previousWin: 1980,
          followingWin: 1981
        },
        {
          producer: 'Steve Shagan',
          interval: 1,
          previousWin: 1981,
          followingWin: 1982
        }
      ]
    })
  })

  test('should return producer stats three max and two min', async () => {
    await readCsv('test-3.csv', movieRepository)

    const response = await request(app).get('/api')
    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      max: [
        {
          producer: 'Jennings Lang',
          interval: 10,
          previousWin: 1980,
          followingWin: 1990
        },
        {
          producer: 'Stanley Donen',
          interval: 10,
          followingWin: 1998,
          previousWin: 1988
        },
        {
          producer: 'William Frye',
          interval: 10,
          previousWin: 1988,
          followingWin: 1998
        }
      ],
      min: [
        {
          producer: 'Allan Carr',
          interval: 1,
          previousWin: 1984,
          followingWin: 1985
        },
        {
          producer: 'Steve Shagan',
          interval: 1,
          previousWin: 1981,
          followingWin: 1982
        }
      ]
    })
  })

  test('should return producer stats one max and two min', async () => {
    await readCsv('test-4.csv', movieRepository)

    const response = await request(app).get('/api')
    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      max: [
        {
          producer: 'Allan Carr',
          interval: 4,
          previousWin: 1980,
          followingWin: 1984
        }
      ],
      min: [
        {
          producer: 'Allan Carr',
          interval: 1,
          previousWin: 1984,
          followingWin: 1985
        },
        {
          producer: 'Steve Shagan',
          interval: 1,
          previousWin: 1981,
          followingWin: 1982
        }
      ]
    })
  })

  test('should return producer stats two max and two min', async () => {
    await readCsv('test-5.csv', movieRepository)

    const response = await request(app).get('/api')
    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      max: [
        {
          producer: 'Allan Carr',
          interval: 1,
          previousWin: 1984,
          followingWin: 1985
        },
        {
          producer: 'Steve Shagan',
          interval: 1,
          previousWin: 1981,
          followingWin: 1982
        }
      ],
      min: [
        {
          producer: 'Allan Carr',
          interval: 1,
          previousWin: 1984,
          followingWin: 1985
        },
        {
          producer: 'Steve Shagan',
          interval: 1,
          previousWin: 1981,
          followingWin: 1982
        }
      ]
    })
  })

  test('should return producer stats empty', async () => {
    await readCsv('test-6.csv', movieRepository)

    const response = await request(app).get('/api')
    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      max: [],
      min: []
    })
  })

  test('should return producer stats empty when file not exist', async () => {
    await readCsv('test-7.csv', movieRepository)

    const response = await request(app).get('/api')
    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      max: [],
      min: []
    })
  })

  test('should return producer stats one max and one min', async () => {
    await readCsv('test-8.csv', movieRepository)

    const response = await request(app).get('/api')
    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      max: [
        {
          producer: 'Allan Carr',
          interval: 1,
          previousWin: 1980,
          followingWin: 1981
        }
      ],
      min: [
        {
          producer: 'Allan Carr',
          interval: 1,
          previousWin: 1980,
          followingWin: 1981
        }
      ]
    })
  })

  test('should return producer stats one max and one min', async () => {
    await readCsv('test-9.csv', movieRepository)

    const response = await request(app).get('/api')
    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      max: [
        {
          producer: 'Allan Carr',
          interval: 4,
          previousWin: 1980,
          followingWin: 1984
        }
      ],
      min: [
        {
          producer: 'Allan Carr',
          interval: 1,
          previousWin: 1984,
          followingWin: 1985
        }
      ]
    })
  })

  test('should return producer stats one max and one min', async () => {
    await readCsv('test-10.csv', movieRepository)

    const response = await request(app).get('/api')
    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      max: [
        {
          producer: 'Allan Carr',
          interval: 4,
          previousWin: 1980,
          followingWin: 1984
        }
      ],
      min: [
        {
          producer: 'Allan Carr',
          interval: 2,
          previousWin: 1984,
          followingWin: 1986
        }
      ]
    })
  })
})
