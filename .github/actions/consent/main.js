const core = require("@actions/core");
const github = require('@actions/github');

async function run() {
  const token = core.getInput('token', { required: true });
  const context = github.context;

  if (!context.payload.pull_request) {
    throw 'No pull request found.';
  }

  const octokit = github.getOctokit(token)
  console.log(token, octokit, context)
  
  const { data: pullRequest } = await octokit.rest.pulls.get({
    owner: context.repo.owner,
    repo: context.repo.repo,
    pull_number: context.payload.pull_request.number,
  });

  const { data: files } = await octokit.rest.pulls.listFiles({
    owner: context.repo.owner,
    repo: context.repo.repo,
    pull_number: context.payload.pull_request.number,
  });

  files.forEach(file => {
    console.log("source", getFileContent(context.repo.owner, context.repo.repo, "main"))
    console.log("new", getFileContent(context.repo.owner, context.repo.repo, file.filename, pullRequest.head.ref));
  })

  console.log(pullRequest, files)
}

async function getFileContent(owner, repo, path, ref) {
  const octokit = new Octokit();

  const response = await octokit.rest.repos.getContent({
    owner,
    repo,
    path,
    ref,
  });

  if (response.data?.content) {
    return Buffer.from(response.data.content, 'base64').toString('utf-8');
  }

  return null;
}

run();