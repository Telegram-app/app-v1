import { defineStore } from "pinia";

type State = {
  user: any;
  theme: 'light' | 'dark';
};

export const useTelegramStore = defineStore("telegram", {
  state: (): State => ({
    user: null,
    theme: 'dark'
  }),

  getters: {

  },

  actions: {

  },
});
