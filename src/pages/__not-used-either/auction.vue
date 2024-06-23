<template>
  <div class="auction">
    <AuctionLinks :links="links"/>
    
    <transition>
      <router-view v-slot="{ Component }">
      <component :is="Component" />
</router-view>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

interface Links {
  title: string,
  to: string
}

export default defineComponent({
  name: "AuctionPage",

  data: () => ({
    links: [
      {title: 'Usernames', to: '/auction/usernames'},
      {title: 'Premium', to: '/auction/premium'},
    ] as Links[],
    activeLink: 'usernames',
  }),

  computed: {},

  mounted() {},
});
</script>

<style lang="scss">

.auction {
  padding-top: 30px;
}

</style>
