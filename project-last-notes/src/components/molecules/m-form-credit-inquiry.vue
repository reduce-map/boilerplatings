<template>
    <div v-if="localData" class="m-form-credit-inquiry">
        <h2>Company Search</h2>

        <form class="row" @submit.prevent="onSubmit">
            <div class="column">
                <FormRow
                    v-model="localData.companyName"
                    required
                    label-for="companyName"
                    label-text="Company name"
                />

                <FormRow
                    v-model="localData.address"
                    label-for="address"
                    label-text="Address"
                />

                <FormRow
                    v-model="localData.city"
                    label-for="city"
                    label-text="City"
                />

                <FormRow
                    v-model="localData.city"
                    label-for="phone-number"
                    label-text="Phone number"
                    :max-length="20"
                />
            </div>
            <div class="column">
                <div class="row">
                    <div class="column">
                        <FormRow
                            v-model="localData.taxID"
                            label-for="TaxID"
                            label-text="Tax ID"
                            :max-length="30"
                        />
                    </div>
                    <div class="column">
                        <FormRow
                            v-model="localData.taxID"
                            label-for="CompanyStatus"
                            label-text="Company status"
                            label="text"
                        >
                            <ASelect
                                id="TaxID"
                                v-model="localData.companyStatus"
                                :options="stateOption"
                                :allow-empty="false"
                                :show-labels="false"
                                track-by="id"
                                label="value"
                            />
                        </FormRow>
                    </div>
                </div>
                <FormRow
                    v-model="localData.taxID"
                    label-for="CompanyStatus"
                    label-text="Company status"
                    label="text"
                >
                    <ASelect
                        id="TaxID"
                        v-model="localData.companyStatus"
                        :options="stateOption2"
                        :allow-empty="false"
                        :show-labels="false"
                        track-by="id"
                        label="value"
                    />
                </FormRow>
                <div class="row">
                    <div class="column">
                        <FormRow
                            v-model="localData.taxID"
                            label-for="CountryState"
                            label-text="State"
                            label="text"
                        >
                            <ASelect
                                id="TaxID"
                                v-model="localData.companyStatus"
                                :options="stateOption"
                                :allow-empty="false"
                                :show-labels="false"
                                track-by="id"
                                label="value"
                            />
                        </FormRow>
                    </div>
                    <div class="column">
                        <FormRow
                            v-model="localData.taxID"
                            label-for="ZIPcode"
                            label-text="ZIP code"
                            :max-length="10"
                        />
                    </div>
                </div>
                <FormRow
                    v-model="localData.taxID"
                    label-for="Website"
                    label-text="Website"
                    :max-length="100"
                />
            </div>
        </form>
    </div>
</template>

<script>
// import _ from 'lodash'
import FormRow from '@molecules/m-form-row.vue'
import ASelect from '@atoms/a-multiselect.vue'

export default {
    name: 'MFormCreditInquiry',
    components: {
        FormRow,
        ASelect,
    },
    props: {
        data: {
            type: Object,
            required: true,
        },
        stateOption: {
            type: Array,
            required: true,
        },
        stateOption2: {
            type: Array,
            required: true,
        },
    },
    data: () => ({
        localData: null,
    }),
    mounted() {
        this.localData = { ...this.data }
    },
}
</script>

<style lang="scss" scoped>
h2 {
    margin: 0 0 23px;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    font-stretch: normal;
    line-height: 1.5;
    color: #000;
    letter-spacing: -0.2px;
}

.row {
    display: flex;
}

.form-row {
    margin: 0 0 15px;
}

.column {
    flex: 50%;
    padding: 0 0 0 30px;
    &:first-child {
        padding: 0;
    }
}
</style>

<docs>
    This row is amazing, use it responsibly.

    ## Examples

    m-form-credit-inquiry:

    ```js
    new Vue({
    data(){
    return {
        stateOption: [
            {
                id: 1,
                value: 123
            },
            {
                id: 2,
                value: 321
            }
        ],
        stateOption2: [
            {
                id: 1,
                value: 'Unated Stated'
            },
            {
                id: 2,
                value: 'Unated Stated 2'
            }
        ],
        formData: {
            companyName: 'companyName',
            address: 'address',
            city: '',
            phoneNumber: '',
            taxID: '',
            companyStatus: {
                id: 1,
                value: 'Any'
            },
            country: {
                id: 1,
                value: 'Unated Stated'
            },
            state: '',
            zipCode: '',
            website: ''
        }
        }
    },
    template:
    `
    <div>
        <m-form-credit-inquiry
            v-bind="{
                data: formData,
                stateOption,
                stateOption2
            }"

            class="o-form-credit-inquiry"
        />
    </div>
    `
    })
    ```
</docs>
