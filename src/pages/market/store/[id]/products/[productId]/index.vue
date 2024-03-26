<template>
  <div class="product">
    <div class="product__images">
      <swiper
        :modules="modules"
        :slides-per-view="1"
        class="product__images__swiper"
      >
        <swiper-slide class="product__images__swiper__slide" v-for="(i, index) in 3" :key="i" :virtualIndex="index">
          <div class="product__images__image">
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
    </div>
    
    <div class="product__info card--bg">
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
            <div v-for="item in type.items" class="product__types__items__item" @click="payment.selectedItem = payment.selectedItem === item ? { name: '', price: 0 } : item" :class="{ 'product__types__items__item--selected': payment.selectedItem === item }">
              <span class="product__types__items__item__name">{{ item.name }}</span>
              <span class="product__types__items__item__price">{{ item.price }} TON</span>
            </div>
          </div>
        </template>
      </div>
      
      <div class="divider"></div>
      
      <div class="product__description" :class="{ 'product__description--show': descShowMore }">
        <span class="caption">Description</span>
        <p class="product__description__text" :class="{'product__description__text__full': descShowMore}">
          {{ descShowMore ? product.description : kitcut(product.description, 170) }}
          <span class="product__description__show-more__wrapper">
            <a class="product__description__show-more" @click="descShowMoreFunc()" v-if="product.description.length > 170">{{ descShowMore ? 'Hide more' : 'Show more' }}</a>
          </span>
        </p>
      </div>
      
      <div class="divider"></div>
      
      <div class="product__store__info">
        <div class="product__store__info__seller">
          <span>Seller: </span>
          <span>{{ sellerAndDeals.seller }}</span>
        </div>
        <div class="product__store__info__deals">
          <span>Deals: </span>
          <span>{{ sellerAndDeals.deals.completed }} · {{ Math.floor(sellerAndDeals.deals.completed / sellerAndDeals.deals.quantity * 100) }}%</span>
        </div>
      </div>
      
      <div class="divider"></div>
      
      <div class="product__chars" :class="{ 'product__chars--show': charsShowMore }">
        <span class="caption">Characteristics</span>
        <div class="product__chars__char" v-for="(char, index) in charsShowMore ? product.characteristics : product.characteristics.slice(0, 2)" :key="'char-' + index">
          <span class="product__chars__char__key">{{ char.key }}</span>
          <span class="product__chars__char__value">{{ char.value }}</span>
        </div>
        <a class="product__chars__show-more" @click="charsShowMoreFunc()" v-if="product.characteristics.length > 2">{{ charsShowMore ? 'Hide characteristics' : 'All characteristics' }}</a>
      </div>
      
      <div class="divider"></div>
      
      <div class="product__reviews">
        <div class="product__reviews__header">
          <span class="caption">Reviews</span>
          <div class="product__reviews__to-reviews" @click="router.push({ name: 'reviews', params: { id: route.params.id, productId: product.id } })">
            <span>Show All</span>
            <IconChevronRight h="10"/>
          </div>
        </div>
        
        <div class="product__reviews__wrapper">
          <Review v-for="(review, index) in product.reviews?.slice(0, 2)" :key="'review-' + index" :review="review"/>
        </div>
      </div>
    </div>
    
    <VBottomSheet v-model="payment.show">
      <div class="product__payment">
        <h3 class="product__payment__title">Payment</h3>
        
        <span class="product__payment__subtitle">To be paid</span>
        
        <div class="product__payment__price">
          <span>{{ payment.selectedItem.price }}</span>
          <span>TON</span>
        </div>
        
        <div class="product__payment__rate">
          (~{{ (payment.selectedItem.price * tonPrice).toLocaleString('en-US', {minimumFractionDigits: 1}) }}<span>usdt</span>)
        </div>
        
        <div class="product__payment__wallet self-card" @click="orderProduct()">
          <div class="product__payment__wallet__icon">
            <IconToken h="16" w="16" color="white"/>
          </div>
          
          <div class="product__payment__wallet__info">
            <span>TON Space</span>
            <span>EQCZk7u...g2DU</span>
          </div>
          
          <div class="product__payment__wallet__balance">
            <span>1000 TON</span>
          </div>
        </div>
        
        <div class="product__payment__premium">
          <span class="caption">About telegram premium</span>
          <div class="product__payment__premium__info self-card">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam animi incidunt ipsa itaque iure porro quae sed sint sunt, ut!
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam animi incidunt ipsa itaque iure porro quae sed sint sunt, ut!
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam animi incidunt ipsa itaque iure porro quae sed sint sunt, ut!
            </p>
          </div>
        </div>
      </div>
    </VBottomSheet>
  </div>
