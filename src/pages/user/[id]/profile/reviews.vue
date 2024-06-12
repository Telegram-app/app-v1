<template>
  <div class="self-card profile__reviews">
    <template v-for="i in 3" :key="i">
      <Review :review="review"></Review>
      <div class="divider" v-if="i !== 3"></div>
    </template>
  </div>
</template>

<route lang="json">
{
"name": "profileReviews"
}
</route>

<script lang="ts">

import { defineComponent } from "vue";

export default defineComponent({
  name: 'ProfileReviewsPage',
  
  props: [],
  
  data: () => ({
    review: {
      from: {
        id:"OS-000000",
        name: "Username",
        image:"review-avatar.svg"
      },
      message:"xiphias sui campana asporto desolo audentia umquam patruus spoliatio comedo attero deprecator nemo coniecto vehemens praesentium suspendo antepono voluntarius utilis bardus cariosus arguo quae sto quidem bibo tabesco creta xiphias voveo tot viscus tenetur agnitio taedium delego arto statim currus solutio solium texo considero victoria copiose aggredior delicate debitis suus bellum fugit paulatim textilis strues abduco defungo traho alter despecto triumphus adopto aeneus defaeco molestias aduro adfero totus supra patior ullam bibo maiores vesco administratio acerbitas verbum cum vulariter uxor deputo aro"
    }
  }),
  
  computed: {
  
  },
  
})

</script>

<style scoped lang="scss">

.profile__reviews {
  .divider {
    margin: 10px 0;
  }
}

</style>