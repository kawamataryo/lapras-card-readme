import * as core from '@actions/core'
import {createCardText} from './createCardText'
import {fetchScore} from './fetchScore'
import {Language, Theme} from './types/types'
import * as fs from 'fs/promises'
import {MARK} from './constant'

async function run(): Promise<void> {
  try {
    const shareId: string = core.getInput('SHARE_ID')
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
    const score = await fetchScore(shareId)

    const cardText = createCardText({shareId, score, theme, lang})
    const readme = await fs.readFile('../README.md', 'utf8')

    const re = new RegExp(`${MARK.START}(.|\n)*${MARK.END}`, 'g')
    readme.replace(re, cardText)

    await fs.writeFile('../README.md', readme)

    core.setOutput('lang', lang)
    core.setOutput('time', new Date().toTimeString())
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
