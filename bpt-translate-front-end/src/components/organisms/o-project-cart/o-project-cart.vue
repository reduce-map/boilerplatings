<template>
    <li class="o-project-cart" @click="onProjectCartClick">
        <Card class="project-cart">
            <div slot="title" class="title">
                <p>
                    {{ project.projectName }}
                    (<span
                        v-for="(role, index) in project.roles"
                        :key="index"
                        >{{ role }}</span
                    >)
                </p>

                <i
                    class="uil uil-edit btn-edit-project"
                    @click.stop="onProjectEditClick"
                />

                <i
                    class="uil uil-trash-alt btn-delete-project"
                    @click.stop="onProjectDeleteClick"
                />
            </div>

            <img
                class="img-project-logo"
                src="@assets/img-project-logo.png"
                alt="project logo"
            />

            <div class="statistic">
                <h3>{{ $t('app.Project_statistic') }}</h3>

                <Spin v-if="isLoading">
                    <Icon
                        type="ios-loading"
                        size="18"
                        class="demo-spin-icon-load"
                    ></Icon>
                    <div>{{ $t('app.Loading') }}</div>
                </Spin>

                <div v-if="isLoaded">
                    <p>
                        <a-progress
                            :percent="progress ? progress : 0"
                            :stroke-width="16"
                            status="active"
                            text-inside
                        />
                    </p>
                    <br />

                    <p>
                        {{ $t('app.Languages') }}:
                        <strong>
                            {{ languagesStatisticText }}
                        </strong>
                    </p>
                </div>
            </div>
        </Card>
    </li>
</template>

<script>
import { Card, Spin, Icon } from 'view-design'
import StatService from '@services/stat-service'
import AProgress from '@atoms/a-progress-bar'

export default {
    name: 'OProjectCart',
    components: {
        Card,
        Spin,
        Icon,
        AProgress,
    },
    props: {
        project: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            isLoading: false,
            isLoaded: false,
            progress: null,
            languageStats: [],
        }
    },
    computed: {
        languagesStatisticText() {
            return this.languageStats.map(lang => lang.name).join(',')
        },
    },
    async mounted() {
        await this.getProjectStat()
    },
    methods: {
        async getProjectStat() {
            this.isLoading = true

            try {
                const {
                    progress,
                    languageStats,
                } = await StatService.getProjectStat({
                    params: {
                        projectUuid: this.project.projectUuid,
                    },
                })

                this.progress = progress
                this.languageStats = languageStats
                this.isLoaded = true
            } catch (err) {
                console.log(err)
            }

            this.isLoading = false
        },

        onProjectDeleteClick() {
            this.$emit('onProjectDelete', {
                project: this.project,
            })
        },
        onProjectEditClick() {
            this.$emit('onProjectEdit', {
                project: this.project,
            })
        },
        onProjectCartClick() {
            this.$emit('onProjectClick', {
                project: this.project,
            })
        },
    },
}
</script>

<style lang="scss" scoped>
@import 'theme';
</style>
