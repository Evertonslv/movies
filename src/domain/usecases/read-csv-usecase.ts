import csv from 'csv-parser'
import * as fs from 'fs'
import { v4 as uuid } from 'uuid'

import { MovieModel } from '@/domain/models'
import { MovieRepository } from '@/domain/ports'
import { CsvUsecase } from '@/domain/usecases'

export class ReadCsvUsecase implements CsvUsecase {
  constructor(private readonly filePath: string, private readonly movieRepository: MovieRepository) {
  }

  async read(): Promise<void> {
    if (!fs.existsSync(this.filePath)) {
      return
    }

    await this.movieRepository.clear()

    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(this.filePath)
      const csvStream = csv({ separator: ';' })

      stream.pipe(csvStream)
        .on('data', (data: any) => {
          void this.insertMovie(data)
        })
        .on('end', () => {
          resolve()
        })
        .on('error', (error: Error) => {
          reject(error)
        })
    })
  }

  private async insertMovie(data: any): Promise<void> {
    const movie: MovieModel = {
      id: uuid(),
      year: parseInt(data.year, 10),
      title: data.title.trim(),
      studios: data.studios.trim(),
      producers: data.producers.trim(),
      winner: data.winner.trim().toLowerCase() === 'yes'
    }

    await this.movieRepository.add(movie)
  }
}
