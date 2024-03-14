import { defineStore } from "pinia";
import { useRouter } from "vue-router";

const router = useRouter()

type State = {
  WebApp: any;
  user: any;
  button: any;
};

export const useTelegramStore = defineStore("telegram", {
  state: (): State => ({
    WebApp: null,
    user: null,
    button: null
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
        this.WebApp = WebApp;
        this.user = WebApp.initDataUnsafe?.user;
        this.button = WebApp.BackButton.onClick(function() {
          router.back()
        })
      }
    }
  },
});
