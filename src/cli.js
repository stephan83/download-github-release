import path from 'path';
import fs from 'fs';
import commander from 'commander';
import downloadRelease from './downloadRelease';

const version = JSON
  .parse(fs.readFileSync(path.resolve(__dirname, '../package.json')))
  .version;

commander
  .version(version)
  .arguments('<user> <repo> [outputdir]')
  .option('-p, --prerelease', 'download prerelease')
  .option('-s, --search <regexp>', 'filter assets name')
  .parse(process.argv);

const user = commander.args[0];
const repo = commander.args[1];
const outputdir = commander.args[2] || process.cwd();

if (!user || !repo) {
  commander.help();
}

function filterRelease(release) {
  return release.prerelease === !!commander.prerelease;
}

function filterAsset(asset) {
  if (!commander.search) {
    return true;
  }

  return new RegExp(commander.search).exec(asset.name);
}

downloadRelease(user, repo, outputdir, filterRelease, filterAsset)
  .catch(err => console.error(err.message));
