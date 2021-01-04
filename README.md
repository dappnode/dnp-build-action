<p align="center">
  <a href="https://github.com/actions/typescript-action/actions"><img alt="typescript-action status" src="https://github.com/actions/typescript-action/workflows/build-test/badge.svg"></a>
</p>

# dnp-bump-upstream-action

Github Action to open upstream version bumps on DAppNode Packages

### Sample usage

It's recommended to use an OAuth token (`PERSONAL_TOKEN` in the example) instead of the default `GITHUB_TOKEN` so the created PR triggers CI/CD.

`.github/workflows/auto_check.yml`

```yaml
name: Bump upstream version

on:
  schedule:
    - cron: '00 */4 * * *'
  push:
    branches:
      - 'master'
jobs:
  bump-upstream:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: dappnode/dnp-bump-upstream-action@v1
        with:
          github_token: ${{ secrets.PERSONAL_TOKEN }}
```

You may specify in the package manifest what upstream Github repo the package is tracking. Also indicate what build variable in the docker-compose should be updated

`dappnode_package.json`

```json
{
  "name": "prysm.dnp.dappnode.eth",
  "upstreamVersion": "v1.0.0",
  "upstreamRepo": "prysmaticlabs/prysm",
  "upstreamArg": "UPSTREAM_VERSION"
}
```

`docker-compose.yml`

```yaml
version: '3.4'
services:
  beacon-chain:
    build:
      args:
        UPSTREAM_VERSION: v1.0.0
```
