function pass() {
  return true;
}

export default function getLatest(releases, filterRelease = pass, filterAsset = pass) {
  if (!releases) {
    return null;
  }
  
  const filtered = releases.filter(filterRelease);

  if (!filtered.length) {
    return null;
  }

  for (let i = 0; i < filtered.length; i += 1) {
    const release = filtered[i];
    const assets = release.assets.filter(filterAsset);

    if (assets.length) {
      return Object.assign({}, release, { assets });
    }
  }

  return null;
}
