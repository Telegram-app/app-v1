<template>
  <div class="market__quote__skeleton">
    <span class="skeleton-gradient-animation"></span>
    <div>
      <div class="skeleton-gradient-animation"></div>
    </div>
  </div>
</template>

<script lang="ts">

import {defineComponent} from 'vue';

export default defineComponent({
  name: 'MarketQuoteSkeleton'
});

</script>

<style scoped lang="scss">

.market__quote__skeleton {
  margin-top: 15px;
  
  span {
    display: inline-block;
    height: 12px;
    width: 35%;
    border-radius: 8px;
  }
  
  & > div {
    margin-top: 10px;
    padding: 10px 17px;
    border-radius: 10px;
    
    color: theme-var-tg(--tg-theme-hint-color, $--tg-hint-color);
    background-color: theme-var($--card-bg-color);
    
    div {
      height: 12px;
      width: 70%;
      border-radius: 8px;
    }
  }
}

</style>