<template>
  <DefaultLayout v-if="username">
    <div class="auction__username">
      
      <div class="auction__username__name">
        {{ username.usernameTypes.ton }}
      </div>
      
      <div class="b-table">
        <div class="table-wrapper">
          <table class="auction__username__table table is-fullwidth">
            <thead class="auction__username__table__head">
            <tr>
              <th>Highest Bid</th>
              <th>Bid Step</th>
              <th>Minimum bid</th>
            </tr>
            </thead>
            <tbody class="auction__username__table__body">
            <tr class="auction__username__table__body__bids">
              <td>
                <div>
                  <span><IconToken h="14" w="14"/>{{ username.bids.highest.toLocaleString('en-US') }}</span>
                  <span>~ {{ Math.ceil((username.bids.highest * tonPrice)).toLocaleString('en-US', {style: "currency", currency: "USD", minimumFractionDigits: 0}) }}</span>
                </div>
              </td>
              <td>
                <div>
                  <span><IconToken h="14" w="14"/>{{ username.bids.step.toLocaleString('en-US') }}</span>
                  <span>5%</span>
                </div>
              </td>
              <td>
                <div>
                  <span><IconToken h="14" w="14"/>{{ username.bids.minimum.toLocaleString('en-US') }}</span>
                  <span>~ {{ Math.ceil((username.bids.minimum * tonPrice)).toLocaleString('en-US', {style: "currency", currency: "USD", minimumFractionDigits: 0}) }}</span>
                </div>
              </td>
            </tr>
            
            <tr class="auction__username__table__body__helper">
              <td colspan="4">
                <div class="content">
                  <a>How does this work?</a>
                </div>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <div class="b-table auction__username__types">
        <div class="table-wrapper">
          <table class="auction__username__table table is-fullwidth">
            <tbody>
            <tr>
              <td>Telegram Username</td>
              <td>{{ username.usernameTypes.telegram }}</td>
            </tr>
            <tr>
              <td>Web Address</td>
              <td>{{ username.usernameTypes.web }}</td>
            </tr>
            <tr>
              <td>TON Web 3.0 Address</td>
              <td>{{ username.usernameTypes.ton }}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <div class="auction__username__left-time">
        <span class="auction__username__left-time__text">Ends in</span>
        <div class="auction__username__left-time__clock">
          <div class="auction__username__left-time__clock__days">
            <span>{{ username.leftTime.days }} days</span>
          </div>
          <span class="auction__username__left-time__clock__colon">:</span>
          <div class="auction__username__left-time__clock__hours">
            <span>{{ username.leftTime.hours > 9 ? username.leftTime.hours.toString()[0] : '0' }}</span>
            <span>{{ username.leftTime.hours > 9 ? username.leftTime.hours.toString()[1] : username.leftTime.hours }}</span>
          </div>
          <span class="auction__username__left-time__clock__colon">:</span>
          <div class="auction__username__left-time__clock__minutes">
            <span>{{ username.leftTime.minutes > 9 ? username.leftTime.minutes.toString()[0] : '0' }}</span>
            <span>{{ username.leftTime.minutes > 9 ? username.leftTime.minutes.toString()[1] : username.leftTime.minutes }}</span>
          </div>
          <span class="auction__username__left-time__clock__colon">:</span>
          <div class="auction__username__left-time__clock__seconds">
            <span>{{ username.leftTime.seconds > 9 ? username.leftTime.seconds.toString()[0] : '0' }}</span>
            <span>{{ username.leftTime.seconds > 9 ? username.leftTime.seconds.toString()[1] : username.leftTime.seconds }}</span>
          </div>
        </div>
      </div>
      
      <div class="auction__username__action">
        <VButton color="blue">Place bid</VButton>
        <div>
          <a>Subscribe to updates</a>
        </div>
      </div>
      
      <div class="auction__username__history">
        <span class="auction__username__history__title">Bid history</span>
        
        <div class="b-table" :class="{'is-loading table--blur': loading}">
          <div class="table-wrapper">
            <table class="auction__username__history__table table is-fullwidth">
              <thead class="auction__username__history__table__head">
              <tr>
                <th>Price</th>
                <th>Date</th>
                <th>From</th>
              </tr>
              </thead>
              <tbody class="auction__username__history__table__body">
              
              <!--          loading-->
              <tr v-for="i of 6" :key="'stub-' + i" v-if="loading && !sortedBidHistory.length">
                <td>
                  <span><IconToken h="14" w="14"/>10,000</span>
                </td>
                <td>
                  <span>Jan 1 at 00:00</span>
                </td>
                <td>
                  <span>@username</span>
                </td>
              </tr>
              
              <!--          loaded-->
              <tr v-for="item of sortedBidHistory" :key="item.date.toString()">
                <td v-if="item.bid">
                  <span><IconToken h="14" w="14"/>{{ item.bid.toLocaleString('en-US') }}</span>
                </td>
                <td>
                  <span>{{ dayjs(item.date.toString()).format('MMM D [at] HH:mm') }}</span>
                </td>
                <td>
                  <span>{{ item.from }}</span>
                </td>
              </tr>
              
              <!--          not found-->
              <tr class="is-empty auction__username__history__table__body__not-found" v-if="!loading && !sortedBidHistory.length">
                <td colspan="4">
                  <div class="content has-text-centered">
                    <p>There were no bets</p>
                  </div>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>

