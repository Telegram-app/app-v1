import { defineStore } from "pinia";

type State = {
  WebApp: any;
  user: any;
  theme: string;
};

export const useTelegramStore = defineStore("telegram", {
  state: (): State => ({
    WebApp: null,
    user: null,
    theme: ''
  }),

  getters: {
    getWebApp(store) {
      return store.WebApp
    }
  },

  actions: {
    initTelegramWebApp(WebApp: any) {
      if (WebApp.initData) {
        WebApp.expand()

        this.WebApp = WebApp

        this.initTelegramUser()
      }
    },

    initTelegramUser() {
      this.user = this.WebApp.initDataUnsafe.user
    },
  },
});
