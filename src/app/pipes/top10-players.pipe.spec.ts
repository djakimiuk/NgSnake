import { Top10PlayersPipe } from './top10-players.pipe';

describe('Top10PlayersPipe', () => {
  it('create an instance', () => {
    const pipe = new Top10PlayersPipe();
    expect(pipe).toBeTruthy();
  });
});
