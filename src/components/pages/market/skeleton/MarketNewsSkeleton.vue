<template>
  <div class="market__news__skeleton">
    <div></div>
    <div></div>
    <div></div>
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
  
  display: flex;
  column-gap: 15px;
  margin: 15px -15px 0;
  height: 198px;
  width: calc(100% + 30px);
  padding: 0 15px;
  
  overflow: hidden;
  
  div {
    flex: 0 0 120px;
    height: 100%;
    width: 120px;
    border-radius: 10px;
    
    animation: 1.5s infinite pulse-bg;
  }
}

</style>