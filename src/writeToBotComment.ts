import * as github from '@actions/github'

export async function writeToBotComment({
  githubToken,
  body,
  isBotComment
}: {
  githubToken: string
  body: string
  isBotComment: (_body: string) => boolean
}): Promise<void> {
  const context = github.context
  if (context.payload.pull_request == null) {
    throw Error('No pull request found in Github context')
  }

  const pull_request_number = context.payload.pull_request.number

  const octokit = github.getOctokit(githubToken)

  const comments = await octokit.issues.listComments({
    ...context.repo,
    issue_number: pull_request_number
  })

  const botComment = comments.data.find(c => c.body && isBotComment(c.body))
  if (botComment) {
    await octokit.issues.updateComment({
      ...context.repo,
      issue_number: pull_request_number,
      comment_id: botComment.id,
      body
    })
  } else {
    await octokit.issues.createComment({
      ...context.repo,
      issue_number: pull_request_number,
      body
    })
  }
}
