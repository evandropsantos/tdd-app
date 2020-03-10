import flushPromises from 'flush-promises';
import actions from '@/store/actions';
import api from '@/api';
import userFixture from './fixtures/user';

jest.mock('@/api');

describe('store actions', () => {
  let commit;

  beforeEach(() => {
    commit = jest.fn();
  });

  test('searches for user', async () => {
    const expectedUser = 'kuroski';

    await actions.SEARCH_USER({ commit }, { username: expectedUser });
    await flushPromises();

    expect(api.searchUser).toHaveBeenCalledWith(expectedUser);
    expect(commit).toHaveBeenCalledWith('SET_USER', userFixture);
  });
});
