import fs from 'fs';
import path from 'path';
import nock from 'nock';

const fileTxt = fs.readFileSync(path.resolve(__dirname, '../fixtures/file.txt'));
const fileZip = fs.readFileSync(path.resolve(__dirname, '../fixtures/file.zip'));

export default function nockServer() {
  nock('http://localhost')
    .get('/files/file.txt')
    .reply(302, {}, { Location: 'http://localhost/download/file.txt' });

  nock('http://localhost')
    .get('/files/file.zip')
    .reply(302, {}, { Location: 'http://localhost/download/file.zip' });

  nock('http://localhost')
    .get('/download/file.txt')
    .reply(200, fileTxt, { 'Content-Length': fileTxt.length });

  nock('http://localhost')
    .get('/download/file.zip')
    .reply(200, fileZip, { 'Content-Length': fileZip.length });
}