</template>

<route lang="json">
{
"name": "product"
}
</route>

<script lang="ts">

import {defineComponent} from 'vue';
import {useMarketStore} from '@/stores/market.ts';
import {useUserStore, Order} from '@/stores/user.ts';
import {useRouter, useRoute} from 'vue-router';

import {Swiper, SwiperSlide} from 'swiper/vue';
import {Pagination} from 'swiper/modules';

import dayjs from 'dayjs';

import 'swiper/css';
import 'swiper/css/pagination';

export default defineComponent({
  name: 'ProductPage',
  components: {Swiper, SwiperSlide},
  
  props: [],
  
  setup() {
    const router = useRouter();
    const route = useRoute();
    const userStore = useUserStore();
    const marketStore = useMarketStore();
    
    return {router, route, userStore, marketStore, modules: [Pagination]};
  },
  
  data: () => ({
    activeTypeTab: 0,
    descShowMore: false,
    charsShowMore: false,
    payment: {
      show: false,
      selectedItem: {name: '', price: 0} as { name: string; price: number }
    },
    tonPrice: 0,
  }),
  
  computed: {
    product() {
      return this.marketStore.findProductById(Number(this.route.params.id) as number, Number(this.route.params.productId) as number);
    },
    sellerAndDeals() {
      let store = this.marketStore.findById(Number(this.route.params.id) as number)
      return {
        seller: store.seller,
        deals: store.deals
      };
    }
  },
  
  mounted() {
    this.getTonPrice().then(tonPrice => {
      this.tonPrice = tonPrice;
    });
  },
  
  methods: {
    orderProduct() {
      this.userStore.orderProduct(Number(this.route.params.id), this.product.id).then(newOrder => {
        this.router.push({name: 'orderIssuing', params: {id: newOrder.id}});
      });
    },
    
    async getTonPrice() {
      const response = await fetch('https://api.coingecko.com/api/v3/coins/the-open-network');
      const data = await response.json();
      return data.market_data.current_price.usd;
    },
    
    descShowMoreFunc() {
      this.descShowMore = !this.descShowMore;
      let desc = document.querySelector<HTMLElement>('.product__description__text')!;
      
      if (this.descShowMore) {
        desc.style.maxHeight = '1000px';
      } else {
        desc.style.maxHeight = '80px';
      }
    },
    
    dateToHumanize(date: Date) {
      let dayjsDate = dayjs(date);
      return dayjsDate.format('DD.MM.YYYY');
    },
    
    kitcut(text: string, limit: number) {
      text = text.trim();
      if (text.length <= limit) return text;
      
      text = text.slice(0, limit);
      let lastSpace = text.lastIndexOf(' ');
      if (lastSpace > 0) {
        text = text.substr(0, lastSpace);
      }
      return text + '...';
    },
    
    charsShowMoreFunc() {
      this.charsShowMore = !this.charsShowMore;
    },
    
    showMainButtonBuy() {
      window.Telegram.WebApp.MainButton.setParams({
        text: 'BUY',
        is_active: true,
        is_visible: true
      }).onClick(() => {
        this.payment.show = true;
        window.Telegram.WebApp.MainButton.setParams({
          is_active: false,
          is_visible: false
        });
      });
    }
  },
  
  watch: {
    activeTypeTab(newValue) {
      let activeLi = document.querySelectorAll<HTMLElement>('.product__types__tabs li')[newValue];
      let background = document.querySelector<HTMLElement>('.product__types__tabs--active__background')!;
      
      background.style.width = activeLi.clientWidth + 'px';
      background.style.left = activeLi.offsetLeft + 'px';
    },
    'payment.selectedItem': {
      handler(newValue) {
        if (newValue.name !== '') {
          if (window.Telegram.WebApp && this.payment.selectedItem.name.length) {
            this.showMainButtonBuy()
          }
        } else {
          window.Telegram.WebApp.MainButton.setParams({
            is_active: false,
            is_visible: false
          });
        }
      }
    },
    'payment.show': {
      handler(newValue) {
        if (newValue === false && this.payment.selectedItem.name !== '') {
          this.showMainButtonBuy()
        }
      }
    }
    
  }
  
});

