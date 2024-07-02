<template>
  <div class="profile">
    <div class="profile__main self-card">
      <div class="profile__main__avatar">
        <img :src="'/images/users/' + user.avatar" alt="avatar">
      </div>
      
      <div class="profile__main__name">
        <span>{{ user.username || user.id }}</span>
      </div>
      
      <div class="profile__main__info">
        <div class="profile__main__info__balance">
          Balance:<span>250$</span>
        </div>
        <div class="profile__main__info__deals">
          Deals:<span>5 • 100%</span>
        </div>
        <div class="profile__main__info__discounts">
          Discounts and promo codes:
          <div class="is-flex is-align-items-center">
            <span>10</span>
            <IconArrowNext h="14" w="14" color="purple"/>
          </div>
        </div>
      </div>
    </div>
    
    <ProfileLinks :links="links"/>
    
    <transition>
      <router-view v-slot="{ Component }">
      <component :is="Component" />
</router-view>
    </transition>
  </div>
</template>

<route lang="json">
{
"name": "profile"
}
</route>

<script lang="ts">

import { defineComponent } from "vue";

import { useUserStore } from '@/stores/user.ts';
import {useRoute, useRouter} from 'vue-router';

interface Links {
  title: string,
  to: string
}

export default defineComponent({
  name: '',
  
  props: [],
  
  setup() {
    const router = useRouter()
    const route = useRoute()
    const userStore = useUserStore()
    
    return { router, route, userStore }
  },
  
  data: () => ({
  
  }),
  
  mounted() {
    if (window.Telegram.WebApp) {
      window.Telegram.WebApp.MainButton.setParams({
        is_active: false,
        is_visible: false
      });
    }
  },
  
  computed: {
    user() {
      return this.userStore.getUserById(Number(this.route.params.id))
    },
    links() {
      return [
        {title: 'Reviews', to: `/user/${this.route.params.id}/profile/reviews`},
        {title: 'Notes', to: `/user/${this.route.params.id}/profile/notes`}
      ] as Links[]
    }
  },
  
})

</script>

<style scoped lang="scss">

.profile {
  &__main {
    margin-bottom: 15px;
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
        font-family: "Helvetica Neue Cyr Roman", "Helvetica Neue", sans-serif;
        font-weight: normal;
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
}

</style>