<template>
  <div class="auction__usernames">
    <h1 class="auction__usernames__title">Buy and Sell Usernames</h1>
    
    <p class="auction__usernames__description">
      Secure your name with blockchain in an ecosystem of 700+ million users and assging it as a link for your personal account, channel or group.
      <span class="auction__usernames__description__learn-more">Learn more <IconChevronRight class="auction__usernames__description__learn-more__icon" h="9" w="6"/></span>
    </p>
    
    <div class="auction__usernames__search field">
      <p class="control has-icons-left">
        <input class="input" type="search" placeholder="Enter a Telegram username..." v-model="search">
        <span class="auction__usernames__search__icon">
          <IconSearch h="10" w="9"/>
        </span>
      </p>
    </div>
    
    <div class="auction__usernames__sorting">
      <span class="auction__usernames__sorting__title">Auctions</span>
      <div class="auction__usernames__sorting__wrapper">
        <span class="auction__usernames__sorting__active" @click="search ? '' : sortBy.active = !sortBy.active">{{ sortBy.active ? 'On auction' : 'Not at auction' }} <IconSorting w="7" h="4.67" :coloredArrow="sortBy.active"/></span>
        <span class="auction__usernames__sorting__price" @click="sortUsernamesBy()">
          {{ sortBy.isPrice && sortBy.price === 'asc' ? 'Price low to high' : sortBy.isPrice && sortBy.price === 'desc' ? 'Price high to low' : '' }}
          {{ !sortBy.isPrice && sortBy.timeLeft === 'asc' ? 'Time left low to high' : !sortBy.isPrice && sortBy.timeLeft === 'desc' ? 'Time left high to low' : '' }}
          <IconSorting w="7" h="4.67" :coloredArrow="sortBy.isPrice ? sortBy.price === 'asc' : sortBy.timeLeft === 'asc'"/>
        </span>
      </div>
    </div>
    
    <div class="b-table" :class="{'is-loading table--blur': loading}">
      <div class="table-wrapper">
        <table class="auction__usernames__table table is-fullwidth">
            <thead class="auction__usernames__table__head">
              <tr>
                <th>Username</th>
                <th>Minimum bid</th>
                <th></th>
              </tr>
            </thead>
          <tbody class="auction__usernames__table__body">
          
<!--          loading-->
            <tr v-for="i of 6" :key="'stub-' + i" v-if="loading && !sortedUsernames.length">
              <td>
                <div class="auction__usernames__table__body__username">
                  <span>@username</span>
                  <span>username.t.me</span>
                </div>
              </td>
              <td>
                <div class="auction__usernames__table__body__price-and-date">
                  <span><IconToken h="14" w="14"/>10,000</span>
                  <span>1 days 0 hours left</span>
                </div>
              </td>
              <td class="has-text-right">
                <div class="auction__usernames__table__body__icon">
                  <IconChevronRight h="11" w="6"/>
                </div>
              </td>
            </tr>
            
  <!--          loaded-->
            <tr v-for="key of sortedUsernames" :key="key.id">
              <td>
                <div class="auction__usernames__table__body__username">
                  <span>{{ key.usernameTypes.telegram }}</span>
                  <span>{{ key.usernameTypes.ton }}</span>
                </div>
              </td>
              <td>
                <div class="auction__usernames__table__body__price-and-date">
                  <span><IconToken h="14" w="14"/>{{ key.bids.highest.toLocaleString('en-US') }}</span>
                  <span>{{ key.leftTime?.humanize }}</span>
                </div>
              </td>
              <td class="has-text-right">
                <div class="auction__usernames__table__body__icon" @click="toUsernamePage(key.id)">
                  <IconChevronRight h="11" w="6"/>
                </div>
              </td>
            </tr>
            
  <!--          not found-->
            <tr class="is-empty auction__usernames__table__body__not-found" v-if="!loading && !sortedUsernames.length">
              <td colspan="4">
                <div class="content has-text-centered">
                  <p>Nothing's there…</p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

import { defineComponent } from "vue";
import { useRoute } from "vue-router";
import { mapState } from "pinia";
import { useAuctionStore } from "@/stores/auction.ts";
import { Username } from "@/models/username.model.ts";

