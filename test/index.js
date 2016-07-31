import downloadRelease from '../src';

describe('download-github-release', () => {
  it('should expose a function', () => {
    downloadRelease.should.be.a.Function();
  });
});
