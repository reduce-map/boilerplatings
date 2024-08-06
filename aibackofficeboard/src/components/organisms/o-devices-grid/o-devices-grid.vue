<template>
    <div class="o-devices-grid">
        <div class="heading">
            <h2>
                Device Search
            </h2>

            <div class="grid-controls">
                <Input
                    class="grid-control app-input"
                    suffix="ios-search"
                    placeholder="Devices Search"
                    style="width: 200px"
                />
                <a-button
                    class="grid-control"
                    @click.native="$modal.show('add-user')"
                >
                    Add Device
                </a-button>
            </div>
        </div>
        <div class="holder">
            <m-device-sidebar
                :active-device="activeDevice"
                @onClick="onDeviceSelect"
            />

            <a-table-scroll class="grid">
                <div slot="header" class="grid-header">
                    <div class="number">
                        Number
                    </div>
                    <div class="amount">
                        Shelf amount
                    </div>
                    <div class="weight">
                        Weight controllers
                    </div>
                    <div class="camera">
                        Camera controllers
                    </div>
                    <div class="actions">
                        View/Edit/Delete
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
                        <div class="number">
                            {{ item.number }}
                        </div>
                        <div class="amount">
                            {{ item.amount }}
                        </div>
                        <div class="weight">
                            {{ item.weight }}
                        </div>
                        <div class="camera">
                            {{ item.camera }}
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

            <!--            <o-user-modal />-->
            <a-modal-confirmation
                name="delete-device-modal"
                @cancel="cancel"
                @confirm="confirm"
            >
                <h2>Do you want to delete the device?</h2>
                <p>
                    In case you click “Yes” the device will be deleted with no
                    option to restore.
                </p>
            </a-modal-confirmation>
        </div>
    </div>
</template>

<script>
import { Input } from 'view-design'
import AButton from '@atoms/a-button'
import ATableScroll from '@atoms/a-table-scroll'
import MDeviceSidebar from '@molecules/m-device-sidebar'
import AButtonAction from '@atoms/a-button-action'
import AModalConfirmation from '@atoms/a-modal-confirmation'
import faker from 'faker'

const getGridData = () => {
    return [...new Array(faker.random.number({ min: 20, max: 50 }))].map(() => {
        return {
            image: '',
            name: faker.name.findName(),
            roles: [...new Array(faker.random.number({ min: 1, max: 5 }))].map(
                () => {
                    return {
                        role: faker.lorem.word(),
                    }
                }
            ),
            number: faker.random.number(),
            amount: faker.random.number(),
            telegram: faker.random.number(),
            weight: faker.random.number(),
            email: faker.internet.email(),
            status: faker.random.arrayElement(['Active', 'Inactive']),
            id: faker.random.uuid(),
            camera: faker.random.words(),
        }
    })
}

export default {
    name: 'ODevicesGrid',
    components: {
        Input,
        AButton,
        AButtonAction,
        ATableScroll,
        AModalConfirmation,
        MDeviceSidebar,
    },
    data() {
        return {
            activeDevice: '',
            actionsList: ['edit', 'delete'],
            gridData: getGridData(),
            selectedId: null,
        }
    },
    methods: {
        onDeviceSelect(device) {
            this.activeDevice = device
        },
        onRowClick(id) {
            if (this.selectedId === id) {
                this.selectedId = null
            } else {
                this.selectedId = id
            }
        },
        onActionClick(action) {
            if (action === 'delete') {
                this.$modal.show('delete-device-modal')
            }
        },
        cancel() {
            this.$modal.hide('delete-device-modal')
        },
        confirm() {
            this.$modal.hide('delete-device-modal')
        },
    },
}
</script>

<style lang="scss" scoped>
@import 'theme';
</style>

<style lang="scss">
.o-devices-grid .a-table-scroll .scroll-area {
    height: calc(100vh - 200px) !important;
}
</style>
