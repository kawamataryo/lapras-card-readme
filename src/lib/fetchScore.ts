import { PublicApiResponse, Score } from '../types/types'
import fetch from 'node-fetch'


export const fetchScore = async (shareId: string): Promise<Score> => {
  const res = await fetch(`https://lapras.com/public/${shareId}.json`)
  const response = (await res.json()) as PublicApiResponse

  return {
    eScore: response.e_score,
    bScore: response.b_score,
    iScore: response.i_score
  }
}
