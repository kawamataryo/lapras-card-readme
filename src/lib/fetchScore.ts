import { PublicApiResponse, Score } from '../types/types'
import fetch from 'node-fetch'
import { mapResponseToScore } from './mapResponseToScore'

export const fetchScore = async (shareId: string): Promise<Score> => {
  const res = await fetch(`https://lapras.com/public/${shareId}.json`)
  const response = (await res.json()) as PublicApiResponse

  return mapResponseToScore(response)
}
