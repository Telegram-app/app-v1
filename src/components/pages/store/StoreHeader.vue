<template>
  <div class="store__header">
    <div class="store__header__image">
      <img :src="'/images/market/' + data.image" alt="store-image">
    </div>
    
    <div class="store__header__title__wrapper self-card">
      <h1 class="store__header__title">{{ data.name }}</h1>
      <span class="store__header__id">{{ data.id }}</span>
    </div>
    
    <div class="store__header__description self-card">
      <p class="store__header__description__text">{{ data.description }}</p>
    </div>
  </div>
</template>

<script lang="ts">

import {defineComponent, type PropType, ref} from 'vue';

interface Data {
  image: string;
  name: string;
  id: string;
  description: string;
}

const loadHeader = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, 2000)
  })
}

export default defineComponent({
  name: 'StoreHeader',
  
  props: {
    data: {
      type: Object as PropType<Data>,
      required: true
    }
  },
  
  async setup() {
    const load = ref(await loadHeader())
    
    return { load };
  }
})

</script>

<style scoped lang="scss">

.store__header {
  &__image {
    height: 100px;
    width: 100%;
    
    img {
      height: 100%;
      width: 100%;
      border-radius: 10px;
    }
  }
  
  &__title {
    font-size: 15px;
    font-family: "SF Pro Text Medium", sans-serif;
    
    &__wrapper {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 12px;
    }
  }
  
  &__id {
    font-size: 10px;
  }
  
  &__description {
    margin-top: 15px;
    
    &__text {
      font-size: 12px;
      
      color: theme-var-tg(--tg-theme-hint-color, $--tg-hint-color);;
    }
  }
}

</style>