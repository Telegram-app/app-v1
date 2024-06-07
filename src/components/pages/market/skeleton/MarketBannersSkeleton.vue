<template>
  <div class="market__banners__skeleton">
    <div></div>
    <div></div>
    <div></div>
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
  column-gap: 15px;
  height: 165px;
  width: calc(100% + 30px);
  margin: 0 -15px 0;
  
  overflow: hidden;
  
  div {
    flex-grow: 1;
    flex-shrink: 1;
    width: 305px;
    height: 100%;
    border-radius: 10px;
    
    background-color: #ddd;
    
    animation: 1.5s infinite pulse-bg;
    
    &:nth-child(2) {
      flex: 1 0 auto;
    }
  }
}

</style>