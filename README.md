# Download Github Release

A node module to download Github release assets. It will also uncompress zip files.

[![Build Status](https://travis-ci.org/stephan83/download-github-release.svg?branch=master)](https://travis-ci.org/stephan83/download-github-release)
[![Build Status](https://david-dm.org/stephan83/download-github-release.svg)](https://david-dm.org/stephan83/download-github-release) 

```
$ download-github-release -s darwin-x64 electron electron
Downloading electron/electron@v1.3.1...
electron-v1.3.1-darwi... ▇▇▇▇▇---------------------------------------------------- 662.8s
electron-v1.3.1-darwi... ▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇--------- 13.4s
electron-v1.3.1-darwi... ▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇--- 3.6s
ffmpeg-v1.3.1-darwin-... ▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇ 0.0s
```

This is useful for instance if you have a project that depends on binaries released via Github.

## Command line

### Installation

```bash
npm install -g download-github-release
```

### Usage

```
Usage: download-github-release [options] <user> <repo> [outputdir]

Options:

  -h, --help             output usage information
  -V, --version          output the version number
  -p, --prerelease       download prerelease
  -s, --search <regexp>  filter assets name
```

### Example

Download `electron/electron` assets whose name contains `darwin-x64` to `/tmp`.

```
$ download-github-release -s darwin-x64 electron electron /tmp
```

## API

### Installation

```bash
npm install --save download-github-release
```

### Usage

```javascript
var downloadRelease = require('download-github-release');

var user = 'some user';
var repo = 'some repo';
var outputdir = 'some output directory';

// Define a function to filter releases.
function filterRelease(release) {
  // Filter out prereleases.
  return release.prerelease === false;
}

// Define a function to filter assets.
function filterAsset(asset) {
  // Select assets that contain the string 'windows'.
  return asset.name.indexOf('windows') >= 0;
}

downloadRelease(user, repo, outputdir, filterRelease, filterAsset)
  .then(function() {
    console.log('All done!');
  });
  .catch(function(err) {
    console.error(err.message);
  });
```

## TODO

- tests
- other compression formats
- option to disable unzipping
- option to download specific release instead of latest?
- option to download source?
- private repos?
