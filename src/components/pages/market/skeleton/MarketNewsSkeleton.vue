<template>
  <div class="market__news__skeleton">
    <span class="skeleton-gradient-animation"></span>
    
    <div>
      <div class="skeleton-gradient-animation"></div>
      <div class="skeleton-gradient-animation"></div>
      <div class="skeleton-gradient-animation"></div>
    </div>
  </div>
</template>

<script lang="ts">

import {defineComponent, ref} from 'vue';

export default defineComponent({
  name: 'MarketNews'
});

</script>

<style scoped lang="scss">

.market__news__skeleton {
  position: relative;
  margin: 10px -10px 0;
  width: calc(100% + 20px);
  padding: 0 10px;
  
  overflow: hidden;
  
  span {
    display: flex;
    margin-bottom: 8px;
    height: 12px;
    width: 35%;
    border-radius: 8px;
  }
  
  & > div {
    display: flex;
    column-gap: 10px;
    height: 120px;
    width: 120px;
    
    & > div {
      flex: 0 0 120px;
      height: 100%;
      width: 120px;
      border-radius: 10px;
    }
  }
}

</style>