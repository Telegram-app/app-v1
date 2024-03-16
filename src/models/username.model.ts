import { v4 as uuid } from 'uuid'
import { faker } from '@faker-js/faker'
import dayjs, {Dayjs} from "dayjs";

export interface Username {
    id: string | number;
    usernameTypes: {
        default: string,
        telegram: string,
        web: string,
        ton: string
    };
    bids: {
        start: number;
        highest: number;
        minimum: number;
        step: number;
        history: {
            bid: number,
            date: Date | Dayjs,
            from: string
        }[] | []
    }
    startDate: Date;
    leftTime: {
        days: number;
        hours: number;
        minutes: number;
        seconds: number;
        millisecondsLeft: number;
        humanize: string;
    };
    createdAt: Date;
    deletedAt?: Date;
}

export function generateFakeUsername(): Username {
    let randomUserName = faker.lorem.word({ length: { min: 4, max: 7 } })
    let startBid = Number(faker.finance.amount({ min: 100, max: 30000, dec: 0 }))
    let randomHistory = []

    let countRandomBids = Math.ceil(Math.random() * 10)

    for (let i = 0; i < countRandomBids; i++) {
        randomHistory.push({
            bid: Math.ceil(startBid * (1 + (0.05 * i))),
            date: dayjs().subtract(countRandomBids - i, 'days'),
            from: '@' + faker.lorem.word({ length: { min: 4, max: 7 } })
        })
    }

    let highestBid = Math.ceil(startBid * (1 + (0.05 * (countRandomBids - 1))))

    return {
        id: uuid(),
        usernameTypes: {
            default: randomUserName,
            telegram: '@' + randomUserName,
            web: 't.me.' + randomUserName,
            ton: randomUserName + '.t.me'
        },
        bids: {
            start: startBid,
            highest: highestBid,
            minimum: Math.ceil(highestBid * 1.05),
            step: Math.ceil(highestBid * 0.05),
            history: randomHistory
        },
        startDate: faker.date.recent({ days: 15 }),
        leftTime: {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
            millisecondsLeft: 0,
            humanize: '',
        },
        createdAt: new Date(),
    }
}