import {jest, test, expect} from '@jest/globals'
import * as github from '@actions/github'
import {updateReadme} from '../src/lib/updateReadme'

jest.mock('@actions/github', () => ({
  getOctokit: jest.fn(),
  context: {repo: {owner: 'owner', repo: 'profile'}}
}))

test.each(['README.md', 'Readme.md', 'docs/README.ja.md'])(
  'updates the configured README file: %s',
  async readmeFile => {
    const createOrUpdateFileContents = jest
      .fn<Promise<unknown>, unknown[]>()
      .mockResolvedValue({})
    jest.mocked(github.getOctokit).mockReturnValue({
      rest: {repos: {createOrUpdateFileContents}}
    } as unknown as ReturnType<typeof github.getOctokit>)
    const readme = '# プロフィール\nUpdated card\n'

    await updateReadme({
      ghToken: 'test-token',
      readme,
      readmeFile,
      sha: 'existing-file-sha'
    })

    expect(github.getOctokit).toHaveBeenCalledWith('test-token')
    expect(createOrUpdateFileContents).toHaveBeenCalledTimes(1)
    expect(createOrUpdateFileContents).toHaveBeenCalledWith({
      owner: 'owner',
      repo: 'profile',
      path: readmeFile,
      message: `update ${readmeFile}`,
      content: Buffer.from(readme).toString('base64'),
      sha: 'existing-file-sha',
      committer: {
        name: 'github-actions[bot]',
        email: '41898282+github-actions[bot]@users.noreply.github.com'
      }
    })
  }
)