export default defineComponent({
  name: 'AuctionUsernames',
  
  props: [],
  
  setup() {
    const auctionStore = useAuctionStore()
    const route = useRoute()
    
    return { auctionStore, route }
  },
  
  data: () => ({
    loading: true,
    search: '',
    sortBy: {
      active: true,
      isPrice: false,
      price: 'asc',
      timeLeft: 'asc'
    },
    interval: 0,
  }),
  
  mounted() {
    this.auctionStore.createFakeUsernames()
    
    this.interval = setInterval((): void => {
      this.auctionStore.updateTimeLeft()
    }, 1000)
  },
  
  beforeUnmount() {
    clearInterval(this.interval)
  },
  
  computed: {
    ...mapState(useAuctionStore, {
      usernames: (state) => state.getUsernames as Username[]
    }),
    sortedUsernames() {
      if (this.search) {
        return this.usernames.filter(username => {
          return username.usernameTypes.telegram.includes(this.search)
        })
      }
      
      if (this.sortBy.active) {
        return [...this.usernames].filter(username => {
          return username.leftTime.millisecondsLeft > 0
        }).sort((a, b) => {
          if (this.sortBy.isPrice) {
            if (this.sortBy.price === 'asc') {
              return a.bids.highest >= b.bids.highest ? 1 : -1
            } else if (this.sortBy.price === 'desc') {
              return a.bids.highest <= b.bids.highest ? 1 : -1
            }
          } else {
            if (this.sortBy.timeLeft === 'asc') {
              return a.leftTime.millisecondsLeft >= b.leftTime.millisecondsLeft ? 1 : -1
            } else if (this.sortBy.timeLeft === 'desc') {
              return a.leftTime.millisecondsLeft <= b.leftTime.millisecondsLeft ? 1 : -1
            }
          }
          
          return 0
        })
      } else {
        return [...this.usernames].filter(username => {
          return username.leftTime.millisecondsLeft <= 0
        }).sort((a, b) => {
          if (this.sortBy.isPrice) {
            if (this.sortBy.price === 'asc') {
              return a.bids.highest >= b.bids.highest ? 1 : -1
            } else if (this.sortBy.price === 'desc') {
              return a.bids.highest <= b.bids.highest ? 1 : -1
            }
          } else {
            if (this.sortBy.timeLeft === 'asc') {
              return a.leftTime.millisecondsLeft >= b.leftTime.millisecondsLeft ? 1 : -1
            } else if (this.sortBy.timeLeft === 'desc') {
              return a.leftTime.millisecondsLeft <= b.leftTime.millisecondsLeft ? 1 : -1
            }
          }
          
          return 0
        })
      }
    },
  },
  
  methods: {
    sortUsernamesBy() {
      if (this.search) return
      if (this.sortBy.isPrice && this.sortBy.price === 'asc') {
        this.sortBy.price = 'desc'
      } else if (this.sortBy.isPrice && this.sortBy.price === 'desc') {
        this.sortBy.timeLeft = 'asc'
        this.sortBy.isPrice = false
      } else if (!this.sortBy.isPrice && this.sortBy.timeLeft === 'asc') {
        this.sortBy.timeLeft = 'desc'
      } else {
        this.sortBy.price = 'asc'
        this.sortBy.isPrice = true
      }
    },
    
    toUsernamePage(to: string | number) {
      // this.$router.push(`/auction/usernames/${to}`)
      this.$router.push({name: 'username', params: { id: to }})
    },
  },
  
  watch: {
    sortedUsernames(newValue) {
      if (newValue.length) this.loading = false
    },
    'route.name'(to) {
      this.loading = true
    }
  }
})

</script>

<style lang="scss">

.b-table.is-loading::after {
  top: calc(50% - 1em);
  
  border-top-color: var(--tg-theme-link-color, $tg-link-color);
  border-right-color: var(--tg-theme-link-color, $tg-link-color);
}

.auction__usernames {
  margin-top: 25px;
  
  &__title {
    text-align: center;
    font-size: 20px;
    font-weight: 400;
    line-height: 100%;
  }
  
  &__description {
    margin-top: 10px;
    
    text-align: center;
    font-size: 12px;
    line-height: 18px;
    letter-spacing: -0.2px;
    
    color: var(--tg-theme-hint-color, $tg-hint-color);
    
    &__learn-more {
      display: inline-flex;
      align-items: center;
      
      color: var(--tg-theme-link-color, $tg-link-color);
      
      cursor: pointer;
      
      &__icon {
        margin-top: 1px;
        margin-left: 4px;
      }
    }
  }
  
  &__search {
    margin-top: 22px;
    
    input {
      height: 33px;
      padding-bottom: 4px !important;
      padding-left: 38px !important;
      border: unset;
      border-radius: 5px;
      
      font-size: 12px;
      
      color: var(--tg-theme-text-color, $tg-text-color);
      background-color: var(--tg-theme-bg-color, $tg-bg-color);
      box-shadow: unset;
      
      &::placeholder {
        color: #888888;
      }
      
      &:hover {
        border: unset;
      }
      
      &:focus {
        border: unset;
        
        box-shadow: unset;
      }
      
      &:active {
        border: unset;
        
        box-shadow: unset;
      }
    }
    
    &__icon {
      position: absolute;
      left: 0;
      top: 0;
      
      display: flex;
      align-items: center;
      justify-content: center;
      width: 38px;
      
      height: 33px;
    }
  }
  
  &__sorting {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 15px;
    height: 14px;
    
    font-size: 12px;
    line-height: 1;
    
    color: #7D7D85;
    
    &__title {
    
    }
    
    &__wrapper {
      display: flex;
    }
    
    &__active {
      display: flex;
      margin-right: 20px;
      
      cursor: pointer;
    }
    
    &__price {
      display: flex;
      
      cursor: pointer;
    }
  }
  
  &__table {
    margin-top: 10px;
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
          width: 37%;
        }
        
        &:nth-child(2) {
          width: 53%;
        }
      }
    }
    
    &__body {
      tr {
      
      }
      
      td {
        vertical-align: middle;
        padding: 10px 17px;
        border-bottom: 1px solid var(--tg-theme-secondary-bg-color, $tg-secondary-bg-color);
      }
      
      &__username {
        display: flex;
        flex-direction: column;
        
        span:first-child {
          font-size: 15px;
          line-height: 1;
          
          color: var(--tg-theme-text-color, $tg-text-color);
        }
        
        span:last-child {
          margin-top: 3px;
          
          font-size: 12px;
          line-height: 1;
          
          color: var(--tg-theme-link-color, $tg-link-color);
          
          cursor: pointer;
        }
      }
      
      &__price-and-date {
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
      
      &__icon {
        cursor: pointer;
      }
      
      &__not-found {
        font-size: 14px;
        line-height: 1;
        
        color: var(--tg-theme-text-color, $tg-text-color);
        
        .content {
          padding: 20px 0;
        }
      }
    }
  }
}

</style>