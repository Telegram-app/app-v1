import {defineStore} from "pinia";
import dayjs, {Dayjs} from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime'
import duration  from 'dayjs/plugin/duration'
import {Username, generateFakeUsername, LeftTime} from "@/models/username.model.ts";

dayjs.extend(relativeTime)
dayjs.extend(duration)

export type AuctionState = {
    usernames: Username[];
};

export const useAuctionStore = defineStore("auction", {
    state: () => ({
        usernames: [],
    } as AuctionState),

    getters: {
        getUsernames(state) {
            return state.usernames
        }
    },

    actions: {
        createNewUsername(username: Username) {
            if (!username) return;

            this.usernames.push(username);
        },

        updateUsername(id: string, payload: Username) {
            if (!id || !payload) return;

            const index = this.findIndexById(id);

            if (index !== -1) {
                this.usernames[index] = generateFakeUsername();
            }
        },

        deleteUsername(id: string) {
            const index = this.findIndexById(id);

            if (index === -1) return;

            this.usernames.splice(index, 1);
        },

        findIndexById(id: string) {
            return this.usernames.findIndex((item) => item.id === id);
        },

        updateTimeLeft() {
            this.usernames.forEach(username => {
                let endDate = dayjs(username.startDate).add(10, 'days')
                username.leftTime = timeInLockDownHumanize(endDate).timeInLockDown
                username.leftTimeHumanize = timeInLockDownHumanize(endDate).leftTimeHumanize
            })
        }
    },
});

function timeInLockDownHumanize(endDate: Dayjs) {
    let diff = dayjs(endDate).diff(dayjs())
    let millisecondsLeft = dayjs(endDate).diff(dayjs(), 'millisecond')

    let diffDuration = dayjs.duration(diff)

    let timeInLockDown: LeftTime = {
        // months: diffDuration.months(),
        days: diffDuration.days(),
        hours: diffDuration.hours(),
        minutes: diffDuration.minutes(),
        seconds: diffDuration.seconds(),
        millisecondsLeft: millisecondsLeft
    }

    let timeInLockDownHumanize = {
        days: timeInLockDown.days > 1 ? timeInLockDown.days + ' days ' : timeInLockDown.days === 1 ? timeInLockDown.days + ' day ' : '',
        hours: timeInLockDown.hours > 1 ? timeInLockDown.hours + ' hours ' : timeInLockDown.hours === 1 ? timeInLockDown.hours + ' hour ' : '',
        minutes: timeInLockDown.minutes > 1 ? timeInLockDown.minutes + ' minutes ' : timeInLockDown.minutes === 1 ? timeInLockDown.minutes + ' minute ' : '',
        seconds: timeInLockDown.seconds > 1 ? timeInLockDown.seconds + ' seconds ' : timeInLockDown.seconds === 1 ? timeInLockDown.seconds + ' second ' : '',
    }

    let leftTimeHumanize: string

    if (timeInLockDown.days > 0) leftTimeHumanize = timeInLockDownHumanize.days + timeInLockDownHumanize.hours + 'left'
    else if (timeInLockDown.hours > 0) leftTimeHumanize = timeInLockDownHumanize.hours + timeInLockDownHumanize.minutes + 'left'
    else if (timeInLockDown.minutes > 0) leftTimeHumanize = timeInLockDownHumanize.minutes + timeInLockDownHumanize.seconds + 'left'
    else if (timeInLockDown.seconds > 0) leftTimeHumanize = timeInLockDownHumanize.seconds + 'left'
    else leftTimeHumanize = 'Lot sold'

    return { timeInLockDown, leftTimeHumanize }
}
