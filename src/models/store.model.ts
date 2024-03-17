import { v4 as uuid } from 'uuid'
import { faker } from '@faker-js/faker'

export interface Shop {
    id: string | number;
    seller: string;
    deals: {
        quantity: number;
        completed: number;
    };
    icon: string;
    name: string;
    description: string;
    products: {
        name: string;
        types: {
            title: string;
            item: {
                name: string;
                price: number;
            }
        };
        shortDescription: string;
        description: string;
        characteristics: {
            key: string;
            value: string | number;
        };
        reviews: {
            fromId: number;
            rating: number;
            message: string;
            moderatorResponse?: {
                fromId: number;
                message: string;
            };
        }
    };
    createdAt: Date;

}

// export function generateFakeShop(): Shop {
//     let randomUserName = faker.lorem.word({ length: { min: 4, max: 7 } })
//     let startBid = Number(faker.finance.amount({ min: 100, max: 30000, dec: 0 }))
//     let randomHistory = []
//
//     let countRandomBids = Math.ceil(Math.random() * 10)
//
//     for (let i = 0; i < countRandomBids; i++) {
//         randomHistory.push({
//             bid: Math.ceil(startBid * (1 + (0.05 * i))),
//             date: dayjs().subtract(countRandomBids - i, 'days'),
//             from: '@' + faker.lorem.word({ length: { min: 4, max: 7 } })
//         })
//     }
//
//     let highestBid = Math.ceil(startBid * (1 + (0.05 * (countRandomBids - 1))))
//
//     return {
//         id: 000,
//         usernameTypes: {
//             default: randomUserName,
//             telegram: '@' + randomUserName,
//             web: 't.me.' + randomUserName,
//             ton: randomUserName + '.t.me'
//         },
//         bids: {
//             start: startBid,
//             highest: highestBid,
//             minimum: Math.ceil(highestBid * 1.05),
//             step: Math.ceil(highestBid * 0.05),
//             history: randomHistory
//         },
//         startDate: faker.date.recent({ days: 15 }),
//         leftTime: {
//             days: 0,
//             hours: 0,
//             minutes: 0,
//             seconds: 0,
//             millisecondsLeft: 0,
//             humanize: '',
//         },
//         createdAt: new Date(),
//     }
// }