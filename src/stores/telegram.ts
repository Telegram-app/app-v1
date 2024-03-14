import { defineStore } from "pinia";

type State = {
  WebApp: any;
  user: any;
  elements: {
    BackButton: any
  };
};

export const useTelegramStore = defineStore("telegram", {
  state: (): State => ({
    WebApp: null,
    user: null,
    elements: {
      BackButton: null
    }
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
        this.initElements()
      }
    },

    initTelegramUser() {
      this.user = this.WebApp.initDataUnsafe.user
    },

    initElements() {
      this.elements.BackButton = this.WebApp.BackButton
    }
  },
});
