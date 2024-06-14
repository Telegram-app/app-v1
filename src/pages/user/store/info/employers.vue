<template>
  <div class="store-employers">
    <div class="store-employers__stats">
      <span class="store-employers__stats__count">50</span>
      <span class="store-employers__stats__title">employers</span>
    </div>
    
    <div class="self-card store-employers__links">
      <template v-for="(link, i) in links" :key="'link-' + i">
        <div class="store-employers__links__link" @click="router.push(link.to)">
          <div class="store-employers__links__link__icon">
            <img :src="'/images/icons/selfStore/' + link.icon + '.svg'" alt="icon">
          </div>
          
          <div class="store-employers__links__link__title">
            {{ link.title }}
          </div>
          
          <div class="store-employers__links__link__to">
            <IconChevronRight h="11" w="7" color="transparent-grey"/>
          </div>
        </div>
        
        <div class="divider" v-if="i !== links.length - 1"></div>
      </template>
    </div>
    
    <div class="store-employers__filters">
      <div class="store-employers__filters__search field">
        <p class="control has-icons-left">
          <input class="input reset" type="search" :placeholder="filter.selfStore.employers.inputs.search.placeholder" v-model="filter.selfStore.employers.inputs.search.value">
          <span class="store-employers__filters__search__icon">
              <IconSearch h="9" w="8"/>
            </span>
        </p>
      </div>
      
      <div class="store-employers__filters__city">
        <VSelect :type="2" :open="filter.selfStore.employers.selects.city.open" :label="filter.selfStore.employers.selects.city.label" v-model="filter.selfStore.employers.selects.city.active" :options="filter.selfStore.employers.selects.city.options" @open="filter.openSelfStoreEmployersSelect(0)"
                 @close="filter.selfStore.employers.selects.city.open = false"/>
      </div>
      
      <div class="store-employers__filters__product">
        <VSelect :type="2" :open="filter.selfStore.employers.selects.product.open" :label="filter.selfStore.employers.selects.product.label" v-model="filter.selfStore.employers.selects.product.active" :options="filter.selfStore.employers.selects.product.options" @open="filter.openSelfStoreEmployersSelect(1)"
                 @close="filter.selfStore.employers.selects.product.open = false"/>
      </div>
    </div>
    <div class="b-table" :class="{'is-loading table--blur': loading}">
      <div class="table-wrapper">
        <table class="store-employers__table table is-fullwidth">
          <thead class="store-employers__table__head">
          <tr>
            <th>Username</th>
            <th class="has-text-centered">Market</th>
            <th class="has-text-centered">Store</th>
            <th class="has-text-centered">More</th>
          </tr>
          </thead>
          <transition name="fade-blur">
            <div class="backdrop--blur" v-show="menuOpened" @click="menuOpened = false"></div>
          </transition>
          
          <tbody class="store-employers__table__body">
          
          <!--          loading-->
          <!--          <tr v-for="i of 6" :key="'stub-' + i" v-if="loading && !sortedUsernames.length">-->
          <tr v-for="i of 6" :key="'stub-' + i" @touchstart="touchStart($event)" @touchend="touchEnd()" @contextmenu.prevent>
            <td>
              <div class="store-employers__table__body__username">
                <div>
                  <img src="/images/users/review-avatar.svg" alt="avatar">
                </div>
                <span>Username</span>
              </div>
            </td>
            <td>
              <div class="store-employers__table__body__market store-employers__table__body__stat">
                <span>100</span>
                <span>100%</span>
              </div>
            </td>
            <td>
              <div class="store-employers__table__body__store store-employers__table__body__stat">
                <span>100</span>
                <span>100%</span>
              </div>
            </td>
            <td class="has-text-right">
              <div class="store-employers__table__body__icon">
                <div></div>
                <div></div>
                <div></div>
              </div>
            </td>
          </tr>
          
          <!--          loaded-->
          <!--          <tr v-for="key of sortedUsernames" :key="key.id">-->
          <!--            <td>-->
          <!--              <div class="store-employers__table__body__username">-->
          <!--                <span>{{ key.usernameTypes.telegram }}</span>-->
          <!--                <span>{{ key.usernameTypes.ton }}</span>-->
          <!--              </div>-->
          <!--            </td>-->
          <!--            <td>-->
          <!--              <div class="store-employers__table__body__price-and-date">-->
          <!--                <span><IconToken h="14" w="14"/>{{ key.bids.highest.toLocaleString('en-US') }}</span>-->
          <!--                <span>{{ key.leftTime?.humanize }}</span>-->
          <!--              </div>-->
          <!--            </td>-->
          <!--            <td class="has-text-right">-->
          <!--              <div class="store-employers__table__body__icon" @click="toUsernamePage(key.usernameTypes.default)">-->
          <!--                <IconChevronRight h="11" w="6"/>-->
          <!--              </div>-->
          <!--            </td>-->
          <!--          </tr>-->
          
          <!--          not found-->
          <!--          <tr class="is-empty store-employers__table__body__not-found" v-if="!loading && !sortedUsernames.length">-->
          <!--            <td colspan="4">-->
          <!--              <div class="content has-text-centered">-->
          <!--                <p>Nothing's there…</p>-->
          <!--              </div>-->
          <!--            </td>-->
          <!--          </tr>-->
          </tbody>
        </table>
      </div>
    </div>
    
    <transition name="fade">
