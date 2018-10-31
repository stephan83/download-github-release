import downloadRelease from '../src';

describe('fetch-github-release', () => {
  it('should expose a function', () => {
    downloadRelease.should.be.a.Function();
  });
});
