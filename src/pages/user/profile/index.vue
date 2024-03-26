<template>
  <div>
    <h1>Профиль</h1>
    <button class="button" @click="toSelfStore()">Мой магазин</button>
    <button class="button" @click="router.push({name: 'orders'})">Заказы</button>
    <button class="button" @click="router.push({ name: 'market' })">Маркет</button>
  </div>
</template>

<route lang="json">
{
"name": "profile"
}
</route>

<script lang="ts">

import { defineComponent } from "vue";
import {useRouter} from 'vue-router';
import { useUserStore } from '@/stores/user.ts';

export default defineComponent({
  name: 'ProfilePage',
  
  props: [],
  
  setup() {
    const router = useRouter()
    const userStore = useUserStore()
    
    return { router, userStore }
  },
  
  computed: {
    selfStore() {
      return this.userStore.selfStore
    }
  },
  
  data: () => ({
  
  }),
  
  methods: {
    toSelfStore() {
      if (!this.selfStore.subscription) {
        this.router.push({ name: 'subscription' })
      } else if (!this.selfStore.created) {
        this.router.push({ name: 'createStore' })
      } else {
        this.router.push({ name: 'storeSettings' })
      }
    }
  },
  
})

</script>

<style scoped lang="scss">



</style>