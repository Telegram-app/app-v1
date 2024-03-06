<template>
  <div class="auction">
    <VTabs>
      <VTab title="Usernames">
        <AuctionUsernames/>
      </VTab>
      <VTab title="Numbers">
        Numbers
      </VTab>
      <VTab title="Premium">
        Premium
      </VTab>
    </VTabs>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  name: "AuctionView",

  data: () => ({
    activeTab: 'usernames',
  }),

  computed: {},

  mounted() {},
});
</script>

<style lang="scss">

.auction {
  padding-top: 17px;
}

</style>
