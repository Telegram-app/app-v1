<template>
  <div class="product">
    <div class="product__images">
      <swiper
        :modules="modules"
        :slides-per-view="1"
        class="product__images__swiper"
      >
        <swiper-slide class="product__images__swiper__slide" v-for="(i, index) in 3" :key="i" :virtualIndex="index">
          <div class="product__image">
            <img :src="'/images/market/stores/products/' + product.image" alt="product-image">
            <div class="product__images__swiper__pagination">
              <span>{{ i + '/' + 3 }}</span>
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </div>
    
    <div class="product__statuses">
      <div class="product__statuses__status product__statuses__status__top-sales">Top sales</div>
      <div class="product__statuses__status product__statuses__status__new">New</div>
      <div class="product__statuses__status product__statuses__status__good-reviews">Good Reviews</div>
    </div>
    
    <div class="product__info">
      <div class="product__tags">
        <div class="product__tags__tag">
          <span>Digital goods</span>
          <IconChevronRight h="10" color="grey"/>
        </div>
        
        <div class="product__head__wrapper">
          <div class="product__head">
            <h1 class="product__head__title">{{ product.name }}</h1>
            <div class="is-flex is-align-items-center">
              <span class="product__head__id">#{{ product.id }}</span>
              <span class="product__head__dividing-dot"></span>
              <span class="product__head__createdAt">{{ dateToHumanize(product.createdAt) }}</span>
            </div>
          </div>
          <div class="product__head__share">
            <IconShare w="11"/>
          </div>
        </div>
      </div>
      
      <div class="divider"></div>
      
      <div class="product__types">
        <div class="product__types__tabs" v-if="product.types.length > 1">
          <ul>
            <li v-for="(type, index) in product.types" :key="'tab-' + index" @click="activeTypeTab = index">
              <a>
                <span>{{ type.title }}</span>
              </a>
            </li>
            <div class="product__types__tabs--active__background"></div>
          </ul>
        </div>
        
        <template v-for="(type, index) in product.types" :key="'tab-content-' + index">
          <div v-if="activeTypeTab === index" class="product__types__items">
            <div v-for="item in type.items" class="product__types__items__item">
              <span class="product__types__items__item__name">{{ item.name }}</span>
              <span class="product__types__items__item__price">{{ item.price }} TON</span>
            </div>
          </div>
        </template>
      </div>
      
      <div class="divider"></div>
      
      <div class="product__description" :class="{ 'product__description--show': descShowMore }">
        <span class="product__description__title">Description</span>
        <p class="product__description__text" :class="{'product__description__text__full': descShowMore}">{{ descShowMore ? product.description : kitcut(product.description, 170) }}</p>
        <a class="product__description__show-more" @click="descShowMoreFunc()" v-if="product.description.length > 170">{{ descShowMore ? 'Hide more' : 'Show more' }}</a>
      </div>
      
      <div class="divider"></div>
      
      <div class="product__store__info">
        <div class="product__store__info__seller">
          <span>Seller: </span>
          <span>{{ sellerAndDeals.seller }}</span>
        </div>
        <div class="product__store__info__deals">
          <span>Deals: </span>
          <span>{{ sellerAndDeals.deals.completed }} <div></div> {{ Math.floor(sellerAndDeals.deals.completed / sellerAndDeals.deals.quantity * 100) }}%</span>
        </div>
      </div>
      
      <div class="divider"></div>
      
      <div class="product__chars" :class="{ 'product__chars--show': charsShowMore }">
        <span class="product__chars__title">Characteristics</span>
        <div class="product__chars__char" v-for="(char, index) in charsShowMore ? product.characteristics : product.characteristics.slice(0, 2)" :key="'char-' + index">
          <span class="product__chars__char__key">{{ char.key }}</span>
          <span class="product__chars__char__value">{{ char.value }}</span>
        </div>
        <a class="product__chars__show-more" @click="charsShowMoreFunc()" v-if="product.characteristics.length > 2">{{ charsShowMore ? 'Hide characteristics' : 'All characteristics' }}</a>
      </div>
      
      <div class="divider"></div>
      
      <div class="product__reviews">
        <div class="product__reviews__header">
          <span class="product__reviews__title">Reviews</span>
          <div class="product__reviews__to-reviews">
            <span>Show All</span>
            <IconChevronRight h="10"/>
          </div>
        </div>
        
        <div class="product__reviews__wrapper">
          <Review v-for="(review, index) in product.reviews" :key="'review-' + index" :review="review"/>
        </div>
      </div>
    </div>
  </div>
</template>

<route lang="json">
{
  "name": "product"
}
</route>

<script lang="ts">

import { defineComponent } from "vue";
import { useMarketStore } from '@/stores/market.ts';
import {useRoute} from 'vue-router';

import {Swiper, SwiperSlide} from 'swiper/vue';

