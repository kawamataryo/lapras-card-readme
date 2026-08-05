import { PublicApiResponse, Score } from '../types/types'

export const mapResponseToScore = (response: PublicApiResponse): Score => {
  return {
    eScore: response.e_score,
    bScore: response.b_score,
    iScore: response.i_score,
    ...(response.e_score_details !== undefined
      ? {
          eScoreDetails: {
            scoreVersion: response.e_score_details.score_version,
            eScore: response.e_score_details.e_score,
            eScorePercentile: response.e_score_details.e_score_percentile,
            invertEScorePercentile: response.e_score_details.invert_e_score_percentile,
            githubScore: response.e_score_details.github_score,
            githubScorePercentile: response.e_score_details.github_score_percentile,
            techArticleScore: response.e_score_details.tech_article_score,
            techArticleScorePercentile: response.e_score_details.tech_article_score_percentile,
            techEventScore: response.e_score_details.tech_event_score,
            techEventScorePercentile: response.e_score_details.tech_event_score_percentile,
            tagCountScore: response.e_score_details.tag_count_score,
            tagCountScorePercentile: response.e_score_details.tag_count_score_percentile
          }
        }
      : {})
  }
}
