export default function getLatest(releases, filterRelease, filterAsset) {
  const filtered = releases.filter(filterRelease);

  if (!filtered.length) {
    return null;
  }

  for (let i = 0; i < filtered.length; i++) {
    const release = filtered[i];
    const assets = release.assets.filter(filterAsset);

    if (assets.length) {
      return Object.assign({}, release, { assets });
    }
  }

  return null;
}
