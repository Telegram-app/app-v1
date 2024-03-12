<template>
  <DefaultLayout>
    <router-link :to="{ name: 'auction' }">Аукцион</router-link>
  </DefaultLayout>
</template>

<script lang="ts">

import { defineComponent } from "vue";

export default defineComponent({
  name: '',
  
  props: [],
  
  data: () => ({
  
  }),
  
  computed: {
  
  },
  
})

</script>

<style scoped lang="scss">



</style>