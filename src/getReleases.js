import request from 'superagent';

export default function getReleases(user, repo) {
  const url = `https://api.github.com/repos/${user}/${repo}/releases`;

  return new Promise((resolve, reject) => {
    const r = request
      .get(url);

    if (Object.hasOwnProperty.call(process.env, 'GITHUB_TOKEN')) {
      r.set('Authorization', `token ${process.env.GITHUB_TOKEN}`);
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
