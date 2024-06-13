<template>
  <div class="store__header">
    <div class="store__header__wrapper" :class="{ 'store__header__wrapper--expand': expand }" @click="expand = !expand">
      <img class="store__header__image" :class="{ 'store__header__image--expand': expand }" :src="'/images/market/' + data.image" alt="store-image">
      
      <div class="store__header__title" :class="{ 'store__header__title--expand': expand }">
        <div>
          <h1>{{ data.name }}</h1>
        </div>
        <div>
          <span>Выполненные сделки: {{ data.deals.quantity === 0 ? '0' : data.deals.completed + ' · ' + Math.floor(data.deals.completed / data.deals.quantity * 100) }}%</span>
        </div>
      </div>
    </div>
    
    <div class="store__header__description self-card">
      <h6 class="store__header__description__title">Описание</h6>
      <p class="store__header__description__text" :class="{'store__header__description__text--open': showMoreDesc}">
        {{ showMoreDesc ? data.description : kitcut(data.description, 160) }}
        <span class="store__header__description__show-more">
          <a @click="reviewShowMoreFunc()" v-if="data.description.length > 160">{{ showMoreDesc ? 'Свернуть' : 'Еще' }}</a>
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
    kitcut(text: string, limit: number) {
      text = text.trim();
      if (text.length <= limit) return text;
      
      text = text.slice(0, limit);
      let lastSpace = text.lastIndexOf(' ');
      if (lastSpace > 0) {
        text = text.substr(0, lastSpace);
      }
      return text;
    },
    
    reviewShowMoreFunc() {
      this.showMoreDesc = !this.showMoreDesc;
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
    
    transition: 1s all;
    
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
    
    transition: 0.5s all;
    
    &--expand {
      max-height: 100%;
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
      font-family: "SF Pro Text Medium", sans-serif;
      line-height: 1;
      
      transition: all 0.5s linear;
    }
    
    span {
      transform: translateX(-50%);
      
      display: inline-block;
      
      font-size: 14px;
      font-family: "SF Pro Text Light", sans-serif;
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
    margin-top: 15px;
    
    transition: 1s all;
    
    &__title {
      font-size: 12px;
      font-family: "SF Pro Text Medium", sans-serif;
    }
    
    &__text {
      font-size: 12px;
      font-family: "SF Pro Text Regular", sans-serif;
      
      color: theme-var-tg(--tg-theme-text-color, $--tg-text-color);
      
      &--open {
        .store__header__description__text--open {
          min-width: 65px;
          
          background-color: unset;
        }
      }
    }
    
    &__show-more {
      display: inline-block;
      min-width: 10px;
      padding-left: 20px;
      
      a {
        position: absolute;
        right: 17px;
        bottom: 10px;
        
        padding-left: 25px;
        
        font-size: 13px;
        
        background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 40%);
      }
    }
  }
}

</style>