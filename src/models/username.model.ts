import { v4 as uuid } from 'uuid'
import { faker } from '@faker-js/faker'

export interface Username {
    id: string;
    name: string;
    link: string;
    currentBid: number;
    startDate: Date;
    leftTime: LeftTime;
    leftTimeHumanize: string | null;
    createdAt: Date;
    deletedAt?: Date;
}

export interface LeftTime {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    millisecondsLeft: number;
}

export function generateFakeUsername(): Username {
    let randomUserName = faker.lorem.word({ length: { min: 4, max: 7 } })

    return {
        id: uuid(),
        name: '@' + randomUserName,
        link: randomUserName + '.t.me',
        currentBid: Number(faker.finance.amount({ min: 10000, max: 99999, dec: 0 })),
        startDate: faker.date.recent({ days: 15 }),
        leftTime: {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
            millisecondsLeft: 0
        },
        leftTimeHumanize: null,
        createdAt: new Date(),
    }
}