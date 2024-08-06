<template>
    <div class="o-users-grid">
        <div class="heading">
            <h2>
                Users
            </h2>

            <div class="grid-controls">
                <Input
                    class="grid-control app-input"
                    suffix="ios-search"
                    placeholder="User Search"
                    style="width: 200px"
                />
                <Select
                    v-model="role"
                    class="grid-control app-select"
                    placeholder="Choose role"
                    clearable
                    style="width:200px"
                >
                    <Option
                        v-for="item in rolesList"
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
                <a-button
                    class="grid-control"
                    @click.native="$modal.show('add-user')"
                >
                    ADD USER
                </a-button>
            </div>
        </div>
        <a-table-scroll>
            <div slot="header" class="grid-header">
                <div class="image">
                    Image
                </div>
                <div class="name">
                    User name
                </div>
                <div class="role">
                    Role
                </div>
                <div class="phone">
                    Phone number
                </div>
                <div class="telegram">
                    Telegram
                </div>
                <div class="email">
                    E-mail
                </div>
                <div class="status">
                    Status
                </div>
                <div class="actions">
                    Reset/Edit/Delete
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
                        <a-avatar
                            :style-object="{
                                width: '35px',
                                height: '35px',
                            }"
                            :full-name="item.name"
                        />
                    </div>
                    <div class="name">
                        {{ item.name }}
                    </div>
                    <div class="role">
                        <a-button-product
                            v-for="(roleT, index) in item.roles.slice(0, 2)"
                            :key="index"
                            class="button"
                        >
                            <span>{{ roleT.role }}</span>
                        </a-button-product>

                        <v-popover
                            v-if="item.roles.length > 2"
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
                                    v-for="(roleP, index) in item.roles.slice(
                                        2
                                    )"
                                    :key="index"
                                    class="product-line"
                                >
                                    <span>{{ roleP.role }}</span>
                                </p>
                            </template>
                        </v-popover>
                    </div>
                    <div class="phone">
                        {{ item.phone }}
                    </div>
                    <div class="telegram">
                        {{ item.telegram }}
                    </div>
                    <div class="email">{{ item.email }}</div>
                    <div class="status">
                        <a-button-status :type="item.status" />
                    </div>
                    <div class="action">
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

        <o-user-modal />
        <a-modal-confirmation
            name="delete-user-modal"
            @cancel="cancel"
            @confirm="confirm"
        >
            <h2>Do you want to delete the user?</h2>
            <p>
                In case you click “Yes” the user will be deleted with no option
                to restore.
            </p>
        </a-modal-confirmation>
    </div>
</template>

<script>
import { Input, Select, Option } from 'view-design'
import ATableScroll from '@atoms/a-table-scroll'
import AAvatar from '@atoms/a-avatar'
import AButtonStatus from '@atoms/a-button-status'
import AButtonProduct from '@atoms/a-button-product'
import AButtonAction from '@atoms/a-button-action'
import AButton from '@atoms/a-button'
import OUserModal from '@organisms/o-user-modal'
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
            phone: faker.random.number(),
            telegram: faker.random.number(),
            email: faker.internet.email(),
            status: faker.random.arrayElement(['Active', 'Inactive']),
            id: faker.random.uuid(),
        }
    })
}

export default {
    name: 'OUsersGrid',
    components: {
        AModalConfirmation,
        Input,
        Select,
        Option,
        AButton,
        ATableScroll,
        AButtonStatus,
        AButtonProduct,
        AButtonAction,
        AAvatar,
        OUserModal,
    },
    data() {
        return {
            role: '',
            status: '',
            rolesList: [
                {
                    value: 'Root',
                    label: 'Root',
                },
                {
                    value: 'Admin',
                    label: 'Admin',
                },
            ],
            statusList: [
                {
                    value: 'Active',
                    label: 'Active',
                },
                {
                    value: 'Inactive',
                    label: 'Inactive',
                },
            ],
            actionsList: ['reset', 'edit', 'delete'],
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
        onActionClick(action) {
            if (action === 'delete') {
                this.$modal.show('delete-user-modal')
            }
        },
        cancel() {
            this.$modal.hide('delete-user-modal')
        },
        confirm() {
            this.$modal.hide('delete-user-modal')
        },
    },
}
</script>

<style lang="scss" scoped>
@import 'theme';
</style>

<style lang="scss">
.o-users-grid .a-table-scroll .scroll-area {
    height: calc(100vh - 200px) !important;
}
</style>
