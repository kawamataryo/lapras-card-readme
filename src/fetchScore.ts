import {PublicApiResponse, Score} from './types/types'

export const fetchScore = async (scoreId: string): Promise<Score> => {
  // const res = await fetch(`https://lapras.com/public/${scoreId}.json`)
  // const response = (await res.json()) as PublicApiResponse

  // return {
  //   eScore: response.e_score,
  //   bScore: response.b_score,
  //   iScore: response.i_score
  // }
  return {
    eScore: 4.2,
    bScore: 3.2,
    iScore: 4.3
  }
}
