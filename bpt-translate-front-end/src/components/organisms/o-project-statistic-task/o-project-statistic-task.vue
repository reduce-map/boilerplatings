<template>
    <Card class="o-project-statistic-task">
        <strong slot="title"> Task: {{ task.title }} </strong>

        <div class="app-row">Status: {{ task.status }}</div>
        <div class="app-row">
            Progress:

            <template v-if="isLoaded">
                {{ progress }}
            </template>
            <Spin v-else class="spin" />
        </div>
    </Card>
</template>

<script>
import { Spin, Card } from 'view-design'
import StatService from '@services/stat-service'

export default {
    name: 'OProjectStatisticTask',
    components: {
        Spin,
        Card,
    },
    props: {
        task: {
            type: Object,
            required: true,
        },
    },

    data() {
        return {
            isLoading: false,
            isLoaded: false,

            progress: null,
        }
    },

    computed: {
        projectUuid() {
            return this.$route.params.projectUuid
        },
    },

    async mounted() {
        this.isLoading = true

        try {
            let { progress } = await StatService.getTaskStat({
                params: {
                    projectUuid: this.projectUuid,
                    taskUuid: this.task.uuid,
                },
            })

            this.progress = progress
            this.isLoaded = true
        } catch (err) {
            console.log(err)
        }

        this.isLoading = false
    },
}
</script>

<style lang="scss" scoped>
@import 'theme';
</style>
