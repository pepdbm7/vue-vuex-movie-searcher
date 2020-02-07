import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Search from "../src/components/Search.vue";

const localVue = createLocalVue();

localVue.use(Vuex);

describe("Search.vue", () => {
  let actions;
  let store;

  beforeEach(() => {
    actions = { searchMovie: jest.fn() };
    store = new Vuex.Store({ actions });
  });

  it('dispatches "searchMovies" on input change', () => {
    const wrapper = shallowMount(Search, { store, localVue });
    const input = wrapper.find("input");
    input.element.value = "a";
    input.trigger("search");
    expect(actions.searchMovie).toHaveBeenCalled();
  });
});
