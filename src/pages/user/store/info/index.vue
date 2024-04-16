<template>
  <div class="store-info">
    <div class="store-info__header">
      <IconStar h="12" w="12"/>
      <span class="store-info__header__name">{{ store.name }}</span>
      <span class="store-info__header__id">{{ store.id }}</span>
    </div>
    
    <div class="store-info__premium-info self-card">
      The free version of Telegram offers users more than any other messenger, and with Telegram Premium your options will become even wider.
    </div>
    
    <div class="store-info__links">
      <div class="store-info__links__links self-card">
        <div class="store-info__links__link">
          <div class="store-info__links__link__icon">
            <img :src="'/images/icons/selfStore/' + links[0].icon + '.svg'" alt="icon">
          </div>
          
          <div class="store-info__links__link__title">
            {{ links[0].title }}
          </div>
          
          <div class="store-info__links__link__meta" :class="['store-info__links__link__meta__' + links[0].icon]" v-if="links[0].meta">
            {{ links[0].meta }}
          </div>
          
          <div class="store-info__links__link__to">
            <IconChevronRight h="11" w="7" color="transparent-grey"/>
          </div>
        </div>
      </div>
      
      <div class="self-card">
        <template v-for="(link, i) in links.slice(1)" :key="'link-' + i">
          <div class="store-info__links__link" @click="router.push(link.to)">
            <div class="store-info__links__link__icon">
              <img :src="'/images/icons/selfStore/' + link.icon + '.svg'" alt="icon">
            </div>
            
            <div class="store-info__links__link__title">
              {{ link.title }}
            </div>
            
            <div class="store-info__links__link__meta" :class="['store-info__links__link__meta__' + link.icon]" v-if="link.meta">
              {{ link.metaTitle ? link.metaTitle + ':' : '' }} {{ link.meta }}{{ link.metaTitle === 'Balance' ? '$' : '' }}
            </div>
            
            <div class="store-info__links__link__to">
              <IconChevronRight h="11" w="7" color="transparent-grey"/>
            </div>
          </div>
          
          <div class="divider" v-if="i !== links.slice(1).length - 1"></div>
        </template>
      </div>
    </div>
    
    <div class="store-info__add-items">
      <div class="store-info__add-items__wrapper">
        <IconAdd h="14" w="14"/>
        <span class="store-info__add-items__label">Add new items</span>
      </div>
    </div>
    
    <div class="store-info__news">
      <swiper
        :slides-per-view="'auto'"
        :free-mode="true"
        :space-between="15"
        :speed="600"
        :modules="modules"
        class="store-info__news__swiper"
      >
        <swiper-slide class="store-info__news__swiper__slide" v-for="i of 4" :key="'slide-' + i">
          <div class="store-info__news__item self-card">
            <div class="is-flex is-flex-direction-column is-justify-content-space-between">
              <div class="store-info__news__item__text">Find out what's new in the wallet</div>
              <div class="store-info__news__item__read-more">
                <span>Read</span>
                <IconChevronRight h="9" w="5"/>
              </div>
            </div>
            <div class="store-info__news__item__image">
              <img src="/images/create-shop.png" alt="image">
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<route lang="json">
{
"name": "storeInfo"
}
</route>

<script lang="ts">

import {defineComponent} from 'vue';
import {useUserStore} from '@/stores/user.ts';

import {Swiper, SwiperSlide} from 'swiper/vue';
import {FreeMode} from 'swiper/modules';

import 'swiper/css';
import {useRouter} from 'vue-router';

export default defineComponent({
  name: 'StoreInfoPage',
  components: {Swiper, SwiperSlide},
  
  props: [],
  
  setup() {
    const router = useRouter()
    const userStore = useUserStore();
    
    return {router, userStore, modules: [FreeMode]};
  },
  
  mounted() {
    if (window.Telegram.WebApp) {
      window.Telegram.WebApp.MainButton.setParams({
        is_active: false,
        is_visible: false
      });
    }
  },
  
  data: () => ({
    links: [
      {icon: 'premoder', title: 'Awaiting pre-moderation', metaTitle: undefined, meta: 17, to: 'notFound'},
      {icon: 'orders', title: 'Orders', metaTitle: 'Orders awaiting attention', meta: 10, to: 'info/orders'},
      {icon: 'finances', title: 'Finances', metaTitle: 'Balance', meta: 100, to: 'info/finances'},
      {icon: 'products', title: 'Products', metaTitle: 'Active', meta: 50, to: 'notFound'},
      {icon: 'reviews', title: 'Reviews', metaTitle: 'New in the last 24 hours', meta: 10, to: 'notFound'},
      {icon: 'staff', title: 'Staff', metaTitle: 'Active employees in the last 24 hours', meta: 5, to: 'info/employers'},
      {icon: 'clients', title: 'Clients', metaTitle: undefined, meta: undefined, to: 'info/clients'},
      {icon: 'messenger', title: 'Messenger', metaTitle: 'Unread messages', meta: 5, to: 'notFound'},
      {icon: 'statistics', title: 'Statistics', metaTitle: undefined, meta: undefined, to: 'notFound'},
      {icon: 'activity-log', title: 'Activity log', metaTitle: 'Actions in the last 24 hours', meta: 10, to: 'notFound'},
      {icon: 'settings', title: 'Settings', metaTitle: undefined, meta: undefined, to: 'notFound'},
    ]
  }),
  
  computed: {
    store() {
      return this.userStore.selfStore.data!;
    }
  },
  
});

