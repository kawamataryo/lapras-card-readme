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
  eScoreDetails?: EScoreDetails
}

export type EScoreDetails = {
  scoreVersion: string
  eScore: number
  eScorePercentile: number
  invertEScorePercentile: number
  githubScore: number
  githubScorePercentile: number
  techArticleScore: number
  techArticleScorePercentile: number
  techEventScore: number
  techEventScorePercentile: number
  tagCountScore: number
  tagCountScorePercentile: number
}

export type Language = 'ja' | 'en'

export type CardType = 'score' | 'tech'

export type PublicApiResponse = {
  name: string
  e_score: number
  b_score: number
  i_score: number
  e_score_details?: {
    score_version: string
    e_score: number
    e_score_percentile: number
    invert_e_score_percentile: number
    github_score: number
    github_score_percentile: number
    tech_article_score: number
    tech_article_score_percentile: number
    tech_event_score: number
    tech_event_score_percentile: number
    tag_count_score: number
    tag_count_score_percentile: number
  }
}
