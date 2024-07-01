<template>
  <div class="account">
<!--    <h1>Личный кабинет</h1>-->
<!--    <button class="button" @click="toSelfStore()">Мой магазин</button>-->
<!--    <button class="button" @click="router.push({name: 'orders'})">Заказы</button>-->
<!--    <button class="button" @click="router.push({ name: 'market' })">Маркет</button>-->
    
    <div class="account__main self-card">
      <div class="account__main__avatar">
        <img v-if="user.avatar" :src="'/images/users/' + user.avatar" alt="avatar">
        <div class="account__main__avatar__create" v-else>
          <label>
            <IconCamera h="26" w="29" color="white"/>
            <input type="file" hidden @change="setAvatarPreviewUrl">
          </label>
        </div>
      </div>
      
      <div class="account__main__name">
        <span v-if="user.name">{{ user.name }}</span>
        <button class="account__main__name__create" @click="inputCreateNameShow()" v-else-if="!showInputCreateName">Create a name</button>
        <input v-else type="text" @keyup.enter="saveName">
      </div>
      
      <div class="account__main__address">
        <span>0QB84Y-BrKSiac2ifKz8L1c-MeHYZwBq-9cFs2ESwXyx_Xmd</span>
      </div>
      
      <div class="account__main__info">
        <div class="account__main__info__balance">
          Balance:<span>250$</span>
        </div>
        <div class="account__main__info__deals">
          Deals:<span>5 • 100%</span>
        </div>
        <div class="account__main__info__discounts">
          Discounts and promo codes:
          <div class="is-flex is-align-items-center">
            <span>10</span>
            <IconArrowNext h="14" w="14" color="purple"/>
          </div>
        </div>
      </div>
    </div>
    
    <div class="account__messenger">
      <div class="account__messenger__link">
        <span>Messenger</span>
        <IconArrowNext h="13" w="14" color="white"/>
      </div>
      
      <div class="account__messenger__message self-card">
        <div class="account__messenger__message__avatar">
          <img src="/images/users/review-avatar.svg" alt="avatar">
        </div>
        
        <div class="is-flex is-flex-direction-column">
          <div class="account__messenger__message__name is-flex is-justify-content-space-between is-align-items-center">
            <span @click="router.push({name: 'profile', params: {id: 1}})">Username</span>
            <span class="account__messenger__message__date">15:00</span>
          </div>
          <div class="account__messenger__message__text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do sfsf
          </div>
        </div>
      </div>
    </div>
    
    <div class="account__order__last">
      <div class="account__order__last__link" @click="router.push({name: 'orders'})">
        <span>Orders</span>
        <IconArrowNext h="13" w="14" color="white"/>
      </div>
      
      <div class="self-card" v-if="userStore.orders.length">
        <OrderCard :order="lastOrder"/>
      </div>
    </div>
    
    <div class="account__buttons">
      <VButton>Favorites</VButton>
      <VButton @click="router.push({ name: 'accountSettings' })">Settings</VButton>
    </div>
  </div>
</template>

<route lang="json">
{
"name": "account"
}
</route>

<script lang="ts">

import { defineComponent } from "vue";
import {useRouter} from 'vue-router';
import { useUserStore, Order } from '@/stores/user.ts';
import {useAlertStore} from '@/stores/alert.ts';

export default defineComponent({
  name: 'AccountPage',
  
  props: [],
  
  setup() {
    const router = useRouter()
    const userStore = useUserStore()
    const alertStore = useAlertStore()
    
    return { router, userStore, alertStore }
  },
  
  data: () => ({
    showInputCreateName: false
  }),
  
  mounted() {
    if (window.Telegram.WebApp) {
      window.Telegram.WebApp.MainButton.setParams({
        is_active: false,
        is_visible: false
      });
    }
    
    console.log(this.userStore.user);
  },
  
  computed: {
    user() {
      return this.userStore.data
    },
    
    selfStore() {
      return this.userStore.selfStore
    },
    
    lastOrder() {
      return this.userStore.orders.length > 1 ? this.userStore.orders.sort((a, b) => {
        return a.date <= b.date ? 1 : -1
      })[0] as Order : this.userStore.orders[0]
    },
  },
  
  methods: {
    toSelfStore() {
      if (!this.selfStore.subscription.has) {
        this.router.push({ name: 'subscription' })
      } else if (!this.selfStore.created) {
        this.router.push({ name: 'createStore' })
      } else {
        this.router.push({ name: 'storeInfo' })
      }
    },
    
    inputCreateNameShow() {
      this.showInputCreateName = true
      setTimeout(() => {
        document.querySelector<HTMLInputElement>('.account__main__name input')!.focus()
      })
    },
    
    setAvatarPreviewUrl(e: any) {
      const file = e.target.files[0] as File;
      this.userStore.saveAvatar('review-avatar.svg')
      this.alertStore.showAlert('success', 'Avatar changed successfully')
    },
    
    saveName(e: KeyboardEvent) {
      this.userStore.saveName((e.target as HTMLInputElement).value)
      this.showInputCreateName = false
      this.alertStore.showAlert('success', 'Name changed successfully')
    }
  },
  
})

