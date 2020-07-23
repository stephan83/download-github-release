import got from 'got';
import { name } from '../package.json';

const { GITHUB_TOKEN } = process.env;

export default async function getReleases(user, repo) {
  const url = `https://api.github.com/repos/${user}/${repo}/releases`;

  const requestConfig = {
    headers: {
      'User-Agent': name
    },
    responseType: 'json'
  };

  if (GITHUB_TOKEN) {
    requestConfig.headers.Authorization = `token ${GITHUB_TOKEN}`;
  }

  const r = await got.get(url, requestConfig);
  return r.body;
}
