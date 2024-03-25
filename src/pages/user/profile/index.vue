<template>
  <div>
    <h1>Профиль</h1>
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

export default defineComponent({
  name: 'ProfilePage',
  
  props: [],
  
  setup() {
    const router = useRouter()
    
    return { router }
  },
  
  data: () => ({
  
  }),
  
  computed: {
  
  },
  
})

</script>

<style scoped lang="scss">



</style>