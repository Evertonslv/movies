import { ProducerStats } from '@/domain/entities'
import { Producer, ProducerList } from '@/domain/models'
import { MovieRepository } from '@/domain/ports'
import { MovieUsecase } from '@/domain/usecases'

export class LoadMovieUsecase implements MovieUsecase {
  private producerMaxStats: Record<string, ProducerStats>
  private producerMinStats: Record<string, ProducerStats>

  constructor(private readonly movieRepository: MovieRepository) {
  }

  async load(): Promise<MovieUsecase.Result> {
    await this.populateProducerStats()
    const producersMax = this.filterProducersByInterval(this.producerMaxStats)
    const producersMin = this.filterProducersByInterval(this.producerMinStats)
    return this.getProducers(producersMax, producersMin)
  }

  private async populateProducerStats(): Promise<void> {
    this.producerMaxStats = {}
    this.producerMinStats = {}
    const movies = await this.movieRepository.load()

    for (const movie of movies) {
      const producers = this.splitProducers(movie.producers)
      this.updateProducerStats(producers, movie.year)
    }
  }

  private filterProducersByInterval(producerStats: Record<string, ProducerStats>): Producer[] {
    return Object.values(producerStats).filter((producer) => producer.interval > 0)
  }

  private splitProducers(producerString: string): string[] {
    return producerString.split(/,| and | And | AND /i).map((p) => p.trim())
  }

  private getProducers(producersMax: Producer[], producersMin: Producer[]): ProducerList {
    const maxProducers = this.getMax(producersMax)
    const minProducers = this.getMin(producersMin)
    return { max: maxProducers, min: minProducers }
  }

  private getMax(producers: Producer[]): Producer[] {
    const interval = Math.max(...producers.map((producer) => producer.interval))
    return this.getTopProducersByInterval(producers, interval)
  }

  private getMin(producers: Producer[]): Producer[] {
    const interval = Math.min(...producers.map((producer) => producer.interval))
    return this.getTopProducersByInterval(producers, interval)
  };

  private updateProducerStats(producers: string[], previousWin: number): void {
    producers.forEach((producer) => {
      if (producer) {
        this.addProducerMax(producer, previousWin)
        this.addProducerMin(producer, previousWin)
      }
    })
  }

  private getTopProducersByInterval(producers: Producer[], interval: number): Producer[] {
    return producers
      .filter((producer) => producer.interval === interval)
      .sort((a, b) => a.producer.localeCompare(b.producer))
  }

  private addProducerMax(producer: string, previousWin: number): void {
    this.addProducerStats(producer, this.producerMaxStats, previousWin, true)
  }

  private addProducerMin(producer: string, previousWin: number): void {
    this.addProducerStats(producer, this.producerMinStats, previousWin, false)
  }

  private addProducerStats(producer: string, stats: Record<string, ProducerStats>, previousWin: number, max: boolean): void {
    const currentStats = stats[producer] || ProducerStats.create(producer, previousWin)

    if (currentStats.interval === 0) {
      currentStats.addFollowing(previousWin)
    } else {
      currentStats.updateProducer(previousWin, max)
    }

    stats[producer] = currentStats
  }
}
