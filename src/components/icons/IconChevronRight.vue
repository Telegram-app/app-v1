<template>
  <svg :height="h" :width="w" viewBox="0 0 45 70" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.5293 59.8083L27.3376 35L2.5293 10.1375L10.1668 2.5L42.6668 35L10.1668 67.5L2.5293 59.8083Z" fill="black"/>
  </svg>
</template>

<script lang="ts">

import { defineComponent } from "vue";

export default defineComponent ({
    name: 'IconChevronRight',

    props: ['h', 'w']
})
</script>

<style lang="scss" scoped>

svg {
  path {
    fill: var(--tg-theme-button-color, $tg-button-color);
  }
}

</style>