<!--      :class="{ 'store-employers__menu&#45;&#45;show': menuOpened }-->
      <div class="store-employers__menu" v-show="menuOpened">
        <div>
          <div class="store-employers__menu__icon">
            <img src="/images/icons/selfStore/smile.svg" alt="icon">
          </div>
          <span>Award a prize</span>
        </div>
        <div class="divider"></div>
        <div>
          <div class="store-employers__menu__icon">
            <img src="/images/icons/selfStore/permission.svg" alt="icon">
          </div>
          <span>Edit permissions</span>
        </div>
        <div class="divider"></div>
        <div>
          <div class="store-employers__menu__icon">
            <img src="/images/icons/selfStore/pencil.svg" alt="icon">
          </div>
          <span>Make a note</span>
        </div>
      </div>
    </transition>
  </div>
</template>

<route lang="json">
{
"name": "storeEmployers"
}
</route>

<script lang="ts">

import {defineComponent} from 'vue';
import {useRouter} from 'vue-router';
import {useFilter} from '@/stores/filters.ts';

export default defineComponent({
  name: 'StoreEmployersPage',
  
  props: [],
  
  setup() {
    const router = useRouter();
    const filterStore = useFilter();
    
    return {router, filterStore};
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
      {icon: 'invite', title: 'Invite', to: 'notFound'},
      {icon: 'create', title: 'Create a group', to: 'notFound'},
      {icon: 'prize', title: 'Award a prize', to: 'notFound'},
    ],
    loading: false,
    menuOpened: false,
    touch: {
      target: undefined,
      interval: 0,
      timeStamp: 0
    }
  }),
  
  computed: {
    filter() {
      return this.filterStore;
    }
  },
  
  methods: {
    touchStart(event: any) {
      this.touch.target = event
      this.touch.interval = setInterval(() => {
        this.touch.timeStamp = event.timeStamp
      }, 100)
    },
    touchEnd() {
      clearInterval(this.touch.interval)
      this.touch.timeStamp = 0
    },
    openMenu(event: any) {
      let tr = event.target.closest('tr');
      let trRect = tr.getBoundingClientRect()
      let menu = document.querySelector<HTMLElement>('.store-employers__menu')!
      
      this.menuOpened = true
      
      setTimeout(() => {
        menu.style.top = trRect.top - trRect.height - menu.scrollHeight - 9 + 'px'
      })
      
      tr.classList.add('item-selected');
    }
  },
  
  watch: {
    menuOpened(newValue) {
      if (newValue === false) {
        document.querySelector<HTMLElement>('.item-selected')?.classList.remove('item-selected')
      }
    },
    'touch.timeStamp'(newValue) {
      if (newValue >= 20000) {
        this.openMenu(this.touch.target)
        this.touchEnd()
      }
    }
  }
  
});

</script>

<style scoped lang="scss">

