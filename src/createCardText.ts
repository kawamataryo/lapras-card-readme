import {Language, Score, Theme} from './types/types'

export const createCardText = ({
  shareId,
  score,
  theme,
  lang
}: {
  shareId: string
  score: Score
  theme: Theme
  lang: Language
}): string => {
  const imageUrl = `https://lapras-card-generator.vercel.app/api/svg?e=${
    score.eScore
  }&b=${score.bScore}&i=${score.iScore}&b1=${encodeURIComponent(
    theme.background.first
  )}&b2=${encodeURIComponent(theme.background.second)}&i1=${encodeURIComponent(
    theme.icon.first
  )}&i2=${encodeURIComponent(theme.icon.second)}&l=${lang}`

  return `<a href="https://lapras.com/public/${shareId}" target="_blank" rel="noopener noreferrer"><img src="${imageUrl}" width="300" ></a>`
}
