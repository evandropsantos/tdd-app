import { shallowMount } from '@vue/test-utils';
import button from '@/components/button.vue';

describe('Component button', () => {
  let wrapper = shallowMount(button, {
    propsData: {
      label: 'Enviar',
    },
  });

  beforeEach(() => wrapper.destroy());

  test('should mount the component', () => {
    expect(wrapper.classes()).toContain('button');
  });

  test('should insert a new props', () => {
    wrapper = shallowMount(button, {
      propsData: {
        label: 'Enviar',
        type: 'active',
      },
    });

    expect(wrapper.classes()).toContain('button--active');
  });
});
