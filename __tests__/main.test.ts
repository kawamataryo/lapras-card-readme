import {shareIdParser} from '../src/lib/getActionsParams'
import {test, expect} from '@jest/globals'
import {rewriteReadmeToIncludeCardText} from '../src/lib/rewriteReadmeToIncludeCardText'

test.skip('rewriteReadmeToIncludeCardText', () => {
  // TODO: add text
  rewriteReadmeToIncludeCardText('', {} as any)
})

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
