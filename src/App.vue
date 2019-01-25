<template>
  <div id="app" class="pa4">
    <button v-if="!playing" @click="start" class="pointer grow dib v-mid bg-green white ph3 pv2 mb3">
      New Game
    </button>

    <overlay v-if="paused">
      <h2 class="f2 f1-l fw2 white-90 mb1 lh-title mt0 mb3">Game Paused</h2>
      <button class="pointer grow dib v-mid bg-green white ph3 pv2 mb3" @click="resume">Resume</button>
    </overlay>

    <div v-if="playing" class="pb3">
      <progress-timer v-if="rendered" :paused="paused || completed" />

      <p v-if="playing" class="f5">Round: {{ round }} | Discovered: {{ discovered }}</p>

      <button class="pointer grow dib v-mid bg-orange white ph3 pv2 mb3" @click="pause" v-bind:disabled="paused">
        {{ paused ? 'Paused' : 'Pause' }}
      </button>
    </div>

    <overlay v-if="completed">
      <h2 class="f2 f1-l fw2 white-90 mb1 lh-title mt0 mb3">Congratulations! You did it!</h2>
      <h4 class="f4 white-90 fw2 mt0 mb3">Your score: {{ score }}</h4>
      <button @click="restart" class="pointer grow dib v-mid bg-orange white ph3 pv2 mb3">
        Restart
      </button>
    </overlay>

    <div v-if="playing" class="container">
      <card
        v-for="card in cards"
        :key="card.id"
        :id="card.id"
        :url="card.url"
        :flipped="card.flipped || card.discovered"
        :discovered="card.discovered"
        @flip="onFlip"
      ></card>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { mapState, mapGetters } from "vuex";
import Overlay from "./components/Overlay.vue";
import Card from "./components/Card.vue";
import ProgressTimer from "./components/ProgressTimer.vue";

export default {
  name: "app",
  components: {
    card: Card,
    overlay: Overlay,
    "progress-timer": ProgressTimer
  },
  data: function () {
    return {
      rendered: true
    }
  },
  methods: {
    start() {
      this.$store.commit("start");
    },
    onFlip(id) {
      this.$store.commit("flip", { id });
    },
    pause() {
      this.$store.commit("pause");
    },
    resume() {
      this.$store.commit("resume");
    },
    restart() {
      this.rendered = false;

      Vue.nextTick().then(() => {
        this.rendered = true;

        this.$store.commit('start');
      });
    }
  },
  computed: {
    ...mapState({
      cards: state => state.cards,
      playing: state => state.playing,
      paused: state => state.paused
    }),
    ...mapGetters(["discovered", "completed", "round", "score"])
  }
};
</script>

<style lang="scss" src="./app.scss">
</style>
