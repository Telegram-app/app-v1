<template>
  <div class="product">
    <Transition mode="out-in">
      <Suspense>
        <template #default>
          <product-images :images="[product.image]"/>
        </template>
        
        <template #fallback>
          <product-images-skeleton/>
        </template>
      </Suspense>
    </Transition>
    
    <Transition mode="out-in">
      <Suspense>
        <template #default>
          <product-statuses/>
        </template>
        
        <template #fallback>
          <product-statuses-skeleton/>
        </template>
      </Suspense>
    </Transition>
    
    <div class="product__wrapper card--bg">
      
      <Transition mode="out-in">
        <Suspense>
          <template #default>
            <product-header :product="productHeader"/>
          </template>
          
          <template #fallback>
            <product-header-skeleton/>
          </template>
        </Suspense>
      </Transition>
      
      <div class="divider"></div>
      
      <Transition mode="out-in">
        <Suspense>
          <template #default>
            <product-types :types="product.types" :selected="payment.selectedItem.name" @selectItem="selectItem"/>
          </template>
          
          <template #fallback>
            <product-types-skeleton/>
          </template>
        </Suspense>
      </Transition>
      
      <div class="divider"></div>
      
      <Transition mode="out-in">
        <Suspense>
          <template #default>
            <product-info :product="product" :seller-and-deals="sellerAndDeals"/>
          </template>
          
          <template #fallback>
            <product-info-skeleton/>
          </template>
        </Suspense>
      </Transition>
      
      <div class="divider"></div>
      
      <div class="product__reviews">
        <div class="product__reviews__header">
          <span class="caption">Reviews</span>
          <div class="product__reviews__to-reviews" @click="router.push({ name: 'reviews', params: { id: route.params.id, productId: product.id } })">
            <span>Show All</span>
            <IconChevronRight h="10" w="6"/>
          </div>
        </div>
        
        <div class="product__reviews__wrapper">
          <Review v-for="(review, index) in product.reviews?.slice(0, 2)" :key="'review-' + index" :review="review"/>
        </div>
      </div>
    </div>
    
    <NotWebAppButton @click="payment.show = true" v-if="notAWebApp && payment.selectedItem.name.length">BUY</NotWebAppButton>
    
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

import {defineComponent, isProxy, toRaw} from 'vue';
import {useMarketStore} from '@/stores/market.ts';
import {useUserStore, Order} from '@/stores/user.ts';
import {useRouter, useRoute} from 'vue-router';

import {Pagination} from 'swiper/modules';

import dayjs from 'dayjs';

export default defineComponent({
  name: 'ProductPage',
  
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
    payment: {
      show: false,
      selectedItem: {type: 1, name: '', price: 0} as { type: 1 | 2; name: string; price: number }
    },
    tonPrice: 0,
  }),
  
  computed: {
    product() {
      return this.marketStore.findProductById(Number(this.route.params.id) as number, Number(this.route.params.productId) as number);
    },
    productHeader() {
      return {
        id: this.product.id,
        name: this.product.name,
        createdAt: this.product.createdAt
      };
    },
    sellerAndDeals() {
      let store = this.marketStore.findById(Number(this.route.params.id) as number);
      return {
        seller: store.seller,
        deals: store.deals
      };
    },
    
    notAWebApp() {
      return window.Telegram.WebApp.platform === 'unknown';
    }
  },
  
  mounted() {
    window.Telegram.WebApp.MainButton.setParams({
      text: 'BUY',
      is_active: true,
      is_visible: true
    }).onClick(() => {
      this.payment.show = true;
      return
    });
    
    this.getTonPrice().then(tonPrice => {
      this.tonPrice = tonPrice;
    });
  },
  
  methods: {
    selectItem(item: { name: string; price: number }, type: 1 | 2) {
      if (this.payment.selectedItem.name === item.name) {
        this.payment.selectedItem = {type: 1, name: '', price: 0};
      } else {
        this.payment.selectedItem = {
          type: type,
          name: item.name,
          price: item.price
        };
      }
    },
    
    orderProduct() {
      this.userStore.orderProduct(Number(this.route.params.id), this.product.id, this.payment.selectedItem).then(newOrder => {
        if (newOrder.item.type === 1) {
          this.router.push({name: 'orderIssuing', params: {id: newOrder.id}});
        } else if (newOrder.item.type === 2) {
          this.router.push({name: 'order', params: {id: newOrder.id}});
        } else {
          console.log('error');
        }
      });
    },
    
    async getTonPrice() {
      const response = await fetch('https://api.coingecko.com/api/v3/coins/the-open-network');
      const data = await response.json();
      return data.market_data.current_price.usd;
    },
    
    showMainButtonBuy() {
      window.Telegram.WebApp.MainButton.setParams({
        text: 'BUY',
        is_active: true,
        is_visible: true
      }).onClick(() => {
        this.payment.show = true;
        return
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
            this.showMainButtonBuy();
          }
        } else {
          window.Telegram.WebApp.MainButton.setParams({
            is_active: false,
            is_visible: false
          }).onClick(() => {
            return
          });
        }
      }
    },
    'payment.show': {
      handler(newValue) {
        if (newValue === false && this.payment.selectedItem.name !== '') {
          this.showMainButtonBuy();
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
  
  &__wrapper {
    padding: 15px 17px;
    border-radius: 0 0 10px 10px;
    
    background-color: theme-var-tg(--tg-theme-bg-color, $--tg-bg-color);
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
      
      color: theme-var-tg(--tg-theme-hint-color, $--tg-hint-color);
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
        font-family: "Helvetica Neue Cyr Bold", "Helvetica Neue", sans-serif;
        font-weight: 400;
        line-height: 1;
      }
      
      span:last-child {
        margin-left: 5px;
        
        font-size: 14px;
        font-family: "Helvetica Neue Cyr Bold", "Helvetica Neue", sans-serif;
        font-weight: 400;
        line-height: 1;
        
        color: theme-var-tg(--tg-theme-hint-color, $--tg-hint-color);
      }
    }
    
    &__rate {
      margin-top: 5px;
      
      font-size: 15px;
      font-family: "Helvetica Neue Cyr Bold", "Helvetica Neue", sans-serif;
      font-weight: 400;
      line-height: 1;
      
      span {
        margin-left: 5px;
        
        font-size: 10px;
        font-family: "Helvetica Neue Cyr Bold", "Helvetica Neue", sans-serif;
        font-weight: 400;
        text-transform: uppercase;
        
        color: theme-var-tg(--tg-theme-hint-color, $--tg-hint-color);
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
          font-family: "Helvetica Neue Cyr Medium", "Helvetica Neue", sans-serif;
          font-weight: 400;
        }
        
        span:last-child {
          font-size: 12px;
          font-family: "Helvetica Neue Cyr Medium", "Helvetica Neue", sans-serif;
          font-weight: 400;
          
          color: theme-var-tg(--tg-theme-hint-color, $--tg-hint-color);
        }
      }
      
      &__balance {
        margin-left: auto;
        
        span {
          font-size: 15px;
          font-family: "Helvetica Neue Cyr Medium", "Helvetica Neue", sans-serif;
          font-weight: 400;
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
          
          color: theme-var-tg(--tg-theme-hint-color, $--tg-hint-color);
        }
      }
    }
  }
}

</style>