import { defineStore } from "pinia";

type State = {
  WebApp: any;
  user: any;
};

export const useTelegramStore = defineStore("telegram", {
  state: (): State => ({
    WebApp: null,
    user: null,
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
        WebApp.BackButton.show()
        this.WebApp = WebApp;
        this.user = WebApp.initDataUnsafe?.user;
      }
    }
  },
});
