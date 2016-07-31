import fs from 'fs';
import path from 'path';
import nock from 'nock';
import tmp from 'tmp';
import downloadRelease from '../src/downloadRelease';
import nockServer, { fileZip, fileTxt } from './utils/nockServer';

describe('#downloadRelease()', () => {
  let tmpobj;

  beforeEach(() => {
    nockServer();
    tmpobj = tmp.dirSync({ unsafeCleanup: true });
  });
  afterEach(() => {
    nock.cleanAll();
    tmpobj.removeCallback();
  });

  it('downloads a release', () =>
    downloadRelease('me', 'test', tmpobj.name, undefined, a => a.name.indexOf('darwin-amd64') >= 0)
      .then(() => {
        fs.readFileSync(path.join(tmpobj.name, '/file/file.txt'), 'utf8')
          .should.be.exactly(fileTxt);
        fs.readFileSync(path.join(tmpobj.name, '/file-darwin-amd64.txt'), 'utf8')
          .should.be.exactly(fileTxt);
      })
  );
});
