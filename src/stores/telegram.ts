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

  getters: {},

  actions: {
    initTelegramWebApp(WebApp: any) {
      WebApp.ready();

      this.WebApp = WebApp;
      this.user = WebApp.initDataUnsafe?.user;
    },
  },
});