</script>

<style scoped lang="scss">

.account {
  margin: -10px;
  min-height: 100vh;
  padding: 15px;
  
  background-image: url('/images/users/profile-bg.png');
  background-size: cover;
  background-repeat: no-repeat;
  
  .self-card {
    background: linear-gradient(211deg, #EAF4FD 0%, #84C4E7 100%);
  }
  
  &__main {
    padding-bottom: 15px;
    
    &__avatar {
      display: flex;
      margin: 15px auto 0;
      height: 138px;
      width: 138px;
      padding: 11px;
      
      border-radius: 100%;
      
      background-color: rgba(217, 217, 217, 0.01);
      box-shadow: -32px 20px 44px rgba(0, 0, 0, 0.07) inset;
      
      &__create {
        display: flex;
        flex: 1;
        justify-content: center;
        align-items: center;
        border-radius: 100%;
        
        background: #A7C6DB;
      }
      
      label {
        position: relative;
        
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        width: 100%;
        
        background: none;
        
        cursor: pointer;
      }
    }
    
    &__name {
      display: flex;
      justify-content: center;
      margin-top: 7px;
      text-align: center;
      
      span {
        font-size: 20px;
        font-family: "Helvetica Neue Cyr Bold", "Helvetica Neue", sans-serif;
        font-weight: 400;
        line-height: 1;
      }
      
      &__create {
        border: none;
        
        font-size: 12px;
        line-height: 1;
        text-decoration: underline;
        
        color: theme-var($--dark-text);
        background: none;
      }
      
      input {
        text-align: center;
        border: none;
        
        font-size: 20px;
        font-family: "Helvetica Neue Cyr Bold", "Helvetica Neue", sans-serif;
        font-weight: 400;
        line-height: 1;
        
        background: none;
        
        &:focus-visible {
          border: transparent;
          outline: transparent;
        }
      }
    }
    
    &__address {
      margin-top: 8px;
      text-align: center;
      
      font-size: 12px;
      line-height: 1;
      
      color: theme-var($--dark-text);
    }
    
    &__info {
      margin-top: 15px;
      
      font-size: 14px;
      line-height: 1;
      
      color: theme-var($--dark-text);
      
      &__balance {
        
        span {
          margin-left: 5px;
          
          color: #167a73;
        }
      }
      
      &__deals {
        margin-top: 5px;
        
        span {
          margin-left: 5px;
          
          color: #216dcb;
        }
      }
      
      &__discounts {
        display: flex;
        align-items: center;
        margin-top: 5px;
        
        span {
          margin-left: 5px;
          margin-right: 3px;
          
          color: #7f32cb;
        }
      }
    }
  }
  
  &__messenger {
    margin-top: 15px;
    
    &__link {
      display: flex;
      justify-content: center;
      align-items: center;
      
      font-size: 12px;
      text-transform: uppercase;
      line-height: 1;
      
      color: theme-var-tg(--tg-theme-button-text-color, $--tg-button-text-color);
      
      cursor: pointer;
      
      span {
        margin-right: 4px;
      }
    }
    
    &__message {
      display: flex;
      
      &__avatar {
        margin: auto 9px auto 0;
        min-height: 40px;
        height: 40px;
        min-width: 40px;
        width: 40px;
      }
      
      &__name {
        font-size: 13px;
        line-height: 1;
      }
      
      &__date {
        font-size: 12px;
        line-height: 1;
      }
      
      &__text {
        margin-top: 5px;
        
        font-size: 12px;
        
        color: theme-var($--dark-text);
      }
    }
  }
  
  &__order__last {
    margin-top: 15px;
    
    &__link {
      display: flex;
      justify-content: center;
      align-items: center;
      
      font-size: 12px;
      text-transform: uppercase;
      line-height: 1;
      
      color: theme-var-tg(--tg-theme-button-text-color, $--tg-button-text-color);
      
      cursor: pointer;
      
      span {
        margin-right: 4px;
      }
    }
  }
  
  &__buttons {
    .button {
      margin-top: 15px;
      
      color: theme-var-tg(--tg-theme-text-color, $--tg-text-color);
      background: linear-gradient(211deg, #EAF4FD 0%, #84C4E7 100%);
    }
  }
}

</style>