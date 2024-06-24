<template>
  <div class="product__images__skeleton">
    <div class="skeleton-gradient-animation"></div>
  </div>
</template>

<script lang="ts">

import { defineComponent } from "vue";

export default defineComponent({
  name: 'ProductImagesSkeleton',
  
  props: [],
  
  data: () => ({
  
  }),
  
  computed: {
  
  },
  
})

</script>

<style scoped lang="scss">

.product__images__skeleton {
  display: flex;
  justify-content: center;
  
  div {
    height: 300px;
    width: 300px;
    border-radius: 10px;
  }
}

</style>