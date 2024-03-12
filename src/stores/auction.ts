import {defineStore} from "pinia"
import dayjs, {Dayjs} from "dayjs"
import relativeTime from 'dayjs/plugin/relativeTime'
import duration  from 'dayjs/plugin/duration'
import {Username, generateFakeUsername} from "@/models/username.model.ts"

dayjs.extend(relativeTime)
dayjs.extend(duration)

export type AuctionState = {
    usernames: Username[];
};

const usernamesLocal: Username[] = JSON.parse(localStorage.getItem('users') as string)

export const useAuctionStore = defineStore("auction", {
    state: () => ({
        usernames: usernamesLocal || [],
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

        findById(id: string) {
            return this.usernames.find((item) => item.id === id);
        },

        updateTimeLeft() {
            this.usernames.forEach(username => {
                let endDate = dayjs(username.startDate).add(10, 'days')
                username.leftTime = timeInLockDownHumanize(endDate).timeInLockDown
            })
        },

        updateTimeLeftById(id: string | number) {
            const target = this.usernames.find((item) => item.id === id)
            if (target) {
                let endDate = dayjs(target.startDate).add(10, 'days')
                target.leftTime = timeInLockDownHumanize(endDate).timeInLockDown
            }
        },

        createFakeUsernames() {
            if (localStorage.getItem('users')) return

            for (let i = 0; i < 10; i++) {
                this.createNewUsername(generateFakeUsername())

                if (i === 9) {
                    localStorage.setItem('users', JSON.stringify(this.usernames) as string);
                }
            }
        }
    },

});

function timeInLockDownHumanize(endDate: Dayjs) {
    let diff = dayjs(endDate).diff(dayjs())
    let millisecondsLeft = dayjs(endDate).diff(dayjs(), 'millisecond')

    let diffDuration = dayjs.duration(diff)

    let timeInLockDown = {
        // months: diffDuration.months(),
        days: diffDuration.days(),
        hours: diffDuration.hours(),
        minutes: diffDuration.minutes(),
        seconds: diffDuration.seconds(),
        millisecondsLeft: millisecondsLeft,
        humanize: ''
    }

    let timeInLockDownHumanize = {
        days: timeInLockDown.days > 1 ? timeInLockDown.days + ' days ' : timeInLockDown.days === 1 ? timeInLockDown.days + ' day ' : '',
        hours: timeInLockDown.hours > 1 ? timeInLockDown.hours + ' hours ' : timeInLockDown.hours === 1 ? timeInLockDown.hours + ' hour ' : '',
        minutes: timeInLockDown.minutes > 1 ? timeInLockDown.minutes + ' minutes ' : timeInLockDown.minutes === 1 ? timeInLockDown.minutes + ' minute ' : '',
        seconds: timeInLockDown.seconds > 1 ? timeInLockDown.seconds + ' seconds ' : timeInLockDown.seconds === 1 ? timeInLockDown.seconds + ' second ' : '',
    }

    if (timeInLockDown.days > 0) timeInLockDown.humanize = timeInLockDownHumanize.days + timeInLockDownHumanize.hours + 'left'
    else if (timeInLockDown.hours > 0) timeInLockDown.humanize = timeInLockDownHumanize.hours + timeInLockDownHumanize.minutes + 'left'
    else if (timeInLockDown.minutes > 0) timeInLockDown.humanize = timeInLockDownHumanize.minutes + timeInLockDownHumanize.seconds + 'left'
    else if (timeInLockDown.seconds > 0) timeInLockDown.humanize = timeInLockDownHumanize.seconds + 'left'
    else timeInLockDown.humanize = 'Lot sold'

    return { timeInLockDown }
}