.store-employers {
  .backdrop--blur {
    position: absolute;
    top: -1000px;
    right: -1000px;
    bottom: -1000px;
    left: -1000px;
    z-index: 100;
    
    background: rgba(0,0,0,0.1);
    backdrop-filter: blur(11px) opacity(1);
  }
  
  .item-selected {
    position: relative;
    z-index: 9999;
    
    transition: 2s all;
    
    td {
      &:first-child {
        border-radius: 10px 0 0 10px !important;
      }
      &:last-child {
        border-radius: 0 10px 10px 0 !important;
      }
    }
  }
  
  &__stats {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 28px;
    
    &__count {
      font-size: 36px;
      font-family: "Helvetica Neue Cyr Medium", "Helvetica Neue", sans-serif;
      font-weight: 400;
      line-height: 1;
      
      color: #56A2FF;
      background: linear-gradient(180deg, #56A2FF 0%, #216DCB 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    
    &__title {
      margin-top: 10px;
      
      font-size: 16px;
      font-family: "Helvetica Neue Cyr Medium", "Helvetica Neue", sans-serif;
      font-weight: 400;
      line-height: 1;
      text-transform: uppercase;
      
      color: theme-var-tg(--tg-theme-hint-color, $--tg-hint-color);
    }
  }
  
  &__links {
    margin-top: 25px;
    
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
      
      &__to {
        margin-left: 15px;
        
        cursor: pointer;
      }
    }
  }
  
  &__filters {
    display: flex;
    margin-top: 15px;
    
    &__search {
      margin-right: 15px;
      margin-bottom: 0;
      
      input {
        height: 25px;
        padding-bottom: 6px !important;
        padding-left: 30px !important;
        border-radius: 20px;
        
        font-size: 12px;
        line-height: 1;
        
        color: theme-var-tg(--tg-theme-text-color, $--tg-text-color);
        background-color: theme-var($--card-bg-color);
        
        &::placeholder {
          line-height: 1;
          
          color: theme-var-tg(--tg-theme-hint-color, $--tg-hint-color);
          opacity: 1;
        }
        
        &:focus-visible, &:focus {
          outline: none;
          
          box-shadow: unset;
        }
      }
      
      &__icon {
        position: absolute;
        left: 17px;
        top: 50%;
        transform: translateY(-50%);
        
        display: flex;
        align-items: center;
        justify-content: center;
        height: 9px;
        width: 8px;
      }
    }
    
    &__city {
      margin-right: 5px;
    }
    
    &__products {
    
    }
  }
  
  &__table {
    margin-top: 9px;
    
    background: none;
    
    &__head {
      
      th {
        padding-bottom: 10px;
        border: none;
        
        font-size: 12px;
        line-height: 1;
        font-family: "Helvetica Neue Cyr Roman", "Helvetica Neue", sans-serif;
        font-weight: normal;
        
        color: theme-var-tg(--tg-theme-hint-color, $--tg-hint-color);
      }
    }
    
    &__body {
      tr {
        td {
          background: theme-var-tg(--tg-theme-bg-color, $--tg-bg-color);
          
          transition: .5s all;
        }
        
        &:first-child {
          td:first-child {
            border-radius: 10px 0 0 0;
          }
          td:last-child {
            border-radius: 0 10px 0 0;
          }
        }
        
        &:last-child {
          td:first-child {
            border-radius: 0 0 0 10px;
          }
          td:last-child {
            border-radius: 0 0 10px 0;
          }
        }
      }
      
      td {
        vertical-align: middle;
        border-bottom: 1px solid theme-var-tg(--tg-theme-secondary-bg-color, $--tg-secondary-bg-color);
      }
      
      &__username {
        display: flex;
        align-items: center;
        margin: auto 0;
        
        font-size: 14px;
        line-height: 1;
        
        color: theme-var-tg(--tg-theme-text-color, $--tg-text-color);
        
        div {
          margin-right: 10px;
          height: 25px;
          width: 25px;
          border-radius: 5px;
          
          img {
            height: 100%;
            width: 100%;
            
            object-fit: cover;
          }
        }
      }
      
      &__stat {
        display: flex;
        align-items: center;
        margin: auto;
        max-width: 58px;
        padding: 1px 5px 1px 1px;
        border-radius: 15px;
        
        background: theme-var-tg(--tg-theme-secondary-bg-color, $--tg-secondary-bg-color);
        
        span {
          font-size: 8px;
          font-family: "Helvetica Neue Cyr Medium", "Helvetica Neue", sans-serif;
          font-weight: 400;
          line-height: 1;
          
          &:first-child {
            padding: 5px 6px;
            border-radius: 15px;
            
            color: theme-var-tg(--tg-theme-button-text-color, $--tg-button-text-color);
          }
          
          &:last-child {
            margin-left: 5px;
            
            color: theme-var-tg(--tg-theme-hint-color, $--tg-hint-color);
          }
        }
      }
      
      &__market span:first-child {
        background: #8D78FF;
      }
      
      &__store span:first-child {
        background: theme-var($--success-color)
      }
      
      &__icon {
        display: flex;
        gap: 2px;
        margin: auto;
        max-width: 13px;
        
        div {
          height: 3px;
          width: 3px;
          border-radius: 1px;
          
          background: theme-var-tg(--tg-theme-hint-color, $--tg-hint-color)
        }
      }
    }
  }
  
  &__menu {
    position: absolute;
    right: 0;
    z-index: 1000;
    
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    padding: 9px 0;
    
    font-size: 12px;
    line-height: 1;
    
    background-color: theme-var-tg(--tg-theme-bg-color, $--tg-bg-color);
    
    transition: 0.5s all;
    
    div {
      display: flex;
      align-items: center;
      padding: 0 40px 0 13px;
    }
    
    &__icon {
      margin-right: 10px;
      padding: 0 !important;
    }
    
    .divider {
      padding: 0;
      margin: 7px 0;
    }
    
    &--show {
      display: flex;
    }
  }
}

.fade-blur-enter-active {
  animation: fadeBlur 0.5s;
}
.fade-blur-leave-active {
  animation: fadeBlur 0.5s reverse;
}

@keyframes fadeBlur {
  0% {
    backdrop-filter: blur(0px) opacity(0);
  }
  100% {
    backdrop-filter: blur(11px) opacity(1);
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

</style>