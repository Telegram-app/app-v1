<template>
  <div class="market__quote">
    <span class="caption">{{ data.caption }}</span>
  </div>
</template>

<script lang="ts">

import {defineComponent, ref} from 'vue';

interface Data {
  caption: string
}

const loadData = async () => {
  return new Promise<Data>((resolve) => {
    setTimeout(() => {
      resolve({
        caption: 'Marcus Aurelius'
      });
    }, 2000);
  });
};
export default defineComponent({
  name: 'MarketQuote',
  
  async setup() {
    const data = ref(await loadData());
    
    return {data};
  }
});

</script>

<style scoped lang="scss">

.market__quote {
  display: flex;
  margin-top: 10px;
}

</style>