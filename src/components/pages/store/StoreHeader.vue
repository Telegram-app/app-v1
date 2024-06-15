<template>
  <div class="store__header">
    <div class="store__header__wrapper" :class="{ 'store__header__wrapper--expand': expand }" @click="expand = !expand">
      <img class="store__header__image" :class="{ 'store__header__image--expand': expand }" :src="'/images/market/' + data.image" alt="store-image">
      
      <div class="store__header__title" :class="{ 'store__header__title--expand': expand }">
        <div>
          <h1>{{ data.name }}</h1>
        </div>
        <div>
          <span>выполненные сделки: {{ data.deals.completed }}</span>
        </div>
      </div>
    </div>
    
    <div class="store__header__description self-card" :class="{'store__header__description--open': showMoreDesc}">
      <h6 class="store__header__description__title">описание</h6>
      <p class="store__header__description__text">
        {{ data.description }}
        <span class="store__header__description__show-more" v-if="!showMoreDesc">
          <a @click="reviewShowMoreFunc()" v-if="data.description.length > 160">ещё</a>
        </span>
      </p>
    </div>
  </div>
</template>

<script lang="ts">

import {defineComponent, type PropType, ref} from 'vue';

interface Data {
  image: string;
  name: string;
  id: string;
  deals: {
    quantity: number;
    completed: number;
  };
  description: string;
}

const loadHeader = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 2000);
  });
};

export default defineComponent({
  name: 'StoreHeader',
  
  props: {
    data: {
      type: Object as PropType<Data>,
      required: true
    }
  },
  
  async setup() {
    const load = ref(await loadHeader());
    
    return {load};
  },
  
  mounted() {
    let headerWrapper = document.querySelector<HTMLElement>('.store__header__wrapper')!;
    let titleWrapper = document.querySelector<HTMLElement>('.store__header__title')!;
    
    headerWrapper.style.marginBottom = titleWrapper.clientHeight + 15 + 'px'
  },
  
  data: () => ({
    expand: false,
    showMoreDesc: false
  }),
  
  methods: {
    reviewShowMoreFunc() {
      this.showMoreDesc = !this.showMoreDesc;

      let text = document.querySelector<HTMLElement>('.store__header__description__text')!
      let descOpened = document.querySelector<HTMLElement>('.store__header__description')!

      if (this.showMoreDesc) {
        descOpened.style.maxHeight = text.clientHeight + 41 + 'px'
      } else {
        descOpened.style.maxHeight = '110px';
      }
    },
  }
});

</script>

<style scoped lang="scss">

.store__header {
  &__wrapper {
    position: relative;
    
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0 -15px 58px;
    
    transition: 1s all, margin 0.2s;
    
    &--expand {
      margin-top: -15px;
      margin-bottom: 0 !important;
    }
  }
  
  &__image {
    min-height: 80px;
    max-height: 80px;
    min-width: 80px;
    max-width: 80px;
    border-radius: 100%;
    
    object-fit: cover;
    object-position: center 20%;
    
    transition: 0.5s all;
    
    &--expand {
      min-height: 200px;
      max-height: 350px;
      min-width: 100%;
      max-width: 100%;
      border-radius: 0;
    }
  }
  
  &__title {
    position: absolute;
    bottom: -50px;
    
    width: 100%;
    
    transition: all 0.5s linear;
    
    div {
      transform: translateX(50%);
      
      display: block;
      
      transition: all 0.5s linear;
      
      &:last-child {
        margin-top: -5px;
      }
    }
    
    h1 {
      transform: translateX(-50%);
      
      display: inline-block;
      
      font-size: 20px;
      font-family: "Helvetica Neue Cyr Medium", "Helvetica Neue", sans-serif;
      font-weight: 400;
      line-height: 1;
      
      transition: all 0.5s linear;
    }
    
    span {
      transform: translateX(-50%);
      
      display: inline-block;
      
      font-size: 14px;
      font-family: "Helvetica Neue Cyr Light", "Helvetica Neue", sans-serif;
      font-weight: lighter;
      line-height: 1;
      
      transition: all 0.5s linear;
    }
    
    &--expand {
      bottom: 10px;
      left: 10px;
      
      div {
        transform: translateX(0);
      }
      
      h1, span {
        transform: translateX(-0%);
        
        color: #ffffff;
      }
    }
  }
  
  &__description {
    position: relative;
    
    margin-top: 15px;
    max-height: 102px;
    margin-bottom: -10px;
    padding: 4px 12px;
    border-bottom: 4px solid theme-var-tg(--tg-theme-bg-color, $--tg-bg-color);

    overflow: hidden;
    
    transition: 1s max-height;
    
    &__title {
      font-size: 12px;
      font-family: "Helvetica Neue Cyr Roman", "Helvetica Neue", sans-serif;
      font-weight: 200;
    }
    
    &__text {
      font-size: 12px;
      font-family: "Helvetica Neue Cyr Roman", "Helvetica Neue", sans-serif;
      font-weight: normal;
      
      color: theme-var-tg(--tg-theme-text-color, $--tg-text-color);
    }
    
    &__show-more {
      display: inline-block;
      min-width: 10px;
      padding-left: 20px;
      
      a {
        position: absolute;
        right: 12px;
        bottom: 4px;
        
        padding-left: 25px;
        
        font-size: 13px;
        
        background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 40%);

        transition: 1s all;
      }
    }

    &--open {
      .store__header__description__show-more {
        min-width: 71px;
        
        a {
          background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 30%);
        }
      }
    }
  }
}

</style>