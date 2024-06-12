import {defineStore} from "pinia"

export type AlertState = {
    show: boolean;
    type: 'success' | 'info' | 'warning' | 'error';
    message: string;
};

export const useAlertStore = defineStore("alert", {
    state: () => ({
        show: false,
        type: 'success',
        message: 'The bot cannot be attached',
    } as AlertState),

    getters: {

    },

    actions: {
        showAlert(type: 'success' | 'info' | 'warning' | 'error', message: string) {
            this.type = type
            this.message = message
            this.show = true

            setTimeout(() => {
                this.hideAlert()
            }, 5000)
        },
        hideAlert() {
            this.show = false
        }
    },

});