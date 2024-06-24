<template>
  <div class="store__filters__skeleton">
    <div class="skeleton-gradient-animation"></div>
    <div class="skeleton-gradient-animation"></div>
    <div class="skeleton-gradient-animation"></div>
  </div>
</template>

<script lang="ts">

import {defineComponent} from 'vue';

export default defineComponent({
  name: 'StoreTabsSkeleton',
})

</script>

<style scoped lang="scss">


.store__filters__skeleton {
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 40px;
  margin: 0 -15px;
  height: 35px;
  padding: 0 15px;
  
  background: theme-var-tg(--tg-theme-bg-color, $--tg-bg-color);;
  
  overflow: hidden;
  
  border-bottom: 0.5px solid rgba(0, 0, 0, 0.2);
  
  div {
    flex: 0 0 21%;
    height: 15px;
  }
}

</style>