# dnp-build-action

Builds and uploads a release to IPFS and comments its hash in the PR

### Sample usage

`.github/workflows/build-on-pr.yml`

```yaml
name: Build on PR

on:
  pull_request:

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: dappnode/dnp-build-action@v1
        with:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          PINATA_API_KEY: ${{ secrets.PINATA_API_KEY }}
          PINATA_SECRET_API_KEY: ${{ secrets.PINATA_SECRET_API_KEY }}
```
