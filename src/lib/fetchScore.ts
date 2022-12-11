import {PublicApiResponse, Score} from '../types/types'

export const fetchScore = async (shareId: string): Promise<Score> => {
  try {
    const res = await fetch(`https://lapras.com/public/${shareId}.json`)
    const response = (await res.json()) as PublicApiResponse

    return {
      eScore: response.e_score,
      bScore: response.b_score,
      iScore: response.i_score
    }
  } catch {
    // TODO: remove this fallback
    return {
      eScore: 4.26,
      bScore: 3.48,
      iScore: 4.05
    }
  }
}
