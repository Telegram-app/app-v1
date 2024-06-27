<template>
  <div class="market__banners__skeleton">
    <div class="skeleton-gradient-animation"></div>
    <div class="skeleton-gradient-animation"></div>
    <div class="skeleton-gradient-animation"></div>
  </div>
</template>

<script lang="ts">

import {defineComponent} from 'vue';

export default defineComponent({
  name: 'MarketBannersSkeleton'
});

</script>

<style scoped lang="scss">

.market__banners__skeleton {
  position: relative;
  
  display: flex;
  justify-content: center;
  column-gap: 5px;
  height: 110px;
  width: calc(100% + 30px);
  margin: -5px -15px 0;
  
  overflow: hidden;
  
  div {
    flex-grow: 1;
    flex-shrink: 1;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    
    background-color: #ddd;
    
    &:nth-child(2) {
      flex: 1 0 auto;
      width: calc(100% - 30px);
    }
  }
}

</style>