<template>
  <transition>
    <RouterView></RouterView>
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