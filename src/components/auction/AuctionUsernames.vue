<template>
  <div class="auction-usernames">
    <h1 class="auction-usernames__title">Buy and Sell Usernames</h1>
    
    <p class="auction-usernames__description">
      Secure your name with blockchain in an ecosystem of 700+ million users and assging it as a link for your personal account, channel or group.
      <span class="auction-usernames__description__learn-more">Learn more <IconChevronRight class="auction-usernames__description__learn-more__icon" h="9" w="6"/></span>
    </p>
    
    <div class="auction-usernames__search field">
      <p class="control has-icons-left">
        <input class="input" type="search" placeholder="Enter a Telegram username..." v-model="search">
        <span class="auction-usernames__search__icon">
          <IconSearch h="10" w="9"/>
        </span>
      </p>
    </div>
    
    <div class="auction-usernames__sorting">
      <span class="auction-usernames__sorting__title">Auctions</span>
      <div class="auction-usernames__sorting__wrapper">
        <span class="auction-usernames__sorting__active" @click="search ? '' : sortBy.active = !sortBy.active">{{ sortBy.active ? 'On auction' : 'Not at auction' }} <IconSorting w="7" h="4.67" :coloredArrow="sortBy.active"/></span>
        <span class="auction-usernames__sorting__price" @click="sortUsernamesBy()">
          {{ sortBy.isPrice && sortBy.price === 'asc' ? 'Price low to high' : sortBy.isPrice && sortBy.price === 'desc' ? 'Price high to low' : '' }}
          {{ !sortBy.isPrice && sortBy.timeLeft === 'asc' ? 'Time left low to high' : !sortBy.isPrice && sortBy.timeLeft === 'desc' ? 'Time left high to low' : '' }}
          <IconSorting w="7" h="4.67" :coloredArrow="sortBy.isPrice ? sortBy.price === 'asc' : sortBy.timeLeft === 'asc'"/>
        </span>
      </div>
    </div>
    
    <table class="auction-usernames__table table is-fullwidth" v-show="!loading">
      <thead class="auction-usernames__table__head">
        <tr>
          <th>Username</th>
          <th>Minimum bid</th>
          <th></th>
        </tr>
      </thead>
      <tbody class="auction-usernames__table__body">
        <tr v-for="key of sortedUsernames" :key="key.id">
          <td>
            <div class="auction-usernames__table__body__username">
              <span>{{ key.name }}</span>
              <span>{{ key.link }}</span>
            </div>
          </td>
          <td>
            <div class="auction-usernames__table__body__price-and-date">
              <span><IconToken h="14" w="14"/>{{ key.currentBid.toLocaleString('en-US') }}</span>
              <span>{{ key.leftTimeHumanize }}</span>
            </div>
          </td>
          <td class="has-text-right">
            <div class="auction-usernames__table__body__icon">
              <IconChevronRight h="11" w="6"/>
            </div>
          </td>
        </tr>
        <tr class="auction-usernames__table__body__not-found" v-if="!sortedUsernames.length">
          <td><span>Not found</span></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">

import {defineComponent} from "vue";
import {mapState} from "pinia";
import {useAuctionStore} from "@/stores/auction.ts";
import {Username, generateFakeUsername} from "@/models/username.model.ts";
import IconToken from "@/components/icons/IconToken.vue";

export default defineComponent({
  name: '',
  components: {IconToken},
  
  props: [],
  
  setup() {
    const store = useAuctionStore()
    
    return {store}
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
    this.generateFakeUsernames()
    
    this.interval = setInterval((): void => {
      this.store.updateTimeLeft()
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
          return username.name.includes(this.search)
        })
      }
      
      if (this.sortBy.active) {
        return [...this.usernames].filter(username => {
          return username.leftTime.millisecondsLeft > 0
        }).sort((a, b) => {
          if (this.sortBy.isPrice) {
            if (this.sortBy.price === 'asc') {
              return a.currentBid >= b.currentBid ? 1 : -1
            } else if (this.sortBy.price === 'desc') {
              return a.currentBid <= b.currentBid ? 1 : -1
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
              return a.currentBid >= b.currentBid ? 1 : -1
            } else if (this.sortBy.price === 'desc') {
              return a.currentBid <= b.currentBid ? 1 : -1
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
    
    generateFakeUsernames() {
      for (let i = 0; i < 10; i++) {
        this.store.createNewUsername(generateFakeUsername())
        
        console.log(i)
        if (i === 9) {
          this.loading = false
        }
      }
    },
  }
})

</script>

<style lang="scss">

.auction-usernames {
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
          
          svg {
            margin-right: 5px;
          }
        }
        
        span:last-child {
          margin-top: 3px;
          
          font-size: 12px;
          line-height: 1;
        }
      }
      
      &__icon {
        cursor: pointer;
      }
      
      &__not-found {
        font-size: 14px;
        line-height: 1;
      }
    }
  }
}

</style>