<route lang="json">
{
"name": "username"
}
</route>

<script lang="ts">

import {defineComponent} from "vue";
import {useRoute, useRouter} from "vue-router";
import {useAuctionStore} from "@/stores/auction.ts";
import dayjs from "dayjs";
import {Username} from "@/models/username.model.ts";

export default defineComponent({
  name: 'UsernameView',
  
  setup() {
    const router = useRouter()
    const route = useRoute()
    const auctionStore = useAuctionStore()
    
    return {router, route, auctionStore}
  },
  
  data: () => ({
    tonPrice: 0,
    interval: 0,
    loading: true
  }),
  
  computed: {
    username() {
      return this.auctionStore.findById(this.route.params.id as string)
    },
    sortedBidHistory() {
      return this.username ? this.username?.bids.history?.sort((a, b) => {
        return new Date(b.date.toString()).getTime() - new Date(a.date.toString()).getTime()
      }) : []
    }
  },
  
  mounted() {
    if (!this.username) {
      this.router.push('/not-found')
    }
    
    this.getTonPrice().then(tonPrice => {
      this.tonPrice = tonPrice
    })
    
    this.interval = setInterval((): void => {
      this.auctionStore.updateTimeLeftById(this.route.params.id as string)
    }, 1000)
  },
  
  methods: {
    dayjs,
    async getTonPrice() {
      const response = await fetch('https://api.coingecko.com/api/v3/coins/the-open-network');
      const data = await response.json();
      return data.market_data.current_price.usd;
    }
  },
  
  watch: {
    sortedBidHistory: {
      handler(newValue) {
        if (newValue.length) this.loading = false
      }, immediate: true
    },
  }
  
})

</script>

<style scoped lang="scss">

