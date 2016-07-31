import nock from 'nock';
import sinon from 'sinon';
import streamBuffers from 'stream-buffers';
import download from '../src/download';
import nockServer, { fileTxt } from './utils/nockServer';

describe('#download()', () => {
  beforeEach(nockServer);
  afterEach(() => nock.cleanAll());

  it('downloads a file', () => {
    const w = new streamBuffers.WritableStreamBuffer();
    return download('https://api.github.com/files/file-darwin-amd64.txt', w)
      .then(() => {
        w.getContentsAsString('utf8').should.be.exactly(fileTxt);
      });
  });

  it('calls progress', () => {
    const w = new streamBuffers.WritableStreamBuffer();
    const progress = sinon.spy();
    return download('https://api.github.com/files/file-darwin-amd64.zip', w, progress)
      .then(() => {
        progress.called.should.be.exactly(true);
        progress.firstCall.args.should.deepEqual([0]);
        progress.lastCall.args.should.deepEqual([1]);
      });
  });
});
