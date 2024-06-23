<template>
  <transition>
    <router-view v-slot="{ Component }">
      <transition>
        <component :is="Component" />
      </transition>
    </router-view>
  </transition>
</template>

<script lang="ts">

import { defineComponent } from "vue";

export default defineComponent({
  name: 'StorePageLayout',
  
  props: [],
  
  data: () => ({
  
  }),
  
  computed: {
  
  },
  
})

</script>

<style scoped lang="scss">



</style>