import { UniquePlayersPipe } from './unique-players.pipe';

describe('UniquePlayersPipe', () => {
  it('create an instance', () => {
    const pipe = new UniquePlayersPipe();
    expect(pipe).toBeTruthy();
  });
});
