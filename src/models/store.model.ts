import { faker } from '@faker-js/faker'

export interface Store {
    id: string | number;
    seller: string;
    deals: {
        quantity: number;
        completed: number;
    };
    icon: string;
    name: string;
    image: string;
    description: string;
    products: Product[];
}

export interface Product {
    id: string | number;
    name: string;
    image: string;
    shortDescription: string;
    types: ProductType[];
    description: string;
    characteristics: ProductChar[];
    reviews?: ProductReview[];
    createdAt: Date;
}

export interface ProductType {
    type: 1 | 2;
    title: string;
    items: ProductTypeItem[];
}

export interface ProductTypeItem {
    name: string;
    price: number;
}

export interface ProductChar {
    key: string;
    value: string | number;
}

export interface ProductReview {
    from: {
        id: string | number;
        name: string;
        image: string;
        deals: {
            quantity: number;
            completed: number;
        }
    };
    rating: number;
    message: string;
    response?: ProductReviewResponse;
}

export interface ProductReviewResponse {
    from: {
        name: string;
        role: string,
        image: string;
    };
    message: string;
}

export function generateFakeStore(): Store {
    let randomUserName = faker.lorem.word({ length: { min: 4, max: 7 } })
    let dealsQuantity = faker.number.int({ min: 0, max: 100 })
    let iconArr = ['store-icon-1.svg', 'store-icon-2.svg', 'store-icon-3.svg', 'store-icon-4.svg']
    let storeNamesArr = ["McDonald's", 'KFC', 'Starbucks', 'Burger King']
    let randomIconAndStoreNameIndex = faker.number.int({ min: 0, max: iconArr.length - 1 })

    let products = []

    for (let i = 1; i <= faker.number.int({ min: 1, max: 10 }); i++) {
        products.push(generateFakeProduct())
    }

    return {
        id: faker.number.int({ min: 1, max: 999999 }),
        seller: '@' + randomUserName,
        deals: {
            quantity: dealsQuantity,
            completed: faker.number.int({ min: 0, max: dealsQuantity }),
        },
        icon: iconArr[randomIconAndStoreNameIndex],
        name: storeNamesArr[randomIconAndStoreNameIndex],
        image: 'store-image.jpg',
        description: faker.lorem.words({ min: 30, max: 50 }),
        products: products
    }
}

export function generateFakeProduct(): Product {
    let types = []
    let chars = []
    let reviews = []

    for (let i = 1; i <= faker.number.int({ min: 1, max: 2 }); i++) {
        types.push(generateFakeProductType(i === 1 ? 1 : 2))
    }

    for (let i = 1; i <= faker.number.int({ min: 1, max: 10 }); i++) {
        chars.push(generateFakeProductChar())
    }

    for (let i = 1; i <= faker.number.int({ min: 1, max: 10 }); i++) {
        reviews.push(generateFakeProductReview())
    }

    return {
        id: faker.number.int({ min: 100000, max: 999999 }),
        name: faker.commerce.productName(),
        image: 'product-image.jpg',
        shortDescription: faker.lorem.words({ min: 14, max: 16 }),
        types: types,
        description: faker.lorem.words({ min: 30, max: 100 }),
        characteristics: chars,
        reviews: reviews,
        createdAt: faker.date.recent({ days: 15 })
    }
}

export function generateFakeProductType(type: 1 | 2): ProductType {
    let items = []

    for (let i = 1; i <= faker.number.int({ min: 1, max: 10 }); i++) {
        items.push(generateFakeProductTypeItem())
    }

    return {
        type,
        title: faker.lorem.word({ length: { min: 4, max: 7 } }),
        items: items
    }
}

export function generateFakeProductTypeItem(): ProductTypeItem {
    return {
        name: faker.lorem.word({ length: { min: 4, max: 7 } }),
        price: Number(faker.finance.amount({ min: 1, max: 999, dec: 0 }))
    }
}

export function generateFakeProductChar(): ProductChar {
    return {
        key: faker.lorem.word({ length: { min: 4, max: 7 } }),
        value: faker.lorem.words({ min: 1, max: 2 })
    }
}

export function generateFakeProductReview(): ProductReview {
    let response

    let random = faker.number.int({ min: 0, max: 100 })

    if (random >= 50) {
        response = generateFakeProductReviewResponse()
    }

    let dealsQuantity = faker.number.int({ min: 0, max: 100 })

    return {
        from: {
            id: 'OS-' + faker.number.int({ min: 100000, max: 999999 }),
            name: faker.lorem.word({ length: { min: 4, max: 7 } }),
            image: 'review-avatar.svg',
            deals: {
                quantity: dealsQuantity,
                completed: faker.number.int({ min: 0, max: dealsQuantity }),
            }
        },
        rating: faker.number.int({ min: 1, max: 100 }),
        message: faker.lorem.words({ min: 15, max: 100 }),
        response: response
    }
}

export function generateFakeProductReviewResponse(): ProductReviewResponse {
    return {
        from: {
            name: faker.lorem.word({ length: { min: 4, max: 7 } }),
            role: 'Moderator',
            image: 'review-avatar.svg'
        },
        message: faker.lorem.words({ min: 7, max: 70 })
    }
}

