export interface Bot {
  id: string
  name: string
  trader: string
  exchange: string
  mode: string
  roi: number
  price: string
  followers: number
  avatar: string
}

export interface ListingForm {
  name: string
  price: number | null
  exchange: string
  mode: string
  minCapital: number | null
  roi: number | null
  winRate: number | null
  maxDrawdown: number | null
  profitFactor: number | null
  description: string
}
