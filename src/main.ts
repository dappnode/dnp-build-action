import * as core from '@actions/core'
import {dappnodesdk} from '@dappnode/dappnodesdk'
import {writeToBotComment} from './writeToBotComment'

const botCommentTag = '(by dappnodebot/build-action)'

async function run(): Promise<void> {
  try {
    const GITHUB_TOKEN = core.getInput('GITHUB_TOKEN')
    const PINATA_API_KEY = core.getInput('PINATA_API_KEY')
    const PINATA_SECRET_API_KEY = core.getInput('PINATA_SECRET_API_KEY')
    // dappnodesdk.build expects Pinata credentials via ENVs
    process.env.PINATA_API_KEY = PINATA_API_KEY
    process.env.PINATA_SECRET_API_KEY = PINATA_SECRET_API_KEY

    // Pinata credentials are injected via ENVs -
    // This script will delete previous pins with the same branch
    const {releaseMultiHash} = await dappnodesdk.build({
      upload_to: 'ipfs',
      provider: 'pinata',
      require_git_data: true,
      delete_old_pins: true
    })

    core.info(`Done dappnodesdk.build: ${releaseMultiHash}`)

    // 8 char commit sha should automatically display as link
    const shortCommit = process.env.GITHUB_SHA?.slice(0, 8)
    const installLink = `http://my.dappnode/#/installer/${encodeURIComponent(
      releaseMultiHash
    )}`

    const body = `DAppNode build bot has built commit ${shortCommit} and pinned the release to an IPFS node

\`\`\`
${releaseMultiHash}
\`\`\`
  
This is a development version and should **only** be installed for testing purposes, [install link](${installLink})

${botCommentTag}
`

    await writeToBotComment({
      githubToken: GITHUB_TOKEN,
      body,
      isBotComment: _body => _body.includes(botCommentTag)
    })
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
