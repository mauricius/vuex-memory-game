import Vue from "vue";
import Vuex from "vuex";
import seed from "./data/cards";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    playing: false,
    paused: false,
    clicks: 0,
    guess1: null,
    guess2: null,
    cards: []
  },
  mutations: {
    start(state) {
      state.cards = seed();
      state.playing = true;
      state.clicks = 0;
    },
    pause(state) {
      state.paused = true;
    },
    resume(state) {
      state.paused = false;
    },
    flip(state, payload) {
      const cardClicked = state.cards.find(card => card.id === payload.id);

      state.clicks++;

      if (state.clicks % 2 == 1) {
        state.guess1 = cardClicked.id;
        state.guess2 = null;

        state.cards = state.cards.map(card => {
          if (card.id === payload.id) {
            card.flipped = true;
          } else {
            card.flipped = false;
          }

          return card;
        });
      } else {
        if (cardClicked.rel === state.guess1) {
          state.guess2 = cardClicked.rel;
          state.cards = state.cards.map(card => {
            if (card.id === payload.id || card.id === state.guess1) {
              card.flipped = true;
              card.discovered = true;
            }

            return card;
          });
        } else {
          state.guess2 = cardClicked.rel;

          state.cards = state.cards.map(card => {
            if (card.id === payload.id) {
              card.flipped = true;
            }

            return card;
          });
        }
      }
    }
  },
  getters: {
    completed: state => {
      return (
        state.cards.length &&
        state.cards.filter(card => card.discovered).length ===
          state.cards.length
      );
    },
    discovered: state => {
      return state.cards.length
        ? state.cards.filter(card => card.discovered).length / 2
        : 0;
    },
    round: state => {
      return Math.round(state.clicks / 2);
    },
    score: (state, getters) => {
      return Math.round((getters.discovered / getters.round) * 1000);
    }
  }
});
