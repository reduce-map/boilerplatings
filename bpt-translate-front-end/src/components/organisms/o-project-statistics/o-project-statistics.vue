<template>
    <div class="o-project-statistics">
        <h2>Project Statistic</h2>

        <ul class="task-statistic-list">
            <li v-for="(task, index) in tasksList" :key="index">
                <o-project-statistic-task :task="task" />
            </li>
        </ul>
    </div>
</template>

<script>
import OProjectStatisticTask from '@organisms/o-project-statistic-task'
import TaskService from '@services/task-service'

export default {
    name: 'OProjectStatistics',
    components: {
        OProjectStatisticTask,
    },

    data: () => ({
        isLoading: false,

        languageStats: [],
        tasksList: [],

        progress: null,
    }),
    computed: {
        projectUuid() {
            return this.$route.params.projectUuid
        },

        progressText() {
            const progress = this.progress
            return progress ? progress : 'No data'
        },
    },

    async mounted() {
        await this.getTasks()
    },
    methods: {
        async getTasks() {
            this.isLoading = true

            try {
                let { items } = await TaskService.getProjectTasks({
                    projectUuid: this.projectUuid,
                    params: {
                        pageSize: 1000,
                    },
                })

                this.tasksList = items
            } catch (err) {
                console.log(err)
            }
        },
    },
}
</script>

<style lang="scss" scoped>
@import 'theme';
</style>
