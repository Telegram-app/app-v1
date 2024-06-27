<template>
  <div class="reviews__image">
    <img src="/images/market/stores/products/reviews-image.png" alt="reviews-image"/>
  </div>
</template>

<script lang="ts">

import {defineComponent, ref} from 'vue';

const loadData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, 2000)
  })
}

export default defineComponent({
  name: 'ReviewsImage',
  
  async setup() {
    const loadDataImage = ref(await loadData())
    
    return { loadDataImage }
  },
})

</script>

<style scoped lang="scss">

.reviews__image {
  display: flex;
  justify-content: flex-end;
}

</style>