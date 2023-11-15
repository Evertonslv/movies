import { ReadCsvUsecase } from '@/domain/usecases'
import { DbMovieRepository } from '@/infra/repositories'

import { connection } from '../../../ormconfig'

export async function readCsv(): Promise<void> {
  try {
    const filePath = 'database/data/movielist.csv'
    const movieRepository = new DbMovieRepository(connection)
    const csvReader = new ReadCsvUsecase(filePath, movieRepository)
    await csvReader.read()
  } catch (error) {
    console.error('Erro ao ler o arquivo CSV:', error)
  }
}
