<template>
  <nav class="navbar">
    <a @click.prevent="route.path === '/' ? closeApp() : router.back()" class="navbar__close">{{ route.path === '/' ? 'Cancel' : 'Back' }}</a>

    <div class="navbar__app-name">
      <h1 class="navbar__app-name__text">App</h1>
      <span class="navbar__app-name__caption">bot</span>
    </div>

    <span class="navbar__button__menu icon">
      <IconEllipsisCircleOutline h="24px" w="24px" />
    </span>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapState } from "pinia";
import { useTelegramStore } from "@/stores/telegram";
import { useRouter, useRoute } from "vue-router";

export default defineComponent({
  name: "AppNavbar",

  data: () => ({}),
  
  setup() {
    const router = useRouter()
    const route = useRoute()
    
    return { router, route }
  },

  computed: {
    activeLink() {
      return this.$route.name;
    }
  },

  methods: {
    closeApp() {
      window.Telegram.WebApp.close();
    },
    toBackPage() {
      console.log(this.activeLink);
    },
  },
});
</script>

<style scoped lang="scss">
/* Позиционирование */

/* Блочная модель */

/* Типографика */

/* Оформление */

/* Анимация */

/* Разное */

.navbar {
  position: relative;

  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 66px;
  height: 66px;
  padding: 15px 26px;

  background: var(--tg-theme-secondary-bg-color, $tg-secondary-bg-color);

  &__close {
    font-size: 13px;

    color: var(--tg-theme-link-color, $tg-link-color);
  }

  &__app-name {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);

    display: flex;
    flex-direction: column;
    align-self: center;

    &__text {
      font-size: 17px;
      font-weight: bold;
      line-height: 100%;
    }

    &__caption {
      margin-top: 4px;
      margin-right: 1px;

      text-align: center;

      color: var(--tg-theme-hint-color, $tg-hint-color);

      font-size: 13px;
      line-height: 100%;
    }
  }

  &__button {
    &__menu {
      cursor: pointer;
    }
  }
}
</style>
