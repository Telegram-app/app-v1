<template>
  <DefaultLayout>
    <transition>
      <RouterView/>
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