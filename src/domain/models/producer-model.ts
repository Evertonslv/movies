export interface Producer {
  producer: string
  interval: number
  previousWin: number
  followingWin: number
}

export interface ProducerList {
  max: Producer[]
  min: Producer[]
}
