<template>
  <div class="reviews__image__skeleton skeleton-gradient-animation"></div>
</template>

<script lang="ts">

import { defineComponent } from "vue";

export default defineComponent({
  name: 'ReviewsImageSkeleton',
})

</script>

<style scoped lang="scss">

.reviews__image__skeleton {
  display: flex;
  height: 125px;
  width: 100%;
  border-radius: 8px;
}

</style>