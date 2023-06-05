import * as core from '@actions/core'
import { Language, Theme } from '../types/types'
import { z } from 'zod'

const themeParser: z.ZodType<Theme> = z.object({
  icon: z.object({
    first: z.string(),
    second: z.string()
  }),
  background: z.object({
    first: z.string(),
    second: z.string()
  })
})
const languageParser: z.ZodType<Language> = z.union([z.literal('en'), z.literal('ja')])
export const shareIdParser = z.string().regex(/^(?!https?:\/\/).*$/)
const stringParser = z.string()

export const getActionsParams = (): {
  shareId: string
  readmeFile: string
  theme: Theme
  lang: Language
  cardWidth: string
  token: string
  showUpdateTime: boolean
  isCenter: boolean
  alternativeText: string
} => {
  const shareIdParseResult = shareIdParser.safeParse(core.getInput('SHARE_ID'))
  const lang = languageParser.parse(core.getInput('LANG'))
  if (!shareIdParseResult.success) {
    switch (lang) {
      case 'ja':
        throw new Error("SHARE_IDは公開ページのURL全体ではなく、公開URL末尾のIDを設定してください")
      case 'en':
      default:
        throw new Error('Please set SHARE_ID to the ID at the end of the public URL, not the entire public page URL.')
    }
  }

  const theme = themeParser.parse({
    icon: {
      first: core.getInput('ICON_FIRST'),
      second: core.getInput('ICON_SECOND')
    },
    background: {
      first: core.getInput('BACKGROUND_FIRST'),
      second: core.getInput('BACKGROUND_SECOND')
    }
  })
  const cardWidth = stringParser.parse(core.getInput('CARD_WIDTH'))
  const token = stringParser.parse(core.getInput('GH_TOKEN'))
  const readmeFile = stringParser.parse(core.getInput('README_FILE'))
  const showUpdateTime = stringParser.parse(core.getInput('UPDATE_TIME')) === 'true'
  const isCenter = stringParser.parse(core.getInput('IS_CENTER')) === 'true'
  const alternativeText = stringParser.parse(core.getInput('ALTERNATIVE_TEXT'))

  return { shareId: shareIdParseResult.data, readmeFile, theme, lang, cardWidth, token, showUpdateTime, isCenter, alternativeText }
}