import 'swiper/css'
import 'swiper/css/pagination'

import { Pagination } from 'swiper/modules';
import dayjs from 'dayjs';

export default defineComponent({
  name: '',
  components: {Swiper, SwiperSlide},
  
  props: [],
  
  setup() {
    const route = useRoute()
    const marketStore = useMarketStore()
    
    return { route, marketStore, modules: [Pagination] }
  },
  
  data: () => ({
    activeTypeTab: 0,
    descShowMore: false,
    charsShowMore: false,
  }),
  
  computed: {
    product() {
      return this.marketStore.findProductById(Number(this.route.params.id) as number, Number(this.route.params.productId) as number)
    },
    sellerAndDeals() {
      return {
        seller: this.marketStore.findById(Number(this.route.params.id) as number).seller,
        deals: this.marketStore.findById(Number(this.route.params.id) as number).deals
      }
    }
  },
  
  mounted() {
    if (window.Telegram.WebApp) {
      window.Telegram.WebApp.MainButton.setParams({
        text: 'BUY',
        is_active: true,
        is_visible: true
      }).onClick(() => {
        console.log(window.Telegram.WebApp.MainButton);
      })
    }
  },
  
  methods: {
    dateToHumanize(date: Date) {
      let dayjsDate = dayjs(date)
      return dayjsDate.format('DD.MM.YYYY')
    },
    
    kitcut(text: string, limit: number) {
      text = text.trim();
      if (text.length <= limit) return text;
      
      text = text.slice( 0, limit);
      let lastSpace = text.lastIndexOf(" ");
      if (lastSpace > 0) {
        text = text.substr(0, lastSpace);
      }
      return text + "...";
    },
    
    descShowMoreFunc() {
      this.descShowMore = !this.descShowMore
      let desc = document.querySelector<HTMLElement>('.product__description__text')!
      
      console.log(this.descShowMore);
      
      if (this.descShowMore) {
        desc.style.maxHeight = '1000px'
      } else {
        desc.style.maxHeight = '80px'
      }
    },
    
    charsShowMoreFunc() {
      this.charsShowMore = !this.charsShowMore
    }
  },
  
  watch: {
    activeTypeTab(newValue) {
      let activeLi = document.querySelectorAll<HTMLElement>('.product__types__tabs li')[newValue]
      let background = document.querySelector<HTMLElement>('.product__types__tabs--active__background')!
      
      background.style.width = activeLi.clientWidth + 'px'
      background.style.left = activeLi.offsetLeft + 'px'
    }
  }
  
})

</script>

<style lang="scss">

