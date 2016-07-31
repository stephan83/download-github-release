import getLatest from '../src/getLatest';
import { releasesJson } from './utils/nockServer';

describe('#getLatest()', () => {
  it('gets the latest release', () => {
    getLatest(releasesJson).should.deepEqual(releasesJson[0]);
  });

  it('filters releases', () => {
    getLatest(releasesJson, r => !r.draft).should.deepEqual(releasesJson[1]);
  });

  it('filters assets', () => {
    getLatest(releasesJson, undefined, a => a.name.indexOf('windows-amd64') >= 0)
      .should.deepEqual(Object.assign({}, releasesJson[0], {
        assets: [releasesJson[0].assets[1], releasesJson[0].assets[3]]
      }));
  });

  it('return null if there is no match', () => {
    (getLatest(releasesJson, () => false) === null).should.be.exactly(true);
  });
});
