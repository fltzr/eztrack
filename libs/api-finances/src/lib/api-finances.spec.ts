import { apiFinances } from './api-finances';

describe('apiFinances', () => {
  it('should work', () => {
    expect(apiFinances()).toEqual('api-finances');
  });
});
