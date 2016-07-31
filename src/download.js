import https from 'https';

export default function download(url, w, progress = () => {}) {
  return new Promise((resolve, reject) => {
    https
      .get(url, res1 => {
        https
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
