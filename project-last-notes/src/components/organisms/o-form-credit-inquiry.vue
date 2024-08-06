<template>
    <div>
        <FormCreditInquiry
            v-bind="{
                data: formData,
                stateOption,
                stateOption2,
            }"
            class="o-form-credit-inquiry"
            @search="onSearch"
        />

        {{ apifake }}

        <template v-if="isMatchesExist">
            <h3>No matches</h3>
            <p>
                No hits have been found using your search criteria. Please try
                the search again using different search criteria.
            </p>
        </template>
    </div>
</template>

<script>
import FormCreditInquiry from '@molecules/m-form-credit-inquiry.vue'
import axios from 'axios'

export default {
    name: 'OFormCreditInquiry',
    components: {
        FormCreditInquiry,
    },
    data: () => ({
        stateOption: [
            {
                id: 1,
                value: 123,
            },
            {
                id: 2,
                value: 321,
            },
        ],
        stateOption2: [
            {
                id: 1,
                value: 'Unated Stated',
            },
            {
                id: 2,
                value: 'Unated Stated 2',
            },
        ],
        formData: {
            companyName: 'companyName',
            address: 'address',
            city: '',
            phoneNumber: '',
            taxID: '',
            companyStatus: {
                id: 1,
                value: 'Any',
            },
            country: {
                id: 1,
                value: 'Unated Stated',
            },
            state: '',
            zipCode: '',
            website: '',
        },
        apifake: null,
    }),
    computed: {
        isMatchesExist() {
            return false
        },
    },
    mounted() {
        this.loadData()
    },
    methods: {
        onSearch(data) {
            console.log('onSearch', data)
        },
        loadData() {
            axios.get('/api/fake').then(data => {
                console.log(data)
                this.apifake = data
            })
        },
    },
}
</script>

<style lang="scss" scoped>
.o-form-credit-inquiry {
    width: 887px;
    padding: 25px;
    margin: 0 auto;
    border: 1px solid #e9e9e7;
    border-radius: 10px;
}
</style>