</script>

<style lang="scss">

.product {
  .divider {
    margin-top: 15px;
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
    }
  }
  
  &__info {
    padding: 15px 17px;
    border-radius: 0 0 10px 10px;
    
    background-color: theme-var-tg(--tg-theme-bg-color, $--tg-bg-color);
  }
  
  &__tags {
    display: flex;
    flex-wrap: wrap;
    
    &__tag {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 4px 10px;
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
        
        cursor: pointer;
        
        &__name {
          font-size: 12px;
          font-family: "SF Pro Text Semibold", sans-serif;
          line-height: 1;
        }
        
        &__price {
          font-size: 12px;
          line-height: 1;
          margin-top: 5px;
          
          color: theme-var($--hint-color);
        }
        
        &--selected {
          background-color: #E6F1FF;
          
          .product__types__items__item__name {
            color: #000000
          }
        }
      }
    }
  }
  
  &__description {
    position: relative;
    
    display: flex;
    flex-direction: column;
    margin-top: 15px;
    
    &__text {
      position: relative;
      
      max-height: 80px;
      margin-top: 10px;
      
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
      &__wrapper {
        display: inline-block;
        min-width: 70px;
      }
      
      position: absolute;
      right: 0;
      bottom: 0;
      border-bottom: 1px dashed #CFCFD1;
      
      font-size: 13px;
      
      color: theme-var-tg(--tg-theme-button-color, $--tg-button-color);
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
      }
    }
  }
  
  &__chars {
    position: relative;
    
    display: flex;
    flex-direction: column;
    margin-top: 15px;
    overflow: hidden;
    
    &__char {
      display: flex;
      justify-content: space-between;
      margin-top: 10px;
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
      
      color: theme-var-tg(--tg-theme-button-color, $--tg-button-color);
    }
  }
  
  &__reviews {
    margin-top: 15px;
    
    &__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
    }
    
    &__to-reviews {
      display: flex;
      align-items: center;
      
      font-size: 12px;
      
      color: theme-var-tg(--tg-theme-button-color, $--tg-button-color);
      
      cursor: pointer;
      
      span {
        margin-right: 5px;
        
        white-space: nowrap;
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
  
  &__payment {
    display: flex;
    flex-direction: column;
    align-items: center;
    
    &__title {
      margin-top: 6px;
      
      font-size: 16px;
      line-height: 1;
      text-transform: uppercase;
      
      color: #7D7D85;
    }
    
    &__subtitle {
      margin-top: 20px;
      
      font-size: 15px;
      line-height: 1;
    }
    
    &__price {
      margin-top: 15px;
      
      span:first-child {
        font-size: 20px;
        font-family: "SF Pro Text Bold", sans-serif;
        line-height: 1;
      }
      
      span:last-child {
        margin-left: 5px;
        
        font-size: 14px;
        font-family: "SF Pro Text Semibold", sans-serif;
        line-height: 1;
        
        color: theme-var($--hint-color);
      }
    }
    
    &__rate {
      margin-top: 5px;
      
      font-size: 15px;
      font-family: "SF Pro Text Bold", sans-serif;
      line-height: 1;
      
      span {
        margin-left: 5px;
        
        font-size: 10px;
        font-family: "SF Pro Text Semibold", sans-serif;
        text-transform: uppercase;
        
        color: theme-var($--hint-color);
      }
    }
    
    &__wallet {
      display: flex;
      align-items: center;
      margin-top: 18px;
      width: 100%;
      
      &__icon {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 40px;
        width: 40px;
        border-radius: 100%;
        
        background-color: #000000;
      }
      
      &__info {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-left: 14px;
        
        span:first-child {
          font-size: 15px;
          font-family: "SF Pro Text Medium", sans-serif;
        }
        
        span:last-child {
          font-size: 12px;
          font-family: "SF Pro Text Medium", sans-serif;
          
          color: #888888;
        }
      }
      
      &__balance {
        margin-left: auto;
        
        span {
          font-size: 15px;
          font-family: "SF Pro Text Medium", sans-serif;
        }
      }
    }
    
    &__premium {
      margin-top: 15px;
      
      &__info {
        margin-top: 10px;
        
        p {
          font-size: 12px;
          line-height: 12px;
          
          color: #787878;
        }
      }
    }
  }
}

</style>