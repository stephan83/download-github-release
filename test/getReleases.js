import nock from 'nock';
import getReleases from '../src/getReleases';
import nockServer, { releasesJson } from './utils/nockServer';

describe('#getReleases()', () => {
  beforeEach(nockServer);
  afterEach(() => nock.cleanAll());

  it('gets the releases', () =>
    getReleases('me', 'test')
      .then(body => body.should.deepEqual(releasesJson))
  );
});
