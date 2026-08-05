import {cardTypeParser, shareIdParser} from '../src/lib/getActionsParams'
import {test, expect} from '@jest/globals'
import {rewriteReadmeToIncludeCardText} from '../src/lib/rewriteReadmeToIncludeCardText'
import {mapResponseToScore} from '../src/lib/mapResponseToScore'
import {MARK} from '../src/constant'
import {PublicApiResponse, Score, Theme} from '../src/types/types'

const theme: Theme = {
  icon: {first: '#030E21', second: '#1688BF'},
  background: {first: '#020E27', second: '#0E5593'}
}

const scoreWithoutDetails: Score = {
  eScore: 4.26,
  bScore: 3.48,
  iScore: 4.05
}

const scoreWithDetails: Score = {
  ...scoreWithoutDetails,
  eScoreDetails: {
    scoreVersion: '1.2.3',
    eScore: 4.26,
    eScorePercentile: 8.4,
    invertEScorePercentile: 91.6,
    githubScore: 4.1,
    githubScorePercentile: 10.2,
    techArticleScore: 3.5,
    techArticleScorePercentile: 20.1,
    techEventScore: 2.8,
    techEventScorePercentile: 30.4,
    tagCountScore: 4.9,
    tagCountScorePercentile: 5.6
  }
}

const readmeTemplate = `# profile\n${MARK.START}\n${MARK.END}\n`

const baseParams = {
  shareId: 'kawamataryo',
  theme,
  lang: 'ja' as const,
  cardWidth: '400',
  showUpdateTime: false,
  isCenter: false,
  alternativeText: ''
}

test('rewriteReadmeToIncludeCardText: cardType "score" generates the default /api/svg URL', () => {
  const readme = rewriteReadmeToIncludeCardText(readmeTemplate, {
    ...baseParams,
    score: scoreWithoutDetails,
    cardType: 'score'
  })

  expect(readme).toContain(
    'https://lapras-card-generator.vercel.app/api/svg?e=4.26&b=3.48&i=4.05&b1=%23020E27&b2=%230E5593&i1=%23030E21&i2=%231688BF&l=ja'
  )
  expect(readme).not.toContain('type=tech')
})

test('rewriteReadmeToIncludeCardText: cardType "tech" generates the tech /api/svg URL with breakdown params', () => {
  const readme = rewriteReadmeToIncludeCardText(readmeTemplate, {
    ...baseParams,
    score: scoreWithDetails,
    cardType: 'tech'
  })

  expect(readme).toContain(
    'https://lapras-card-generator.vercel.app/api/svg?type=tech&e=4.26&ep=91.60&g=4.1&ta=3.5&te=2.8&tg=4.9&b1=%23020E27&b2=%230E5593&i1=%23030E21&i2=%231688BF&l=ja'
  )
})

test('rewriteReadmeToIncludeCardText: cardType "tech" without eScoreDetails falls back to the default URL', () => {
  const readme = rewriteReadmeToIncludeCardText(readmeTemplate, {
    ...baseParams,
    score: scoreWithoutDetails,
    cardType: 'tech'
  })

  expect(readme).toContain(
    'https://lapras-card-generator.vercel.app/api/svg?e=4.26&b=3.48&i=4.05&b1=%23020E27&b2=%230E5593&i1=%23030E21&i2=%231688BF&l=ja'
  )
  expect(readme).not.toContain('type=tech')
})

test('rewriteReadmeToIncludeCardText: throws if the README has no MARKER', () => {
  expect(() =>
    rewriteReadmeToIncludeCardText('# profile without marker', {
      ...baseParams,
      score: scoreWithoutDetails,
      cardType: 'score'
    })
  ).toThrow()
})

test('mapResponseToScore: maps e_score_details into eScoreDetails when present', () => {
  const response: PublicApiResponse = {
    name: 'kawamataryo',
    e_score: 4.26,
    b_score: 3.48,
    i_score: 4.05,
    e_score_details: {
      score_version: '1.2.3',
      e_score: 4.26,
      e_score_percentile: 8.4,
      invert_e_score_percentile: 91.6,
      github_score: 4.1,
      github_score_percentile: 10.2,
      tech_article_score: 3.5,
      tech_article_score_percentile: 20.1,
      tech_event_score: 2.8,
      tech_event_score_percentile: 30.4,
      tag_count_score: 4.9,
      tag_count_score_percentile: 5.6
    }
  }

  const score = mapResponseToScore(response)

  expect(score.eScoreDetails).toEqual({
    scoreVersion: '1.2.3',
    eScore: 4.26,
    eScorePercentile: 8.4,
    invertEScorePercentile: 91.6,
    githubScore: 4.1,
    githubScorePercentile: 10.2,
    techArticleScore: 3.5,
    techArticleScorePercentile: 20.1,
    techEventScore: 2.8,
    techEventScorePercentile: 30.4,
    tagCountScore: 4.9,
    tagCountScorePercentile: 5.6
  })
})

test('mapResponseToScore: eScoreDetails is undefined when e_score_details is absent', () => {
  const response: PublicApiResponse = {
    name: 'kawamataryo',
    e_score: 4.26,
    b_score: 3.48,
    i_score: 4.05
  }

  const score = mapResponseToScore(response)

  expect(score).toEqual({eScore: 4.26, bScore: 3.48, iScore: 4.05})
  expect(score.eScoreDetails).toBeUndefined()
})

test.each(['score', 'tech'])(
  'cardTypeParser don`t throw error',
  (cardType: string) => {
    expect(() => cardTypeParser.parse(cardType)).not.toThrow()
  }
)

test.each(['', 'Score', 'tech ', 'business'])(
  'cardTypeParser throw error if invalid value',
  (cardType: string) => {
    expect(() => cardTypeParser.parse(cardType)).toThrow()
  }
)

test.each([
  'http://lapars.com/public/1234567890',
  'https://lapars.com/public/1234567890'
])('shareIdParser throw error if get url', (shareId: string) => {
  expect(() => shareIdParser.parse(shareId)).toThrow()
})

test.each(['12345', 'kawamataryo', 'abcd1234'])(
  'shareIdParser don`t throw error',
  (shareId: string) => {
    expect(() => shareIdParser.parse(shareId)).not.toThrow()
  }
)