.product {
  .divider {
    height: 1px;
    width: 100%;
    margin-top: 15px;
    
    background-color: #EFEEF4;
  }
  
  &__images {
    &__swiper {
      margin: 0 -15px;
      padding: 0 15px;
      
      &__pagination {
        position: absolute;
        bottom: 10px;
        
        width: 290px;
        padding-left: 10px;
        
        span {
          padding: 4px 11px;
          border-radius: 10px;
          
          font-size: 10px;
          
          color: #6F6F6F;
          background-color: rgba(248, 233, 213, 0.7);
        }
      }
    }
  }
  
  &__image {
    position: relative;
    
    display: flex;
    justify-content: center;
    height: 300px;
    width: 100%;
    
    img {
      height: 100%;
      width: 300px;
      border-radius: 10px;
    }
  }
  
  &__statuses {
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
      
      &__new {
        margin-top: 5px;
        
        color: #000000;
        background: linear-gradient(90deg, #6BFFAF 0%, #72E6FF 100%);
      }
      
      &__good-reviews {
        margin-top: 5px;
        
        color: #000000;
        background: linear-gradient(90deg, #BFCDFF 0%, #4E7AFF 100%);
      }
    }
  }
  
  &__info {
    padding: 15px 17px;
    border-radius: 0 0 10px 10px;
    
    background-color: var(--tg-theme-bg-color, $tg-bg-color);
  }
  
  &__tags {
    display: flex;
    flex-wrap: wrap;
    
    &__tag {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 6px 10px;
      border-radius: 10px;
      
      color: #7D7D85;
      background-color: #F6F6F6;
      
      span {
        margin-right: 4px;
        
        font-size: 12px;
        line-height: 1;
        text-transform: uppercase;
      }
    }
  }
  
  &__head {
    &__wrapper {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 15px;
      width: 100%;
    }
    
    display: flex;
    flex-direction: column;
    
    &__title {
      font-size: 16px;
      font-family: "SF Pro Text Bold", sans-serif;
    }
    
    &__id {
      font-size: 12px;
      
      color: #7D7D85;
    }
    
    &__dividing-dot {
      height: 2px;
      width: 2px;
      margin: auto 6px;
      border-radius: 100%;
      
      background-color: #7d7d85;
    }
    
    &__createdAt {
      font-size: 12px;
      
      color: #7D7D85;
    }
    
    &__share {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 23px;
      height: 23px;
      border-radius: 100%;
      
      background-color: #EBF7FE;
    }
  }
  
  &__types {
    margin-top: 15px;
    
    &__tabs {
      display: flex;
      width: 100%;
      padding: 2px;
      border-radius: 5px;
      
      background-color: #F1F1F1;
      
      &--active {
        
        &__background {
          position: absolute;
          z-index: 1;
          height: 100%;
          left: 0;
          right: 50%;
          
          border-radius: 5px;
          
          background-color: #FFFFFF;
          
          transition: 0.5s all;
        }
      }
      
      ul {
        position: relative;
        
        display: flex;
        width: 100%;
        
        li {
          z-index: 2;
          
          display: flex;
          flex: 1;
          justify-content: center;
          padding: 5px 0;
          
          cursor: pointer;
          
          a {
            font-size: 12px;
            font-family: "SF Pro Text Bold", sans-serif;
            
            color: #000000;
          }
        }
      }
    }
    
    &__items {
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
      row-gap: 5px;
      margin-top: 10px;
      
      &__item {
        display: flex;
        flex-direction: column;
        min-width: 93px;
        max-width: 93px;
        padding: 8px 10px;
        border: 1px solid #E1E0E6;
        border-radius: 10px;
        
        &__name {
          font-size: 12px;
          font-family: "SF Pro Text Semibold", sans-serif;
          line-height: 1;
        }
        
        &__price {
          font-size: 12px;
          line-height: 1;
          margin-top: 5px;
          
          color: #787878;
        }
      }
    }
  }
  
  &__description {
    position: relative;
    
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    overflow: hidden;
    
    &__title {
      font-size: 12px;
      text-transform: uppercase;
      
      color: #7D7D85;
    }
    
    &__text {
      max-height: 80px;
      margin-top: 8px;
      
      font-size: 13px;
      line-height: 16px;
      
      //transition: max-height 0.5s cubic-bezier(0, 1, 0, 1);
      //
      //&__full {
      //  max-height: 1000px;
      //  transition: max-height 1s ease-in-out;;
      //}
    }
    
    &__show-more {
      position: absolute;
      right: 0;
      bottom: -2px;
      border-bottom: 1px dashed #CFCFD1;
      
      font-size: 13px;
      
      color: var(--tg-theme-button-color, $tg-button-color);
    }
    
    &--show {
      padding-bottom: 20px;
    }
  }
  
  &__store__info {
    margin-top: 15px;
    
    &__seller {
      display: flex;
      
      font-size: 12px;
      line-height: 1;
      
      span:first-child {
        margin-right: 4px;
        
        color: #7D7D85;
      }
    }
    
    &__deals {
      display: flex;
      margin-top: 5px;
      
      font-size: 12px;
      line-height: 1;
      
      span:first-child {
        margin-right: 4px;
        
        color: #7D7D85;
      }
      
      span:last-child {
        display: flex;
        align-items: center;
        
        div {
          height: 2px;
          width: 2px;
          margin: 0 6px;
          border-radius: 100%;
          
          background-color: var(--tg-theme-text-color, $tg-text-color);
        }
      }
    }
  }
  
  &__chars {
    position: relative;
    
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    overflow: hidden;
    
    &__title {
      font-size: 12px;
      text-transform: uppercase;
      
      color: #7D7D85;
    }
    
    &__char {
      display: flex;
      justify-content: space-between;
      margin-top: 5px;
      width: 100%;
      
      &__key {
        display: flex;
        flex: 1;
        align-items: center;
        
        font-size: 12px;
        
        color: #7D7D85;
        
        &:after {
          content: "";
          flex: 1;
          margin: auto 4px 4px 4px;
          border-bottom: 1px dashed #CFCFD1;
        }
      }
      
      &__value {
        width: 55%;
        font-size: 12px;
      }
    }
    
    &__show-more {
      margin-top: 10px;
      width: max-content;
      border-bottom: 1px dashed #CFCFD1;
      
      font-size: 12px;
      
      color: var(--tg-theme-button-color, $tg-button-color);
    }
  }
  
  &__reviews {
    margin-top: 10px;
    
    &__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
    }
    
    &__title {
      font-size: 12px;
      text-transform: uppercase;
      
      color: #7D7D85;
    }
    
    &__to-reviews {
      display: flex;
      align-items: center;
      
      font-size: 12px;
      
      color: var(--tg-theme-button-color, $tg-button-color);
      
      span {
        margin-right: 5px;
      }
      
      svg {
        margin-bottom: 1px;
      }
    }
    
    &__wrapper {
      display: flex;
      flex-direction: column;
      row-gap: 15px;
    }
  }
}

</style>