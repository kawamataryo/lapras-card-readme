import {MARK} from '../constant'
import {Language, Score, Theme} from '../types/types'

const createCardText = ({
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

  return `<a href="https://lapras.com/public/${shareId}" target="_blank" rel="noopener noreferrer"><img src="${imageUrl}" width="400" ></a>`
}

export const rewriteReadmeToIncludeCardText = (
  readme: string,
  {
    shareId,
    score,
    theme,
    lang
  }: {
    shareId: string
    score: Score
    theme: Theme
    lang: Language
  }
): string => {
  const re = new RegExp(`(${MARK.START})[\\s\\S]*(${MARK.END})`)
  const cardText = createCardText({shareId, score, theme, lang})
  return readme.replace(re, `$1\n${cardText}\n$2`)
}
