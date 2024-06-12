<template>
  <div class="tabs__content" v-show="title === selectedTitle">
    <slot></slot>
  </div>
</template>

<script lang="ts">

import {defineComponent, inject} from "vue";

export default defineComponent({
  name: 'VTab',
  
  props: ['title'],
  
  setup() {
    const selectedTitle = inject('selectedTitle')
    
    return { selectedTitle }
  },
  
  data: () => ({
  
  }),
  
  computed: {
  
  },
  
})

</script>

<style scoped lang="scss">



</style>