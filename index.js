require("dotenv").config();
const { OAuthApp } = require("octokit");

const { CLIENT_ID, CLIENT_SECRET } = process.env;

const config = {
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
};

const username = "sourcier";

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

async function main() {
  try {
    getRepos(app);
  } catch (error) {
    console.log(error);
  }
}

main();
