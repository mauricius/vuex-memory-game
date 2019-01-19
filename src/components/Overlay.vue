<template>
  <div class="left-0 top-0 z-2 flex flex-column items-center justify-center w-100 h-100 fixed bg-black-70">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "overlay"
};
</script>
