import { MARK } from '../constant'
import { CardType, Language, Score, Theme } from '../types/types'

const getAlternativeText = ({
  alternativeText,
  lang,
  shareId,
  score,
  cardType
}: {
  alternativeText: string
  lang: Language
  shareId: string
  score: Score
  cardType: CardType
}): string => {
  let text: string
  if (alternativeText === '') {
    if (cardType === 'tech' && score.eScoreDetails !== undefined) {
      const d = score.eScoreDetails
      switch (lang) {
        case 'ja':
          text = `${shareId}のLAPRASでの技術力スコアは${score.eScore} / 5.0（エンジニアの上位${d.invertEScorePercentile.toFixed(
            2
          )}%）。内訳: GitHub ${d.githubScore}、技術記事 ${d.techArticleScore}、技術イベント ${d.techEventScore}、タグ個数 ${d.tagCountScore}。`
          break
        case 'en':
        default:
          text = `${shareId}'s tech score on LAPRAS is ${score.eScore} out of 5.0 (top ${d.invertEScorePercentile.toFixed(
            2
          )}% of engineers). Breakdown: GitHub ${d.githubScore}, Tech articles ${d.techArticleScore}, Tech events ${d.techEventScore}, Tag count ${d.tagCountScore}.`
          break
      }
    } else {
      switch (lang) {
        case 'ja':
          text = `${shareId}のLAPRASでのスコアは次の通りです: エンジニアリング: ${score.eScore} / 5.0, ビジネス: ${score.bScore} / 5.0, インフルエンス: ${score.iScore} / 5.0.`
          break
        case 'en':
        default:
          text = `${shareId}'s scores on LAPRAS are as follows: Engineering: ${score.eScore} out of 5.0, Business: ${score.bScore} out of 5.0, Influence: ${score.iScore} out of 5.0.`
          break
      }
    }
  } else {
    text = alternativeText
  }
  return text
}

const buildImageUrl = ({ score, theme, lang, cardType }: { score: Score; theme: Theme; lang: Language; cardType: CardType }): string => {
  const themeQuery = `b1=${encodeURIComponent(theme.background.first)}&b2=${encodeURIComponent(
    theme.background.second
  )}&i1=${encodeURIComponent(theme.icon.first)}&i2=${encodeURIComponent(theme.icon.second)}&l=${lang}`

  if (cardType === 'tech' && score.eScoreDetails !== undefined) {
    const d = score.eScoreDetails
    return `https://lapras-card-generator.vercel.app/api/svg?type=tech&e=${score.eScore}&ep=${d.invertEScorePercentile.toFixed(
      2
    )}&g=${d.githubScore}&ta=${d.techArticleScore}&te=${d.techEventScore}&tg=${d.tagCountScore}&${themeQuery}`
  }

  return `https://lapras-card-generator.vercel.app/api/svg?e=${score.eScore}&b=${score.bScore}&i=${score.iScore}&${themeQuery}`
}

const createCardText = ({
  shareId,
  score,
  theme,
  lang,
  cardType,
  cardWidth,
  showUpdateTime,
  isCenter,
  alternativeText,
}: {
  shareId: string
  score: Score
  theme: Theme
  lang: Language
  cardType: CardType
  cardWidth: string
  showUpdateTime: boolean
  isCenter: boolean,
  alternativeText: string,
}): string => {
  const imageUrl = buildImageUrl({ score, theme, lang, cardType })

  const updateTime = showUpdateTime ? `  \nLast Updated on ${new Date().toLocaleString()}` : ''

  const _alternativeText: string = getAlternativeText({ alternativeText, lang, shareId, score, cardType })

  return `<p ${isCenter ? 'align="center"' : ''}><a href="https://lapras.com/public/${shareId}" target="_blank" rel="noopener noreferrer"><img alt="${_alternativeText}" src="${imageUrl}" width="${cardWidth}" ></a>${updateTime}</p>`
}

export const rewriteReadmeToIncludeCardText = (
  readme: string,
  {
    shareId,
    score,
    theme,
    lang,
    cardType,
    cardWidth,
    showUpdateTime,
    isCenter,
    alternativeText,
  }: {
    shareId: string
    score: Score
    theme: Theme
    lang: Language
    cardType: CardType
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

  const cardText = createCardText({ shareId, score, theme, lang, cardType, cardWidth, showUpdateTime, isCenter, alternativeText })
  return readme.replace(markerPattern, `$1\n${cardText}\n$2`)
}
