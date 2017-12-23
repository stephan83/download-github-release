import http from 'http';
import https from 'https';
import URL from 'url';
import packageJson from '../package';

const urlToOptions = (urlString) => {
  const url = URL.parse(urlString);

  const headers = {
    Accept: 'application/octet-stream',
    'User-Agent': packageJson.name,
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `token ${process.env.GITHUB_TOKEN}`;
  }

  return Object.assign({}, url, { headers });
};

export default function download(url, w, progress = () => {}) {
  return new Promise((resolve, reject) => {
    let protocol = /^https:/.exec(url) ? https : http;
    const options = urlToOptions(url);

    progress(0);

    protocol
      .get(options, res1 => {
        protocol = /^https:/.exec(res1.headers.location) ? https : http;

        protocol
          .get(res1.headers.location, res2 => {
            const total = parseInt(res2.headers['content-length'], 10);
            let completed = 0;
            res2.pipe(w);
            res2.on('data', data => {
              completed += data.length;
              progress(completed / total);
            });
            res2.on('progress', progress);
            res2.on('error', reject);
            res2.on('end', resolve);
          })
          .on('error', reject);
      })
      .on('error', reject);
  });
}
