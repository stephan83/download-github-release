import fs from 'fs';
import path from 'path';
import nock from 'nock';
import tmp from 'tmp';
import downloadRelease from '../src/downloadRelease';
import nockServer, { fileTxt, fileZip } from './utils/nockServer';

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

  it('downloads a release', async () => {
    const check = a => a.name.indexOf('darwin-amd64') >= 0;

    await downloadRelease('me', 'test', tmpobj.name, undefined, check);

    fs.readFileSync(path.join(tmpobj.name, '/file/file.txt'), 'utf8')
      .should.be.exactly(fileTxt);
    fs.readFileSync(path.join(tmpobj.name, '/file-darwin-amd64.txt'), 'utf8')
      .should.be.exactly(fileTxt);
  });

  it('downloads a release (without unzipping it)', async () => {
    const check = a => a.name.indexOf('darwin-amd64') >= 0;

    await downloadRelease('me', 'test', tmpobj.name, undefined, check, true);

    fs.readFileSync(path.join(tmpobj.name, '/file-darwin-amd64.zip')).toString('hex')
      .should.be.exactly(fileZip.toString('hex'));
    fs.readFileSync(path.join(tmpobj.name, '/file-darwin-amd64.txt'), 'utf8')
      .should.be.exactly(fileTxt);
  });
});
