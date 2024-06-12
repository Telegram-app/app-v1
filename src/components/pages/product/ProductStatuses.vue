<template>
  <div class="product__statuses">
    <div class="product__statuses__status product__statuses__status__top-sales">Top sales</div>
  </div>
</template>

<script lang="ts">

import { defineComponent, ref } from "vue";

const loadStatus = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 2000);
  });
};

export default defineComponent({
  name: 'ProductStatuses',
  
  async setup() {
    const load = ref(await loadStatus())
    
    return {load}
  }
})

</script>

<style scoped lang="scss">

.product__statuses {
  display: flex;
  flex-direction: column;
  margin-top: 15px;
  
  &__status {
    width: 100%;
    padding: 4px 0;
    text-align: center;
    
    font-size: 10px;
    font-family: "SF Pro Text Semibold", sans-serif;
    text-transform: uppercase;
    
    &__top-sales {
      border-radius: 10px 10px 0 0;
      
      color: #000000;
      background: linear-gradient(90deg, #D4FFDB 0%, #E9FD5D 100%);
    }
  }
}

</style>