<template>
  <div class="store__filters__skeleton">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
</template>

<script lang="ts">

import {defineComponent, ref} from 'vue';

export default defineComponent({
  name: 'StoreFiltersSkeleton',
})

</script>

<style scoped lang="scss">


.store__filters__skeleton {
  display: flex;
  column-gap: 10px;
  width: calc(100% + 30px);
  margin: 15px -15px 0;
  padding: 0 15px;
  
  overflow: hidden;
  
  div {
    flex: 0 0 27%;
    height: 40px;
    border-radius: 10px;
    
    animation: 1.5s infinite pulse-bg;
  }
}

</style>