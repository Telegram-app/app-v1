import {defineStore} from "pinia"
import {fa} from '@faker-js/faker';

export type FilterState = {
    market: {
        selects: {
            category: {
                open: boolean;
                active: string;
                label: string;
                options: string[];
            };
            type: {
                open: boolean;
                active: string;
                label: string;
                options: string[];
            };
            city: {
                open: boolean;
                active: string;
                label: string;
                options: string[];
            };
            district: {
                open: boolean;
                active: string;
                label: string;
                options: string[];
            };
        };
        inputs: {
            quantity: {
                value: undefined | number;
                label: string;
                placeholder: string;
            };
            priceFrom: {
                value: undefined | number;
                label: string;
                placeholder: string;
            };
            priceUpTo: {
                value: undefined | number;
                label: string;
                placeholder: string;
            };
        }
    };
    selfStore: {
        clients: {
            selects: {
                city: {
                    open: boolean;
                    active: string;
                    label: string;
                    options: string[];
                };
                product: {
                    open: boolean;
                    active: string;
                    label: string;
                    options: string[];
                }
            };
            inputs: {
                search: {
                    value: undefined | string;
                    placeholder: string;
                },
            }
        };
        employers: {
            selects: {
                city: {
                    open: boolean;
                    active: string;
                    label: string;
                    options: string[];
                };
                product: {
                    open: boolean;
                    active: string;
                    label: string;
                    options: string[];
                }
            };
            inputs: {
                search: {
                    value: undefined | string;
                    placeholder: string;
                },
            }
        }
    }
};

export const useFilter = defineStore("filter", {
    state: () => ({
        market: {
            selects: {
                category: {
                    open: false,
                    active: 'All',
                    label: 'Category',
                    options: ['All', 'Category 1', 'Category 2', 'Category 3'],
                },
                type: {
                    open: false,
                    active: 'All',
                    label: 'Type',
                    options: ['All', 'Type 1', 'Type 2', 'Type 3'],
                },
                city: {
                    open: false,
                    active: 'All',
                    label: 'City',
                    options: ['All', 'Austin', 'Newark', 'Ontario'],
                },
                district: {
                    open: false,
                    active: 'All',
                    label: 'District',
                    options: ['All', 'District 1', 'District 2', 'District 3'],
                },
            },
            inputs: {
                quantity: {
                    value: undefined,
                    label: 'Quantity from',
                    placeholder: '10',
                },
                priceFrom: {
                    value: undefined,
                    label: 'Price from',
                    placeholder: '10 TON',
                },
                priceUpTo: {
                    value: undefined,
                    label: 'Price up to',
                    placeholder: '100 TON',
                },
            }
        },
        selfStore: {
            clients: {
                selects: {
                    city: {
                        open: false,
                        active: 'All',
                        label: 'City',
                        options: ['All', 'Austin', 'Newark', 'Ontario']
                    },
                    product: {
                        open: false,
                        active: 'All',
                        label: 'Product',
                        options: ['All', 'Product 1', 'Product 2', 'Product 3']
                    }
                },
                inputs: {
                    search: {
                        value: undefined,
                        placeholder: 'Search'
                    },
                }
            },
            employers: {
                selects: {
                    city: {
                        open: false,
                        active: 'All',
                        label: 'City',
                        options: ['All', 'Austin', 'Newark', 'Ontario']
                    },
                    product: {
                        open: false,
                        active: 'All',
                        label: 'Product',
                        options: ['All', 'Product 1', 'Product 2', 'Product 3']
                    }
                },
                inputs: {
                    search: {
                        value: undefined,
                        placeholder: 'Search'
                    },
                }
            }
        }
    } as FilterState),

    getters: {
        
    },

    actions: {
        openMarketSelect(index: number) {
            this.market.selects.type.open = index === 0 ? !this.market.selects.type.open : false
            this.market.selects.city.open = index === 1 ? !this.market.selects.city.open : false
            this.market.selects.district.open = index === 2 ? !this.market.selects.district.open : false
        },
        openSelfStoreClientsSelect(index: number) {
            this.selfStore.clients.selects.city.open = index === 0 ? !this.selfStore.clients.selects.city.open : false
            this.selfStore.clients.selects.product.open = index === 1 ? !this.selfStore.clients.selects.product.open : false
        },
        openSelfStoreEmployersSelect(index: number) {
            this.selfStore.employers.selects.city.open = index === 0 ? !this.selfStore.employers.selects.city.open : false
            this.selfStore.employers.selects.product.open = index === 1 ? !this.selfStore.employers.selects.product.open : false
        },
    }

})
