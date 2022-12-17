import * as core from '@actions/core'
import {updateReadme} from './lib/updateReadme'
import {rewriteReadmeToIncludeCardText} from './lib/rewriteReadmeToIncludeCardText'
import {fetchScore} from './lib/fetchScore'
import {Language, Theme} from './types/types'
import {fetchPrevReadmeContent} from './lib/fetchPrevReadmeContents'

async function run(): Promise<void> {
  try {
    const shareId = core.getInput('SHARE_ID')
    const theme: Theme = {
      icon: {
        first: core.getInput('ICON_FIRST'),
        second: core.getInput('ICON_SECOND')
      },
      background: {
        first: core.getInput('BACKGROUND_FIRST'),
        second: core.getInput('BACKGROUND_SECOND')
      }
    }
    const lang = core.getInput('LANG') as Language
    const cardWidth = core.getInput('CARD_WIDTH')
    const token = core.getInput('GH_TOKEN')
    const hideUpdateTime = core.getInput('HIDE_UPDATE_TIME') === 'true'

    const readmeContent = await fetchPrevReadmeContent(token)
    const score = await fetchScore(shareId)

    const readme = rewriteReadmeToIncludeCardText(readmeContent.text, {
      shareId,
      score,
      theme,
      lang,
      cardWidth,
      hideUpdateTime
    })

    await updateReadme({ghToken: token, readme, sha: readmeContent.sha})
  } catch (error) {
    if (error instanceof Error) core.setFailed(error)
  }
}

run()
