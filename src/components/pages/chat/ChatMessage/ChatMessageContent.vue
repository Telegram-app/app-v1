<template>
  <div class="message__content">
    <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab accusamus architecto cupiditate, delectus, dolore dolorem doloremque et facere minus molestiae mollitia optio quis rem sequi soluta. Adipisci omnis tempore unde!</span>
  </div>
</template>

<script lang="ts">

import { defineComponent } from "vue";

export default defineComponent({
  name: 'ChatMessageContent',
  
  props: [],
  
  data: () => ({
  
  }),
  
  computed: {
  
  },
  
})

</script>

<style scoped lang="scss">

.message__content {
  span {
    font-size: 14px;
  }
}

</style>