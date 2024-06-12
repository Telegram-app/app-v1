<template>
  <div class="settings">
    <div class="self-card">
      <VButton color="red" @click="clearLocalStorage()">Clear local storage</VButton>
    </div>
  </div>
</template>

<route lang="json">
{
"name": "settings"
}
</route>

<script lang="ts">

import { defineComponent } from "vue";

export default defineComponent({
  name: 'SettingsPage',
  
  props: [],
  
  data: () => ({
  
  }),
  
  computed: {
  
  },
  
  methods: {
    clearLocalStorage() {
      localStorage.clear()
      window.Telegram.WebApp.close();
    }
  }
  
})

</script>

<style scoped lang="scss">



</style>