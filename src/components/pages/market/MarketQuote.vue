<template>
  <div class="market__quote">
    <span class="caption">{{ data.caption }}</span>
    <div class="market__quote__text">{{ data.text }}</div>
  </div>
</template>

<script lang="ts">

import {defineComponent, ref} from 'vue';

interface Data {
  caption: string,
  text: string
}

const loadData = async () => {
  return new Promise<Data>((resolve) => {
    setTimeout(() => {
      resolve({
        caption: 'Marcus Aurelius',
        text: 'What we do now echoes in eternity'
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
  margin-top: 15px;
  
  &__text {
    margin-top: 10px;
    padding: 10px 17px;
    border-radius: 10px;
    
    font-size: 12px;
    line-height: 1;
    
    color: theme-var-tg(--tg-theme-hint-color, $--tg-hint-color);
    background-color: theme-var($--card-bg-color);
  }
}

</style>