</script>

<style scoped lang="scss">

.store-info {
  &__header {
    position: relative;
    
    display: flex;
    align-items: center;
    justify-content: center;
    margin: -15px -15px 0;
    padding: 11px 17px;
    
    background: linear-gradient(270deg, rgba(105, 189, 254, 0.76) 0%, #4D98FD 100%);
    
    &__name {
      margin-left: 10px;
      
      font-size: 15px;
      font-family: "SF Pro Text Semibold", sans-serif;
      
      color: theme-var-tg(--tg-theme-button-text-color, $--tg-button-text-color);
    }
    
    &__id {
      position: absolute;
      right: 17px;
      
      font-size: 10px;
      
      color: theme-var-tg(--tg-theme-button-text-color, $--tg-button-text-color);
    }
  }
  
  &__premium-info {
    margin-top: 15px;
    
    font-size: 12px;
    
    color: theme-var-tg(--tg-theme-hint-color, $--tg-hint-color);
  }
  
  &__links {
    margin-top: 15px;
    
    .self-card {
      &:last-child {
        margin-top: 15px;
      }
    }
    
    .divider {
      margin: 7px 0;
    }
    
    &__link {
      display: flex;
      align-items: center;
      
      cursor: pointer;
      
      &__icon {
        display: flex;
        align-items: center;
        margin-right: 15px;
      }
      
      &__title {
        margin-right: auto;
        
        font-size: 15px;
        line-height: 1;
      }
      
      &__meta {
        padding: 5px 10px;
        border-radius: 10px;
        
        font-size: 8px;
        font-family: "SF Pro Text Semibold", sans-serif;
        line-height: 1;
        
        &__premoder { color: #FFFFFF; background: #FF2C55; }
        &__orders { color: #F09A36; background: rgba(240, 154, 54, .2 ); }
        &__finances { color: #4BD962; background: rgba(75, 217, 98, .2 ); }
        &__products { color: #CF75E6; background: rgba(207, 117, 230, .2 ); }
        &__reviews { color: #F09A36; background: rgba(240, 154, 54, .2 ); }
        &__staff { color: #37A9DC; background: rgba(55, 169, 220, .2 ); }
        &__clients {  }
        &__messenger { color: #3D9AFF; background: rgba(2, 123, 255, .2 ); }
        &__statistics {  }
        &__activity-log { color: #37A9DC; background: rgba(55, 169, 220, .2 ); }
        &__settings {  }
      }
      
      &__to {
        margin-left: 15px;
        
        cursor: pointer;
      }
    }
  }
  
  &__add-items {
    position: relative;
    
    margin: 15px auto 0;
    width: 90%;
    border: solid 1px transparent;
    border-radius: 8px;
    
    background: linear-gradient(180deg, #4CB2FF 0%, #34A6FF 100%);
    
    cursor: pointer;
    
    &__wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 10px 0;
      border-radius: 7px;
      
      background: theme-var-tg(--tg-theme-secondary-bg-color, $--tg-secondary-bg-color);
      background-clip: padding-box;
    }
    
    &__label {
      margin-left: 5px;
      
      font-size: 13px;
      font-family: "SF Pro Text Semibold", sans-serif;
      line-height: 1;
      
      color: #4CB2FF;
      background: linear-gradient(180deg, #4CB2FF 0%, #34A6FF 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
  
  &__news {
    width: calc(100% + 30px);
    margin: 15px -15px 0;
    padding: 0 15px;
    
    &__swiper {
      overflow: visible;
      
      &__slide {
        width: 220px;
      }
    }
    
    .self-card {
      margin-top: 0;
    }
    
    &__item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      
      &__text {
        font-size: 12px;
      }
      
      &__read-more {
        display: flex;
        align-items: center;
        
        cursor: pointer;
        
        span {
          margin-right: 4px;
          
          font-size: 12px;
          
          color: theme-var-tg(--tg-theme-link-color, $--tg-link-color);
        }
      }
      
      &__image {
        position: relative;
        
        max-height: 40px;
        min-width: 60px;
        max-width: 60px;
        
        img {
          height: 100%;
          width: 100%;
          
          object-fit: cover;
        }
      }
    }
  }
}

</style>