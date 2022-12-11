# LAPRAS Card Readme

Add LAPRAS Card to your GitHub Profile

<!--START_SECTION:lapras-card-->
<!--END_SECTION:lapras-card-->

## Prep Work

A GitHub repository and a README file is required. We'll be making use of readme in the [profile repository][profile_readme]\*.
Save the README file after copy-pasting the following special comments. Your LAPRAS score will show up in between. 

Create a new workflow file (`lapras-card.yml`) inside `.github/workflows/` folder of your repository. You can create it from a template using the _actions tab_ of your repository too.
Clear any existing contents, add the following lines and save the file.

```yml
name: LAPRAS Card

on:
  workflow_dispatch: # for manual workflow trigger
  schedule:
    - cron: "0 0 * * *" # runs at every 12AM UTC

jobs:
  update-card:
    name: LAPRAS Card
    runs-on: ubuntu-latest
    steps:
      - uses: kawamataryo/lapras-card-readme@latest
        with:
          GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          SHARE_ID: 'your lapras public share id'
```

## Options

TODO
