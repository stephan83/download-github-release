import fs from 'fs';
import path from 'path';
import tmp from 'tmp';
import extract from 'extract-zip';
import { fileZip, fileTxt } from './utils/nockServer';

describe('#extract()', () => {
  let tmpobj;

  beforeEach(() => { tmpobj = tmp.dirSync({ unsafeCleanup: true }); });
  afterEach(() => tmpobj.removeCallback());

  it('extracts a zip file', () => {
    const fileZipPath = path.join(tmpobj.name, 'file.zip');
    fs.writeFileSync(fileZipPath, fileZip);
    return extract(fileZipPath, { dir: tmpobj.name })
      .then(() => {
        fs.readFileSync(path.join(tmpobj.name, '/file/file.txt'), 'utf8')
          .should.be.exactly(fileTxt);
      });
  });
});
