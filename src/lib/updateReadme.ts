import * as github from '@actions/github'

export const updateReadme = async (params: { ghToken: string, readme: string, sha: string }): Promise<void> => {
  const octokit = github.getOctokit(params.ghToken)
  await octokit.rest.repos.createOrUpdateFileContents({
    repo: github.context.repo.repo,
    owner: github.context.repo.owner,
    path: 'README.md',
    message: 'update README.md',
    content: Buffer.from(params.readme).toString('base64'),
    committer: {
      name: 'github-actions[bot]',
      email: '41898282+github-actions[bot]@users.noreply.github.com'
    },
    sha: params.sha
  })
}
