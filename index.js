require("dotenv").config();
const { OAuthApp } = require("octokit");

const { CLIENT_ID, CLIENT_SECRET } = process.env;

const config = {
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
};

const username = "sourcier";

const app = new OAuthApp(config);

async function main() {
  try {
    const res = await app.octokit.request(`/users/${username}/repos`);
    console.log(res);
  } catch (error) {
    console.log(error);
  }
}

main();
