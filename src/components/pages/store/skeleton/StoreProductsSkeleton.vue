<template>
  <div class="store__products">
    <StoreProductCardSkeleton v-for="i in 5"></StoreProductCardSkeleton>
  </div>
</template>

<script lang="ts">

import {defineComponent} from 'vue';

export default defineComponent({
  name: 'StoreProductsSkeleton',
});

</script>

<style scoped lang="scss">


</style>