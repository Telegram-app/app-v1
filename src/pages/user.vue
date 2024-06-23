<template>
  <DefaultLayout>
    <transition>
      <router-view v-slot="{ Component }">
      <component :is="Component" />
</router-view>
    </transition>
  </DefaultLayout>
</template>

<script lang="ts">

import { defineComponent } from "vue";

export default defineComponent({
  name: 'UserPageLayout',
  
  props: [],
  
  data: () => ({
  
  }),
  
  computed: {
  
  },
  
})

</script>

<style scoped lang="scss">



</style>