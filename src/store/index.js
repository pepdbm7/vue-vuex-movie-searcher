import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
require("dotenv").config();

Vue.use(Vuex);

const api_key = process.env.VUE_APP_API_KEY;

export default new Vuex.Store({
  state: {
    search: "",
    movies: [],
    detailsMovie: {},
    error: "",
    loading: false
  },
  getters: {
    getCurrentSearch: state => state.search,
    getDetailsMovie: ({ detailsMovie }) => detailsMovie,
    getMovies: ({ movies }) =>
      JSON.parse(localStorage.getItem("movies")) || movies,
    getError: ({ error }) => error,
    getLoading: ({ loading }) => loading
  },
  mutations: {
    //search:
    setSearch(state, payload) {
      state.search = payload;
    },
    clearSearch: state => {
      state.search = "";
      state.movies = [];
      localStorage.clear();
    },

    //movies:
    setMovies(state, payload) {
      state.movies = payload;
      localStorage.setItem("movies", JSON.stringify(payload));
    },
    clearMovies: state => {
      state.movies = [];
      localStorage.clear();
    },

    //movie details:
    setMovieDetails: (state, payload) => {
      console.log(payload);
      state.detailsMovie = payload;
    },
    clearDetails: state => {
      state.detailsMovie = {};
    },

    //errors:
    setError: (state, payload) => {
      state.error = payload;
    },
    clearError: state => (state.error = ""),

    //loading:
    setLoading: (state, payload) => (state.loading = payload)
  },
  actions: {
    setSearch: ({ commit }, payload) => commit("setSearch", payload),
    clearSearch: ({ commit }) => commit("clearSearch"),
    searchMovies: async ({ commit }, payload) => {
      try {
        commit("clearError");
        commit("clearMovies");
        commit("setLoading", true);

        const { data } = await axios.get(
          `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${payload}`
        );

        if (data.results.length !== 0) {
          setTimeout(() => {
            //to make spinner more visible
            commit("setMovies", data.results);
            commit("clearError");
            commit("setLoading", false);
          }, 500);
        } else {
          setTimeout(() => {
            commit("clearError");
          }, 1500);
          commit("setError", "No movies found");
          commit("setLoading", false);
        }
      } catch (err) {
        setTimeout(() => {
          commit("clearError");
        }, 1500);
        commit("setError", err.message);
        commit("setLoading", false);
      }
    },
    setMovieDetails: ({ commit }, payload) => {
      commit("setMovieDetails", payload);
    },
    clearDetails: ({ commit }) => commit("clearDetails")
  }
});
