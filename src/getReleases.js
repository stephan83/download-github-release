import request from 'superagent';
import { name } from '../package.json';

const { GITHUB_TOKEN } = process.env;

export default function getReleases(user, repo) {
  const url = `https://api.github.com/repos/${user}/${repo}/releases`;

  return new Promise((resolve, reject) => {
    const r = request.get(url);
    r.set('User-Agent', name);
    if (GITHUB_TOKEN) {
      r.set('Authorization', `token ${GITHUB_TOKEN}`);
    }
    r.end((err, res) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(res.body);
    });
  });
}
