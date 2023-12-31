const core = require("@actions/core");
const github = require('@actions/github');

async function run() {
  const token = core.getInput('token', { required: true });
  const context = github.context;

  if (!context.payload.pull_request) {
    throw 'No pull request found.';
  }

  const octokit = github.getOctokit(token)
  
  console.log(octokit.pulls.listReviews({
    owner: context.repo.owner,
    repo: context.repo.repo,
    pull_number: context.payload.pull_request.number,
    page: 1,
  }));

}

run();