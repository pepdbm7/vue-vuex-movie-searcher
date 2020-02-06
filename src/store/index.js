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
    currentPage: 1,
    totalPages: 1,
    detailsMovie: {},
    cartmovies: [],
    error: "",
    loading: false
  },
  getters: {
    getCurrentSearch: state => state.search,
    getMovies: ({ movies }) =>
      JSON.parse(localStorage.getItem("movies")) || movies,
    getPagination: ({ currentPage, totalPages }) => ({
      currentPage,
      totalPages
    }),
    getDetailsMovie: ({ detailsMovie }) => detailsMovie,
    getCartMovies: ({ cartmovies }) =>
      JSON.parse(localStorage.getItem("cartmovies")) || cartmovies,
    getError: ({ error }) => error,
    getLoading: ({ loading }) => loading
  },
  mutations: {
    //search:
    setSearch: (state, payload) => {
      state.search = payload;
    },
    clearSearch: state => {
      state.search = "";
      state.movies = [];
      localStorage.setItem("movies", JSON.stringify([]));
    },

    //movies:
    setMovies: (state, payload) => {
      state.movies = payload;
      localStorage.setItem("movies", JSON.stringify(payload));
    },
    clearMovies: state => {
      state.movies = [];
      localStorage.setItem("movies", JSON.stringify([]));
    },

    //pagination:
    setPagination: (state, payload) => {
      state.currentPage = payload.page;
      state.totalPages = payload.total_pages;
      localStorage.setItem("currentpage", JSON.stringify(payload.page));
    },
    clearPagination: state => {
      state.currentPage = 1;
      state.totalPages = 1;
      localStorage.setItem("currentpage", JSON.stringify(0));
    },

    //movie details:
    setMovieDetails: (state, payload) => (state.detailsMovie = payload),
    clearDetails: state => {
      state.detailsMovie = {};
    },

    //cart:
    addToCart: (state, payload) => {
      state.cartmovies.push(payload);
      localStorage.setItem("cartmovies", JSON.stringify(state.cartmovies));
    },
    removeFromCart: (state, payload) => {
      const removedMovie = state.cartmovies.filter(
        movie => movie.id !== payload
      );
      state.cartmovies = removedMovie;
      localStorage.setItem("cartmovies", JSON.stringify(state.cartmovies));
    },
    clearCart: state => {
      state.cartmovies = [];
      localStorage.setItem("cartmovies", JSON.stringify([]));
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
    //search:
    setSearch: ({ commit }, payload) => commit("setSearch", payload),
    clearSearch: ({ commit }) => commit("clearSearch"),
    //all movies:
    searchMovies: async ({ commit }, { query, requestPage = 1 }) => {
      try {
        commit("clearError");
        commit("clearMovies");
        commit("setLoading", true);

        const {
          data: { page, total_pages, results }
        } = await axios.get(
          `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${query}&page=${requestPage}`
        );
        debugger;

        if (results.length) {
          //intentionally delayed to show spinner longer:
          setTimeout(() => {
            commit("setMovies", results);
            commit("setPagination", { page, total_pages });
            commit("setLoading", false);
            debugger;
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
    //details:
    setMovieDetails: ({ commit }, payload) => {
      commit("setMovieDetails", payload);
    },
    clearDetails: ({ commit }) => commit("clearDetails"),
    //cart:
    addToCart: async ({ commit, state }, payload) => {
      try {
        commit("clearError");
        commit("setLoading", true);
        const alreadyInCart =
          (await state.cartmovies.findIndex(movie => movie.id === payload.id)) >
          -1;

        if (alreadyInCart) {
          setTimeout(() => {
            commit("clearError");
          }, 1500);
          commit("setError", "Already in cart!");
          commit("setLoading", false);
        } else {
          commit("setLoading", false);
          commit("addToCart", payload);
        }
      } catch (err) {
        setTimeout(() => {
          commit("clearError");
        }, 1500);
        commit("setError", err.message);
        commit("setLoading", false);
      }
    },
    removeFromCart: ({ commit }, payload) => {
      commit("removeFromCart", payload);
    },
    clearCart: ({ commit }) => commit("clearCart")
  }
});
