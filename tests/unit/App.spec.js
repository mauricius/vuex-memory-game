import { mount, shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import App from "@/App.vue";

const localVue = createLocalVue();

localVue.use(Vuex);

describe("App.vue", () => {
  let state;
  let mutations;
  let getters;
  let store;

  beforeEach(() => {
    state = {
      playing: false
    };

    mutations = {
      start: jest.fn(),
      actionInput: jest.fn()
    };

    getters = {
      completed: () => false,
      discovered: () => false,
      round: () => 0,
      score: () => 0
    };

    store = new Vuex.Store({
      state,
      mutations,
      getters
    });
  });

  it("should mount the app", () => {
    const wrapper = mount(App, { store, localVue });

    expect(wrapper.isVueInstance()).toBe(true);
  });

  it("should show the start new game button if not playing", () => {
    const wrapper = mount(App, { store, localVue });

    const button = wrapper.find('button');

    expect(button.text()).toBe('New Game');
  });

  it("should dispatch 'start' when clicking on the 'New Game' button", () => {
    const wrapper = mount(App, { store, localVue })

    const button = wrapper.find('button');

    button.trigger("click");

    expect(mutations.start).toHaveBeenCalled();
  });

  it("should show the 'Pause' button if the game is playing", () => {
    state.playing = true;

    const wrapper = mount(App, { store, localVue })

    expect(wrapper.find('button').text()).toBe('Pause');
  });

});