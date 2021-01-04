<p align="center">
  <a href="https://github.com/actions/typescript-action/actions"><img alt="typescript-action status" src="https://github.com/actions/typescript-action/workflows/build-test/badge.svg"></a>
</p>

# dnp-build-action

Builds and uploads a release to IPFS and comments its hash in the PR

### Sample usage

`.github/workflows/build-on-pr.yml`

```yaml
name: Bump upstream version

on:
  pull_request:

jobs:
  bump-upstream:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: dappnode/dnp-build-action@v1
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
```
