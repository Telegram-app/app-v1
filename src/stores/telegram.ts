import { defineStore } from "pinia";

type State = {
  user: any;
  theme: 'light' | 'dark';
  loading: boolean
};

export const useTelegramStore = defineStore("telegram", {
  state: (): State => ({
    user: null,
    theme: 'dark',
    loading: true
  }),

  getters: {

  },

  actions: {

  },
});
