import * as core from '@actions/core'
import {wait} from './wait'

async function run(): Promise<void> {
  try {
    const shareId: string = core.getInput('SHARE_ID')
    const iconFirst: string = core.getInput('ICON_FIRST')
    const iconSecond: string = core.getInput('ICON_SECOND')
    const backgroundFirst: string = core.getInput('BACKGROUND_FIRST')
    const backgroundSecond: string = core.getInput('BACKGROUND_SECOND')
    const lang: string = core.getInput('LANG')

    core.debug(shareId)
    core.debug(iconFirst)
    core.debug(iconSecond)
    core.debug(backgroundFirst)
    core.debug(backgroundSecond)
    core.debug(lang)

    core.setOutput('lang', lang)
    core.setOutput('time', new Date().toTimeString())
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
