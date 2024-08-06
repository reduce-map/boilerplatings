<template>
    <div>
        <v-select :options="options2">
            <template
                slot="option"
                slot-scope="option">
                <i
                    :class="option.icon"
                    class="fa"/>
                {{ option.label }}
            </template>
        </v-select>
        <multiselect
            v-model="value"
            :options="options"
            :placeholder="'sdff placeholder'"
            track-by="title"
            @select="onSelect">
            <template
                slot="singleLabel"
                slot-scope="{ option }">
                <i
                    :class="option.icon"
                    class="fa"/>
                {{ option.title }} single
            </template>
            <template
                slot="option"
                slot-scope="{ option }">
                <i
                    :class="option.icon"
                    class="fa"/>
                {{ option.title }}
            </template>
        </multiselect>
        <multiselect
            v-model="value2"
            :options="options"
            :placeholder="'sdff placeholder'"
            track-by="title"
            select-label=""
            deselect-label=""
            selected-label=""
            @select="onSelect">
            <template
                slot="singleLabel"
                slot-scope="{ option }">
                <i
                    v-if="option.icon"
                    :class="option.icon"
                    class="fa"/>
                {{ option.title }} single
            </template>
            <template
                slot="option"
                slot-scope="{ option }">
                <i
                    :class="option.icon"
                    class="fa"/>
                {{ option.title }}
            </template>
        </multiselect>

        {{ value }}
    </div>
</template>

<script>
import vSelect from 'vue-select'
import Multiselect from 'vue-multiselect'

export default {
    name: 'Select',
    components: {
        'v-select': vSelect,
        Multiselect
    },
    data: () => ({
        value: {
            title: 'Default',
            icon: 'fa fa-fw fa-refresh'
        },
        value2: {
            title: 'Default'
        },
        options: [
            {
                title: 'Read the Docs',
                icon: 'fa fa-fw fa-refresh'
            },
            {
                title: 'View on GitHub',
                icon: 'fa fa-fw fa-refresh fa-spin'
            },
            {
                title: 'View on NPM',
                icon: 'fa-database'
            },
            {
                title: 'View Codepen Examples',
                icon: 'fa-pencil',
                url: 'https://codeclimate.com/github/sagalbot/vue-select'
            }
        ],
        // http://sagalbot.github.io/vue-select/docs/Api/Props.html
        //vue-select will look for
        // * a `label` key (ex. [{label: 'This is Foo', value: 'foo'}]).
        options2: [
            {
                label: 'Read the Docs',
                icon: 'fa fa-fw fa-refresh'
            },
            {
                label: 'View on GitHub',
                icon: 'fa fa-fw fa-refresh fa-spin'
            },
            {
                label: 'View on NPM',
                icon: 'fa-database'
            },
            {
                label: 'View Codepen Examples',
                icon: 'fa-pencil',
                url: 'https://codeclimate.com/github/sagalbot/vue-select'
            }
        ]
    }),
    methods: {
        onSelect() {
            console.log(' ', arguments)
        }
    }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css">
a {
    color: #000;
}
</style>
