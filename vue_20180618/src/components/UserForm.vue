<template>
    <div>
        <h4 class="mb-3">Edit {{ userName }} info</h4>
        <form @submit.prevent="editUser">
            <div class="form-group">
                <label>Name</label>
                <input
                    v-model="localUser.firstName"
                    type="text"
                    class="form-control">
            </div>

            <div class="form-group">
                <label>Surname</label>
                <input
                    v-model="localUser.lastName"
                    type="text"
                    class="form-control">
            </div>

            <div class="form-group">
                <label>Registered</label>
                <input
                    v-model="localUser.registered"
                    type="text"
                    class="form-control">
                <app-date-picker v-model="localUser.registered" />
            </div>

            <div class="form-group">
                <label>URL</label>

                <br>
                <img
                    :src="localUser.picture"
                    class="img-thumbnail" >

                <input
                    v-model="localUser.picture"
                    type="text"
                    class="form-control">

                <!--<app-uploader v-model="localUser.picture" />-->

                <app-drop-uploader @fileUploaded = "fileUploaded" />
            </div>

            <div class="form-group">
                <label>Age</label>
                <input
                    v-model.number="localUser.age"
                    type="number"
                    class="form-control">
            </div>

            <div class="form-group">
                <label>Active</label>

                <input
                    v-model="localUser.isActive"
                    type="checkbox">

                <div class="checkbox-inline">
                    <checkbox
                        id="input-terms"
                        v-model="localUser.isActive">
                        Yes
                    </checkbox>
                </div>
            </div>

            <div class="form-group">
                <label>Balance</label>
                <input
                    v-model="localUser.balance"
                    type="text"
                    class="form-control">
            </div>

            <div class="form-group">
                <label>Phone</label>
                <input
                    v-model="localUser.phone"
                    type="text"
                    class="form-control">
            </div>

            <div class="form-group">
                <label>Address</label>
                <input
                    v-model="localUser.address"
                    type="text"
                    class="form-control">
            </div>

            <div class="form-group">
                <label>About</label>
                <app-text-editor v-model="localUser.about" />
            </div>

            <div class="form-group">
                <label>Company</label>
                <input
                    v-model="localUser.company"
                    type="text"
                    class="form-control">
            </div>

            <button
                class="btn btn-primary"
                type="submit">Save info</button>
        </form>
    </div>
</template>

<script>
import Uploader from '@/components/Uploder.vue'
import DatePicker from '@/components/Datepicker.vue'
import TextEditor from '@/components/TextEditor.vue'
import DropUploader from '@/components/DropUploader.vue'

export default {
    name: 'UserForm',
    components: {
        'app-uploader': Uploader,
        'app-date-picker': DatePicker,
        'app-text-editor': TextEditor,
        'app-drop-uploader': DropUploader
    },
    model: {
        event: 'userInput',
        prop: 'user'
    },
    props: {
        user: {
            type: Object,
            required: true
        }
    },
    data: () => ({
        // Локальный изменяемый объект пользователя
        localUser: null
    }),
    computed: {
        userName() {
            return [this.localUser.firstName, this.localUser.lastName].join(' ')
        }
    },
    watch: {
        // При изменении локального состояния
        // отправляем объект наверх
        localUser: {
            deep: true,
            handler() {
                this.$emit('userInput', this.localUser)
            }
        }
    },
    created() {
        // Копируем пользователя в локальное состояние
        this.localUser = Object.assign({}, this.user)
    },
    methods: {
        editUser() {
            this.$emit('sendForm')
        },
        fileUploaded(imgUrl) {
            this.localUser.picture = imgUrl
        }
    }
}
</script>
