import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';

import UserView from '@/views/UserView.vue';
import VUserSearchForm from '@/components/VUserSearchForm.vue';
import VUserProfile from '@/components/VUserProfile.vue';

import initialState from '@/store/state';
import actions from '@/store/actions';
import userFixture from './fixtures/user';

jest.mock('@/store/actions');

const localVue = createLocalVue();
localVue.use(Vuex);

describe('UserView', () => {
  let state;

  const build = () => {
    const wrapper = shallowMount(UserView, {
      localVue,
      store: new Vuex.Store({
        state,
        actions,
      }),
    });

    return {
      wrapper,
      userSearchForm: () => wrapper.find(VUserSearchForm),
      userProfile: () => wrapper.find(VUserProfile),
    };
  };

  beforeEach(() => {
    jest.resetAllMocks();
    state = { ...initialState };
  });

  test('render the component', () => {
    const { wrapper } = build();

    expect(wrapper.html()).toMatchSnapshot();
  });

  test('redenrs main child components', () => {
    const { userProfile, userSearchForm } = build();

    expect(userSearchForm().exists()).toBe(true);
    expect(userProfile().exists()).toBe(true);
  });

  test('passes a binded user prop to user profile component', () => {
    state.user = userFixture;

    const { userProfile } = build();

    expect(userProfile().vm.user).toBe(state.user);
  });

  test('searches for a user when received "submitted"', () => {
    const expectedUser = 'kuroski';
    const { userSearchForm } = build();

    userSearchForm().vm.$emit('submitted', expectedUser);

    expect(actions.SEARCH_USER).toHaveBeenCalled();
    expect(actions.SEARCH_USER.mock.calls[0][1]).toEqual({ username: expectedUser });
  });
});
