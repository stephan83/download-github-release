import commander from 'commander';
import downloadRelease from './downloadRelease';
import { version } from '../package.json';

commander
  .version(version)
  .arguments('<user> <repo> [outputdir]')
  .option('-p, --prerelease', 'download prerelease')
  .option('-s, --search <regexp>', 'filter assets name')
  .option('-q, --quiet', 'don\'t log to console')
  .option('-z, --zipped', 'don\'t extract zip files')
  .parse(process.argv);

const user = commander.args[0];
const repo = commander.args[1];
const outputdir = commander.args[2] || process.cwd();

if (!user || !repo) {
  commander.help();
}

function filterRelease(release) {
  return release.draft === false && release.prerelease === !!commander.prerelease;
}

function filterAsset(asset) {
  if (!commander.search) {
    return true;
  }

  return new RegExp(commander.search).exec(asset.name);
}

downloadRelease(user, repo, outputdir, filterRelease, filterAsset,
  !!commander.zipped, !!commander.quiet)
  .catch(err => console.error(err.message));
