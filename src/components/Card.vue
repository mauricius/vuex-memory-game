<template>
  <div class="card relative ba br2 b--black pointer" :class="{ 'flipped' : flipped, 'pulse': discovered }" @click="$emit('flip', id)">
    <div class="front absolute top-0 left-0"></div>
    <div class="back absolute top-0 left-0">
      <img :src="url" :alt="id" />
    </div>
  </div>
</template>

<script>
export default {
  name: "card",
  props: {
    id: {
      type: Number,
      required: true
    },
    url: {
      type: String,
      required: true
    },
    flipped: {
      type: Boolean,
      required: true
    },
    discovered: {
      type: Boolean,
      required: true
    }
  }
};
</script>

<style scoped>
img {
  font-weight: 300;
  line-height: 2;
  text-align: center;

  width: 100%;
  height: auto;
  display: block;
  position: relative;
}

img:before {
  content: "We're sorry, the image is broken :(";
  display: block;
  margin-bottom: 1em;
}

img:after {
  content: "Search the card with the same url: " attr(src);
  display: block;
  font-size: 12px;
}
</style>
