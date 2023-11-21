require("dotenv").config();
const { OAuthApp } = require("octokit");

const { CLIENT_ID, CLIENT_SECRET } = process.env;

const config = {
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
};

const username = "sourcier";
const repo = "octokit-demo";

const app = new OAuthApp(config);

async function getRepos(app) {
  try {
    const res = await app.octokit.request(`/users/${username}/repos`);

    if (res.status !== 200) {
      throw new Error("Could not fetch repos");
    }

    const repos = res.data.map((repo) => ({
      id: repo.id,
      name: repo.name,
      url: repo.url,
    }));

    console.log(JSON.stringify(repos, null, 2));
  } catch (error) {
    console.log(error);
  }
}

async function getCommits(app, owner, repo) {
  try {
    const res = await app.octokit.request(`/repos/${owner}/${repo}/commits`);

    if (res.status !== 200) {
      throw new Error("Could not fetch commits");
    }

    const commits = res.data.map((commit) => ({
      sha: commit.sha,
      message: commit.commit.message,
    }));

    console.log(commits);
  } catch (error) {
    console.log(error);
  }
}

async function main() {
  try {
    // getRepos(app);
    // getCommits(app, username, repo);
  } catch (error) {
    console.log(error);
  }
}

main();
