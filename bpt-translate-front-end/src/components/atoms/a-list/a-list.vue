<template>
    <Card :bordered="false" class="a-list">
        <div slot="title" class="title">
            <strong>Title:</strong> {{ task.title }}
        </div>

        <div class="description">
            <strong>Description: </strong> {{ task.description }}
        </div>

        <div><strong>Assigned to: </strong> {{ task.assignedTo.login }}</div>

        <div><strong>Status</strong> {{ task.status }}</div>

        <div><strong>Target language</strong> {{ task.targetLanguage }}</div>

        <div>
            <strong>Selection king</strong>
            {{ task.selectionKind }}
        </div>

        <div>
            <strong
                >Resource request keys:
                {{ task.resourceRequest.keys.join(',') }}</strong
            >
        </div>

        <div>
            <strong
                >Resource request tags:
                {{ task.resourceRequest.tags.join(',') }}</strong
            >
        </div>

        <div class="btn-holder">
            <Button class="btn-task" @click="onEditClick">
                Edit task
            </Button>
            <Button
                class="btn-task"
                type="success"
                ghost
                @click="onAcceptClick"
            >
                Accept task
            </Button>
            <Button
                class="btn-task"
                type="warning"
                ghost
                @click="onDeleteClick"
            >
                Delete task
            </Button>
        </div>
    </Card>
</template>

<script>
import { Button, Card } from 'view-design'

export default {
    name: 'AList',
    components: {
        Button,
        Card,
    },
    props: {
        task: {
            type: Object,
            required: true,
        },
    },
    methods: {
        onEditClick() {
            this.$emit('editTask', {
                task: this.task,
            })
        },
        onAcceptClick() {
            this.$emit('acceptTask', {
                task: this.task,
            })
        },
        onDeleteClick() {
            this.$emit('deleteTask', {
                task: this.task,
            })
        },
    },
}
</script>

<style lang="scss" scoped>
@import 'theme';
</style>
