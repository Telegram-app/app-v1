import { defineStore } from "pinia";
import {WebApp} from '@/models/telegram.model.ts';

type State = {
  WebApp: null | WebApp;
  user: any;
  theme: 'light' | 'dark';
};

export const useTelegramStore = defineStore("telegram", {
  state: (): State => ({
    WebApp: null,
    user: null,
    theme: 'light'
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
      this.user = this.WebApp?.initDataUnsafe.user
      this.theme = this.WebApp?.colorScheme || 'light'
    },
  },
});
