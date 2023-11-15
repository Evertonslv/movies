export class ProducerStats {
  public interval = 0
  public followingWin = 0

  constructor(
    public producer: string,
    public previousWin: number
  ) {}

  static create(producer: string, previousWin: number): ProducerStats {
    return new ProducerStats(producer, previousWin)
  }

  updateProducer(previousWin: number, max: boolean): void {
    const newInterval = previousWin - this.followingWin
    if ((max && newInterval > this.interval) || (!max && newInterval < this.interval)) {
      this.interval = newInterval
      this.previousWin = this.followingWin
      this.followingWin = previousWin
    }
  }

  addFollowing(followingWin: number): void {
    this.interval = followingWin - this.previousWin
    this.followingWin = followingWin
  }
}
