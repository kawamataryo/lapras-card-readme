import * as core from '@actions/core'
import {updateReadme} from './lib/updateReadme'
import {rewriteReadmeToIncludeCardText} from './lib/rewriteReadmeToIncludeCardText'
import {fetchScore} from './lib/fetchScore'
import {fetchPrevReadmeContent} from './lib/fetchPrevReadmeContents'
import {getActionsParams} from './lib/getActionsParams'

async function run(): Promise<void> {
  try {
    const {
      shareId,
      readmeFile,
      theme,
      lang,
      cardType,
      cardWidth,
      token,
      showUpdateTime,
      isCenter,
      alternativeText
    } = getActionsParams()
    const readmeContent = await fetchPrevReadmeContent(token, readmeFile)
    const score = await fetchScore(shareId)

    let resolvedCardType = cardType
    if (cardType === 'tech' && score.eScoreDetails === undefined) {
      switch (lang) {
        case 'ja':
          core.warning(
            'CARD_TYPEにtechが指定されましたが、技術力スコアの内訳データが取得できなかったため、従来のカードにフォールバックします'
          )
          break
        case 'en':
        default:
          core.warning(
            'CARD_TYPE is set to "tech", but the tech score breakdown data is unavailable. Falling back to the default card.'
          )
          break
      }
      resolvedCardType = 'score'
    }

    const readme = rewriteReadmeToIncludeCardText(readmeContent.text, {
      shareId,
      score,
      theme,
      lang,
      cardType: resolvedCardType,
      cardWidth,
      showUpdateTime,
      isCenter,
      alternativeText
    })

    await updateReadme({ghToken: token, readme, sha: readmeContent.sha})
  } catch (error) {
    if (error instanceof Error) core.setFailed(error)
  }
}

run()
