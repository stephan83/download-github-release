import os from 'os';
import fs from 'fs';
import path from 'path';
import extract from 'extract-zip';
import getReleases from './getReleases';
import getLatest from './getLatest';
import download from './download';
import rpad from './rpad';

function pass() {
  return true;
}

const MultiProgress = require('multi-progress');

async function downloadRelease(
  user,
  repo,
  outputdir,
  filterRelease = pass,
  filterAsset = pass,
  leaveZipped = false,
  disableLogging = false,
) {
  const bars = new MultiProgress(process.stderr);

  const releases = await getReleases(user, repo);
  const release = getLatest(releases, filterRelease, filterAsset);
  if (!release) {
    throw new Error(
      `could not find a release for ${user}/${repo} (${os.platform()} ${os.arch()})`
    );
  }
  if (!disableLogging) {
    console.error(`Downloading ${user}/${repo}@${release.tag_name}...`);
  }
  const promises = release.assets.map(async (asset) => {
    let progress;

    if (process.stdout.isTTY && !disableLogging) {
      const bar = bars.newBar(`${rpad(asset.name, 24)} :bar :etas`, {
        complete: '▇',
        incomplete: '-',
        width: process.stdout.columns - 36,
        total: 100
      });
      progress = bar.update.bind(bar);
    }

    const destf = path.join(outputdir, asset.name);
    if (!fs.existsSync(destf)) {
      const dest = fs.createWriteStream(destf);

      await download(asset.url, dest, progress);
      if (!leaveZipped && /\.zip$/.exec(destf)) {
        await extract(destf, {
          dir: outputdir
        });
        fs.unlinkSync(destf);
      }
    }
    return destf;
  });
  return Promise.all(promises);
}

export default downloadRelease;
