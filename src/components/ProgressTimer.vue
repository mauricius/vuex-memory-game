<template>
  <p class="f4 ma0">{{ hours | twoDigits }} : {{ minutes | twoDigits }} : {{ seconds | twoDigits }}</p>
</template>

<script>
let interval = null;

export default {
  name: "ProgressTimer",
  props: {
    paused: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      now: 0
    };
  },
  created() {
    this.startInterval();
  },
  computed: {
    seconds() {
      return Math.trunc(this.now) % 60;
    },
    minutes() {
      return Math.trunc(this.now / 60) % 60;
    },
    hours() {
      return Math.trunc(this.now / 60 / 60) % 24;
    }
  },
  methods: {
    startInterval() {
      interval = setInterval(() => {
        if (!this.paused) {
          this.now += 1;
        }
      }, 1000);
    }
  },
  filters: {
    twoDigits(value) {
      if (value.toString().length <= 1) {
        return "0" + value.toString();
      }
      return value.toString();
    }
  },
  destroyed() {
    clearInterval(interval);
  }
};
</script>
