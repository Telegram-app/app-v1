<template>
  <AppLayout>
    <component :is="layout">
      <RouterView/>
    </component>
  </AppLayout>
</template>

<script lang="ts">

import { defineComponent } from 'vue'
import { useTelegramStore } from "@/stores/telegram"

declare global {
    interface Window {
        Telegram: any;
    }
}

export default defineComponent({
    name: 'App',

    setup() {
        const twa = useTelegramStore()

        return { twa }
    },
    
    computed: {
        layout() {
            console.log(this.$route?.meta?.layout)
            return (this.$route?.meta?.layout || 'not-found') + '-layout'
        }
    },

    data: () => ({
        //
    }),

    beforeMount() {
        this.twa.initTelegramWebApp(window.Telegram.WebApp)
    },

    mounted() {

    },
})

</script>

<style lang="scss">

</style>
