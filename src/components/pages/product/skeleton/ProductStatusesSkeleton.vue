<template>
  <div class="product__statuses__skeleton">
    <div></div>
  </div>
</template>

<script lang="ts">

import { defineComponent } from "vue";

export default defineComponent({
  name: 'ProductStatusesSkeleton',
})

</script>

<style scoped lang="scss">

.product__statuses__skeleton {
  display: flex;
  flex-direction: column;
  margin-top: 15px;
  
  div {
    height: 23px;
    width: 100%;
    border-radius: 10px 10px 0 0;
    
    animation: 1.5s infinite pulse-bg;
  }
}

</style>