.auction__username {
  padding-top: 17px;
  
  &__name {
    text-align: center;
    margin-bottom: 15px;
    
    font-size: 20px;
    letter-spacing: -0.2px;
  }
  
  &__table {
    border: unset !important;
    border-radius: 5px;
    
    background-color: var(--tg-theme-bg-color, $tg-bg-color);
    
    &__head {
      tr > th {
        padding: 10px 17px;
        border-bottom: 1px solid var(--tg-theme-secondary-bg-color, $tg-secondary-bg-color);
        
        font-size: 15px;
        font-weight: 400;
        
        color: #7D7D85;
        
        &:first-child {
          width: 33%;
        }
        
        &:nth-child(2) {
          width: 28%;
        }
      }
    }
    
    &__body {
      &__bids {
        td {
          vertical-align: middle;
          padding: 10px 17px;
          border-bottom: unset;
          
          div {
            display: flex;
            flex-direction: column;
            
            span:first-child {
              display: flex;
              
              font-size: 15px;
              line-height: 1;
              
              color: var(--tg-theme-text-color, $tg-text-color);
              
              svg {
                margin-right: 5px;
              }
            }
            
            span:last-child {
              margin-top: 3px;
              
              font-size: 12px;
              line-height: 1;
              
              color: #7d7d85;
            }
          }
        }
      }
      
      &__helper {
        td {
          padding: 5px 17px 10px;
          
          a {
            font-size: 12px;
            
            color: var(--tg-theme-link-color, $tg-link-color);
          }
        }
      }
    }
  }
  
  &__types {
    margin-top: 15px;
    
    td {
      vertical-align: middle;
      padding: 10px 17px;
      border-bottom: 1px solid var(--tg-theme-secondary-bg-color, $tg-secondary-bg-color);
      
      font-size: 15px;
      line-height: 1;
      
      &:nth-child(2) {
        text-align: end;
        
        color: var(--tg-theme-link-color, $tg-link-color);
      }
    }
  }
  
  &__left-time {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
    
    &__text {
      font-size: 15px;
      
      color: #7d7d85;
    }
    
    &__clock {
      display: flex;
      text-align: center;
      
      font-size: 15px;
      line-height: 1;
      
      &__colon {
        margin: 0 5px;
        
        font-size: 20px;
        
        color: #D9D9D9;
      }
      
      &__days {
        padding: 8px 12px;
      }
      
      &__hours, &__minutes, &__seconds {
        position: relative;
        padding: 8px 10px;
        
        &:after {
          content: '';
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          
          height: 100%;
          width: 1px;
          
          background-color: var(--tg-theme-secondary-bg-color, $tg-secondary-bg-color);
        }
        
        span:first-child {
          margin-right: 17px;
        }
      }
      
      div {
        background-color: var(--tg-theme-bg-color, $tg-bg-color);
        border-radius: 5px;
      }
    }
  }
  
  &__action {
    margin-top: 15px;
    
    div {
      margin-top: 10px;
      text-align: center;
    }
    
    a {
      font-size: 12px;
      
      color: var(--tg-theme-link-color, $tg-link-color);
    }
  }
  
  &__history {
    margin-top: 10px;
    
    &__title {
      font-size: 12px;
      line-height: 1;
      
      color: #7D7D85;
    }
    
    .b-table {
      margin-top: 15px;
    }
    
    &__table {
      border: unset !important;
      border-radius: 5px;
      
      background-color: var(--tg-theme-bg-color, $tg-bg-color);
      
      &__head {
        tr > th {
          padding: 10px 17px;
          border-bottom: 1px solid var(--tg-theme-secondary-bg-color, $tg-secondary-bg-color);
          
          font-size: 15px;
          font-weight: 400;
          
          color: #7D7D85;
          
          &:first-child  {
            width: 30%;
          }
          
          &:nth-child(2) {
            width: 40%;
          }
        }
      }
      
      &__body {
        td {
          vertical-align: middle;
          padding: 10px 17px;
          border-bottom: 1px solid var(--tg-theme-secondary-bg-color, $tg-secondary-bg-color);
          
          font-size: 15px;
          line-height: 1;
          
          &:first-child {
            span {
              display: flex;
              
              font-size: 15px;
              line-height: 1;
              
              color: var(--tg-theme-text-color, $tg-text-color);
              
              svg {
                margin-right: 5px;
              }
            }
          }
          
          &:last-child {
            span {
              color: var(--tg-theme-link-color, $tg-link-color);
            }
          }
        }
      }
    }
  }
}

</style>