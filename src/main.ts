import * as core from '@actions/core'
import {createCardText} from './createCardText'
import {fetchScore} from './fetchScore'
import {Language, Theme} from './types/types'
import * as fs from 'fs/promises'
import {MARK} from './constant'
import * as github from '@actions/github'

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
    let readme = await fs.readFile('README.md', 'utf8')

    const re = new RegExp(`(${MARK.START})[\\s\\S]*(${MARK.END})`)
    readme = readme.replace(re, `$1\n${cardText}\n$2`)

    const octokit = github.getOctokit(core.getInput('GH_TOKEN'))
    const res = await octokit.rest.repos.getContent({
      repo: github.context.repo.repo,
      owner: github.context.repo.owner,
      path: 'README.md'
    })
    await octokit.rest.repos.createOrUpdateFileContents({
      repo: github.context.repo.repo,
      owner: github.context.repo.owner,
      path: 'README.md',
      message: 'update README.md',
      content: Buffer.from(readme).toString('base64'),
      committer: {
        name: 'github-actions[bot]',
        email: '41898282+github-actions[bot]@users.noreply.github.com'
      },
      sha: (res.data as any).sha
    })

    core.setOutput('lang', lang)
    core.setOutput('time', new Date().toTimeString())
  } catch (error) {
    console.log('🚀 ~ file: main.ts:50 ~ run ~ error', error)
    if (error instanceof Error) core.setFailed(error.message)
    if (error instanceof Error) core.setFailed(error)
  }
}

run()
