import * as github from '@actions/github'

export const fetchPrevReadmeContent = async (ghToken: string, readmeFile: string): Promise<{ text: string; sha: string }> => {
  const octokit = github.getOctokit(ghToken)
  const res: any = await octokit.rest.repos.getContent({
    repo: github.context.repo.repo,
    owner: github.context.repo.owner,
    path: readmeFile
  })

  const prevReadme = Buffer.from(
    res.data.content,
    res.data.encoding
  ).toString()

  return {
    text: prevReadme,
    sha: res.data.sha
  }
}
