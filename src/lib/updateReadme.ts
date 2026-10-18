import * as github from '@actions/github'

export const updateReadme = async (params: { ghToken: string, readme: string, readmeFile: string, sha: string }): Promise<void> => {
  const octokit = github.getOctokit(params.ghToken)
  await octokit.rest.repos.createOrUpdateFileContents({
    repo: github.context.repo.repo,
    owner: github.context.repo.owner,
    path: params.readmeFile,
    message: `update ${params.readmeFile}`,
    content: Buffer.from(params.readme).toString('base64'),
    committer: {
      name: 'github-actions[bot]',
      email: '41898282+github-actions[bot]@users.noreply.github.com'
    },
    sha: params.sha
  })
}
