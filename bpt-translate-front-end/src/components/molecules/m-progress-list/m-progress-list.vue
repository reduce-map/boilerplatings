<template>
    <div>
        <ul
            v-for="languageStat in languageStats"
            :key="languageStat.keyVue"
            class="m-progress-list"
        >
            <li>
                <div class="list">
                    <span
                        >{{ languageStat.name }} ({{ languageStat.code }})</span
                    >
                    <a-progress
                        :percent="
                            languageStat.progress ? languageStat.progress : 0
                        "
                        :stroke-width="20"
                        status="active"
                        text-inside
                    />
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import AProgress from '@atoms/a-progress-bar'

export default {
    name: 'MProgressList',
    components: {
        AProgress,
    },
    props: {
        languageStats: {
            type: Array,
            required: true,
        },
    },
}
</script>

<style lang="scss" scoped>
@import 'theme';
</style>
