import {wait} from '../src/wait'
import * as process from 'process'
import * as cp from 'child_process'
import * as path from 'path'
import {expect, test} from '@jest/globals'

test('throws invalid number', async () => {
  const input = parseInt('foo', 10)
  await expect(wait(input)).rejects.toThrow('milliseconds not a number')
})

test('wait 500 ms', async () => {
  const start = new Date()
  await wait(500)
  const end = new Date()
  var delta = Math.abs(end.getTime() - start.getTime())
  expect(delta).toBeGreaterThan(450)
})

// shows how the runner will run a javascript action with env / stdout protocol
test('test runs', () => {
  process.env['INPUT_SHARE_ID'] = '123456789'
  process.env['INPUT_ICON_FIRST'] = '#000000'
  process.env['INPUT_ICON_SECOND'] = '#ffffff'
  process.env['INPUT_BACKGROUND_FIRST'] = '#cccccc'
  process.env['INPUT_BACKGROUND_SECOND'] = '#eeeeee'
  process.env['INPUT_LANG'] = 'en'

  const np = process.execPath
  const ip = path.join(__dirname, '..', 'lib', 'main.js')
  const options: cp.ExecFileSyncOptions = {
    env: process.env
  }
  try {
    console.log(cp.execFileSync(np, [ip], options).toString())
  } catch (error) {
    console.log('🚀 ~ file: main.test.ts:37 ~ test ~ error', error)
  }
})
