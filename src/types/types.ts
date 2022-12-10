export type Theme = {
  icon: {
    first: string
    second: string
  }
  background: {
    first: string
    second: string
  }
}

export type Score = {
  eScore: number
  bScore: number
  iScore: number
}

export type Language = 'ja' | 'en'

export type PublicApiResponse = {
  name: string
  e_score: number
  b_score: number
  i_score: number
}
