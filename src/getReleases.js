import request from 'superagent';

export default function getReleases(user, repo) {
  const url = `https://api.github.com/repos/${user}/${repo}/releases`;

  return new Promise((resolve, reject) => {
    request
      .get(url)
      .end((err, res) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(res.body);
      });
  });
}
