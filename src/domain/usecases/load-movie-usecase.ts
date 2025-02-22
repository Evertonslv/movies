import { MovieModel, Producer, ProducerList } from '@/domain/models'
import { MovieRepository } from '@/domain/ports'

export interface MovieUsecase {
  load: () => Promise<MovieUsecase.Result>
}

export namespace MovieUsecase {
  export type Result = ProducerList
}

export class LoadMovieUsecase implements MovieUsecase {
  private producersMap: Record<string, number[]>

  constructor(private readonly movieRepository: MovieRepository) { }

  async load(): Promise<MovieUsecase.Result> {
    this.producersMap = {}

    const movies = await this.movieRepository.load()
    await this.populateProducerStats(movies)

    const allIntervals = this.calculateAllIntervals()
    return {
      max: this.getIntervalResults(allIntervals, 'max'),
      min: this.getIntervalResults(allIntervals, 'min')
    }
  }

  private async populateProducerStats(movies: MovieModel[]): Promise<void> {
    const winningMovies = movies.filter(movie => movie.winner)

    for (const movie of winningMovies) {
      const producers = this.splitProducers(movie.producers)
      producers.forEach(producer => { this.addProducerYear(producer, movie.year) })
    }
  }

  private addProducerYear(producer: string, year: number): void {
    if (!producer) return
    if (!this.producersMap[producer]) this.producersMap[producer] = []
    this.producersMap[producer].push(year)
  }

  private calculateAllIntervals(): Producer[] {
    const allIntervals: Producer[] = []

    Object.entries(this.producersMap).forEach(([producer, years]) => {
      if (years.length < 2) return
      const sortedYears = [...years].sort((a, b) => a - b)
      for (let i = 1; i < sortedYears.length; i++) {
        allIntervals.push({
          producer,
          interval: sortedYears[i] - sortedYears[i - 1],
          previousWin: sortedYears[i - 1],
          followingWin: sortedYears[i]
        })
      }
    })

    return allIntervals
  }

  private getIntervalResults(allIntervals: Producer[], type: 'max' | 'min'): Producer[] {
    if (allIntervals.length === 0) return []

    const targetInterval = type === 'max'
      ? Math.max(...allIntervals.map(i => i.interval))
      : Math.min(...allIntervals.map(i => i.interval))

    return allIntervals
      .filter(i => i.interval === targetInterval)
      .map(({ producer, interval, previousWin, followingWin }) => ({
        producer,
        interval,
        previousWin,
        followingWin
      }))
      .sort((a, b) => a.producer.localeCompare(b.producer))
  }

  private splitProducers(producers: string): string[] {
    return producers.split(/\s*,\s*|\s+and\s+/i)
      .map(p => p.trim())
      .filter(p => p.length > 0)
  }
}
