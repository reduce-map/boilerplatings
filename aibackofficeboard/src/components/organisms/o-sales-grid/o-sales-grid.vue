<template>
    <div class="o-sales-grid">
        <div class="heading">
            <h2>
                Sales
            </h2>

            <div class="grid-controls">
                <Input
                    class="grid-control app-input"
                    suffix="ios-search"
                    placeholder="Sales Search"
                    style="width: 200px"
                />
                <DatePicker
                    class="grid-control app-date-picker"
                    clearable
                    format="dd.MM.yyyy"
                    type="daterange"
                    placement="bottom-end"
                    placeholder="Choose date"
                    style="width: 200px"
                />
                <Select
                    v-model="paymentMethod"
                    class="grid-control app-select"
                    placeholder="Payment method"
                    clearable
                    style="width:200px"
                >
                    <Option
                        v-for="item in paymentList"
                        :key="item.value"
                        :value="item.value"
                    >
                        {{ item.label }}
                    </Option>
                </Select>
                <Select
                    v-model="status"
                    class="grid-control app-select"
                    placeholder="Choose status"
                    clearable
                    style="width:200px"
                >
                    <Option
                        v-for="item in statusList"
                        :key="item.value"
                        :value="item.value"
                    >
                        {{ item.label }}
                    </Option>
                </Select>
            </div>
        </div>
        <a-table-scroll>
            <div slot="header" class="grid-header">
                <div class="customer-id">
                    Customer ID
                </div>
                <div class="products">
                    Products
                </div>
                <div class="date">
                    Date/Time
                </div>
                <div class="payment">
                    Payment
                </div>
                <div class="amount">
                    Amount
                </div>
                <div class="status">
                    Status
                </div>
            </div>
            <div slot="content" class="grid-content">
                <div
                    v-for="item in gridData"
                    :key="item.id"
                    class="grid-row"
                    :class="{
                        selected: selectedId === item.id,
                    }"
                    @click="onRowClick(item.id)"
                >
                    <div class="customer-id">
                        {{ item.id }}
                    </div>
                    <div class="products">
                        <a-button-product
                            v-for="(product, index) in item.products.slice(
                                0,
                                2
                            )"
                            :key="index"
                            class="button-product"
                        >
                            <span>{{ product.productName }}</span>
                            <span slot="amount">{{ product.amount }}</span>
                        </a-button-product>

                        <v-popover
                            v-if="item.products.length > 2"
                            trigger="hover"
                            offset="6"
                            placement="bottom-start"
                        >
                            <!--                            :open=true-->
                            <!--                            :autoHide=false-->
                            <!-- This will be the popover target (for the events and position) -->
                            <span class="popup-text">
                                <span class="dots">
                                    ...
                                </span>
                            </span>

                            <!-- This will be the content of the popover -->
                            <template slot="popover">
                                <p
                                    v-for="(product,
                                    index) in item.products.slice(2)"
                                    :key="index"
                                    class="product-line"
                                >
                                    <span>{{ product.productName }}</span>
                                    <span class="amount">
                                        x{{ product.amount }}
                                    </span>
                                </p>
                            </template>
                        </v-popover>
                    </div>
                    <div class="date">
                        <span class="date-wrapper">
                            {{ item.date | dayFullNumbers2 }}
                        </span>
                        <span class="at">
                            at
                        </span>
                        <span class="time-wrapper">
                            {{ item.date | timeFull }}
                        </span>
                    </div>
                    <div class="payment">
                        {{ item.payment }}
                    </div>
                    <div class="amount">{{ item.amount }}{{ amountType }}</div>
                    <div class="status">
                        <a-button-status :type="item.status" />
                    </div>
                </div>
            </div>
        </a-table-scroll>
    </div>
</template>

<script>
import { Input, Select, Option, DatePicker } from 'view-design'
import ATableScroll from '@atoms/a-table-scroll'
import AButtonStatus from '@atoms/a-button-status'
import AButtonProduct from '@atoms/a-button-product'
import faker from 'faker'

const getGridData = () => {
    return [...new Array(faker.random.number({ min: 10, max: 15 }))].map(() => {
        return {
            name: faker.name.findName(),
            id: faker.random.number(),
            products: [
                ...new Array(faker.random.number({ min: 1, max: 5 })),
            ].map(() => {
                return {
                    productName: faker.lorem.word(),
                    amount: faker.random.arrayElement(['12', '21']),
                }
            }),
            date: faker.date.past(),
            payment: faker.random.arrayElement(['APP', 'POS']),
            amount: faker.random.number(),
            status: faker.random.arrayElement([
                'Accepted',
                'Refunded',
                'Declined',
            ]),
        }
    })
}

export default {
    name: 'OSalesGrid',
    components: {
        Input,
        Select,
        Option,
        DatePicker,
        ATableScroll,
        AButtonStatus,
        AButtonProduct,
    },
    data() {
        return {
            paymentMethod: '',
            status: '',
            paymentList: [
                {
                    value: 'Cash',
                    label: 'Cash',
                },
                {
                    value: 'Not Cash',
                    label: 'Not Cash',
                },
            ],
            statusList: [
                {
                    value: 'Accepted',
                    label: 'Accepted',
                },
                {
                    value: 'Refunded',
                    label: 'Refunded',
                },
                {
                    value: 'Declined',
                    label: 'Declined',
                },
            ],
            gridData: getGridData(),
            amountType: '€',
            selectedId: null,
        }
    },
    methods: {
        onRowClick(id) {
            if (this.selectedId === id) {
                this.selectedId = null
            } else {
                this.selectedId = id
            }
        },
    },
}
</script>

<style lang="scss" scoped>
@import 'theme';
</style>
