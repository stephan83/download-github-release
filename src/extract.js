import extractZip from 'extract-zip';

export default function extract(source, dir) {
  return new Promise((resolve, reject) => {
    extractZip(source, { dir }, err => {
      if (err) {
        reject(err);
        return;
      }

      resolve();
    });
  });
}
