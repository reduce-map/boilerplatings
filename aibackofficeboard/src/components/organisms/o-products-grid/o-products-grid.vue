<template>
    <div class="o-products-grid">
        <div class="heading">
            <h2>
                Products
            </h2>

            <div class="grid-controls">
                <Input
                    class="grid-control app-input"
                    suffix="ios-search"
                    placeholder="Sales Search"
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
                        v-for="item in categoryList"
                        :key="item.value"
                        :value="item.value"
                    >
                        {{ item.label }}
                    </Option>
                </Select>
                <a-button class="grid-control">
                    ADD PRODUCT
                </a-button>
            </div>
        </div>

        <a-table-scroll>
            <div slot="header" class="grid-header">
                <div class="image">
                    Image
                </div>
                <div class="product">
                    Product name
                </div>
                <div class="weight">
                    Weight
                </div>
                <div class="allergens">
                    Allergens
                </div>
                <div class="stock">
                    Stock
                </div>
                <div class="category">
                    Category
                </div>
                <div class="purchase">
                    Purchase price
                </div>
                <div class="sale">
                    Sale price
                </div>
                <div class="actions">
                    Edit/Delete
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
                    <div class="image">
                        <a-product-image />
                    </div>
                    <div class="product">
                        {{ item.productName }}
                    </div>
                    <div class="weight">{{ item.weight }}g</div>
                    <div class="allergens">
                        {{ item.allergens }}
                        <span class="allergens-type">
                            ({{ item.allergensType }})
                        </span>
                    </div>
                    <div class="stock">
                        {{ item.stock }}
                    </div>
                    <div class="category">
                        {{ item.category }}
                    </div>
                    <div class="purchase">
                        {{ item.purchase }}
                    </div>
                    <div class="sale">
                        {{ item.sale }}
                    </div>
                    <div class="actions">
                        <a-button-action
                            v-for="(action, index) in actionsList"
                            :key="index"
                            :type="action"
                            class="btn-action"
                            @click.native.stop="onActionClick(action)"
                        />
                    </div>
                </div>
            </div>
        </a-table-scroll>

        <a-modal-confirmation
            name="delete-product-modal"
            @cancel="cancel"
            @confirm="confirm"
        >
            <h2>Do you want to delete the product?</h2>
            <p>
                In case you click “Yes” the product will be deleted with no
                option to restore.
            </p>
        </a-modal-confirmation>
    </div>
</template>

<script>
import { Input, Select, Option } from 'view-design'
import ATableScroll from '@atoms/a-table-scroll'
import AButton from '@atoms/a-button'
import AProductImage from '@atoms/a-product-image'
import AButtonAction from '@atoms/a-button-action'
import AModalConfirmation from '@atoms/a-modal-confirmation'
import faker from 'faker'

const getGridData = () => {
    return [...new Array(faker.random.number({ min: 10, max: 15 }))].map(() => {
        return {
            productName: faker.name.findName(),
            id: faker.random.number(),
            weight: faker.random.number(),
            allergens: faker.random.word(),
            allergensType: faker.random.arrayElement(['F', 'O', 'G']),
            stock: faker.random.arrayElement([1, 3, 5]),
            category: faker.random.arrayElement([
                'Snecks',
                'Drinks',
                'Cosmetics',
            ]),
            purchase: faker.random.arrayElement([3, 5, 9]),
            sale: faker.random.arrayElement([13, 15, 19]),
        }
    })
}

export default {
    name: 'OProductsGrid',
    components: {
        Input,
        Select,
        Option,
        ATableScroll,
        AButton,
        AButtonAction,
        AProductImage,
        AModalConfirmation,
    },
    data() {
        return {
            paymentMethod: '',
            status: '',
            categoryList: [
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
            actionsList: ['edit', 'delete'],
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
        onActionClick(action) {
            if (action === 'delete') {
                this.$modal.show('delete-product-modal')
            }
        },
        cancel() {
            this.$modal.hide('delete-product-modal')
        },
        confirm() {
            this.$modal.hide('delete-product-modal')
        },
    },
}
</script>

<style lang="scss" scoped>
@import 'theme';
</style>

<style lang="scss">
.o-products-grid .scroll-area {
    height: calc(100vh - 200px) !important;
}
</style>
