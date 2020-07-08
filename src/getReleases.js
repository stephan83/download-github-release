import got from 'got';
import { name } from '../package.json';

const { GITHUB_TOKEN } = process.env;

export default async function getReleases(user, repo) {
  const url = `https://api.github.com/repos/${user}/${repo}/releases`;

  const r = await got.get(url, {
    headers: {
      'User-Agent': name,
      Authorization: `token ${GITHUB_TOKEN}`,
    },
    responseType: 'json'
  });
  return r.body;
}
