import { MARK } from '../constant'
import { Language, Score, Theme } from '../types/types'

const getAlternativeText = ({ alternativeText, lang, shareId, score }: { alternativeText: string, lang: Language, shareId: string, score: Score }): string => {
  let text: string
  if (alternativeText === '') {
    switch (lang) {
      case 'ja':
        text = `${shareId}のLAPRASでのスコアは次の通りです: エンジニアリング: ${score.eScore} / 5.0, ビジネス: ${score.bScore} / 5.0, インフルエンス: ${score.iScore} / 5.0.`
        break
      case 'en':
      default:
        text = `${shareId}'s scores on LAPRAS are as follows: Engineering: ${score.eScore} out of 5.0, Business: ${score.bScore} out of 5.0, Influence: ${score.iScore} out of 5.0.`
        break
    }
  } else {
    text = alternativeText
  }
  return text
}

const createCardText = ({
  shareId,
  score,
  theme,
  lang,
  cardWidth,
  showUpdateTime,
  isCenter,
  alternativeText,
}: {
  shareId: string
  score: Score
  theme: Theme
  lang: Language
  cardWidth: string
  showUpdateTime: boolean
  isCenter: boolean,
  alternativeText: string,
}): string => {
  const imageUrl = `https://lapras-card-generator.vercel.app/api/svg?e=${
    score.eScore
  }&b=${score.bScore}&i=${score.iScore}&b1=${encodeURIComponent(
    theme.background.first
  )}&b2=${encodeURIComponent(theme.background.second)}&i1=${encodeURIComponent(
    theme.icon.first
  )}&i2=${encodeURIComponent(theme.icon.second)}&l=${lang}`

  const updateTime = showUpdateTime ? `  \nLast Updated on ${new Date().toLocaleString()}` : ''

  const _alternativeText: string = getAlternativeText({ alternativeText, lang, shareId, score })

  return `<a href="https://lapras.com/public/${shareId}" target="_blank" rel="noopener noreferrer"><img ${isCenter ? 'align="center"' : ''} alt="${_alternativeText}" src="${imageUrl}" width="${cardWidth}" ></a>${updateTime}`
}

export const rewriteReadmeToIncludeCardText = (
  readme: string,
  {
    shareId,
    score,
    theme,
    lang,
    cardWidth,
    showUpdateTime,
    isCenter,
    alternativeText,
  }: {
    shareId: string
    score: Score
    theme: Theme
    lang: Language
    cardWidth: string
    showUpdateTime: boolean
    isCenter: boolean,
    alternativeText: string,
  }
): string => {
  const markerPattern = new RegExp(`(${MARK.START})[\\s\\S]*(${MARK.END})`)
  if (!markerPattern.test(readme)) {
    switch (lang) {
      case 'ja':
        throw new Error(`Error: README.mdにカードを挿入するためのMARKER文字列が見つかりませんでした。"${MARK.START + MARK.END}" をREADME.mdに追加してください`)
      case 'en':
      default:
        throw new Error(`Error: The MARKER string to insert the card into README.md could not be found. Please add "${MARK.START + MARK.END}" to README.md`)
    }
  }

  const cardText = createCardText({ shareId, score, theme, lang, cardWidth, showUpdateTime, isCenter, alternativeText })
  return readme.replace(markerPattern, `$1\n${cardText}\n$2`)
}
