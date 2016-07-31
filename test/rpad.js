import rpad from '../src/rpad';

describe('#rpad()', () => {
  it('adds right padding to a string', () => {
    rpad('test', 20).should.be.a.exactly('test                ');
  });

  it('shortens the string if it is too long', () => {
    rpad('a very long string', 16).should.be.a.exactly('a very long s...');
  });
});
