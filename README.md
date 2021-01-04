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
