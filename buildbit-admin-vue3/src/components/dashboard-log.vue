<template>
  <div class="pb-4 pt-6 sm:pb-6">
    <div class="mx-auto flex max-w-7xl flex-wrap items-center gap-6 px-4 sm:flex-nowrap sm:px-6 lg:px-8">
      <Timeline>
        <TimelineItem v-for="log in logList" :key="log.id" :color="getColor(log.type)">
          <template #dot>
            <component :is="getIconComponent(log.type)" class="h-5 w-5" aria-hidden="true" />
          </template>
          <div>
            <p>{{ formatDate(log.date) }}</p>
            <div v-html="log.messageHtml"></div>
          </div>
        </TimelineItem>
      </Timeline>
    </div>
  </div>
</template>

<script>
import { Timeline, TimelineItem } from 'view-ui-plus';
import { InformationCircleIcon, ExclamationTriangleIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/vue/20/solid';

export default {
  components: {
    Timeline,
    TimelineItem,
    InformationCircleIcon,
    ExclamationTriangleIcon,
    CheckCircleIcon,
    XCircleIcon,
  },
  data() {
    return {
      logList: [
        {
          id: 1,
          date: Date.now(),
          messageHtml: '<a href="#">Тестовое сообщение</a>',
          type: 'info',
        },
        {
          id: 2,
          date: Date.now() - 86400000,
          messageHtml: '<a href="#">Ошибка подключения</a>',
          type: 'error',
        },
        {
          id: 3,
          date: Date.now() - 3600000,
          messageHtml: '<a href="#">Внимание: низкий баланс</a>',
          type: 'warning',
        },
        {
          id: 4,
          date: Date.now() - 7200000,
          messageHtml: '<a href="#">Операция выполнена успешно</a>',
          type: 'success',
        },
      ],
    };
  },
  methods: {
    formatDate(date) {
      const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
      };
      return new Date(date).toLocaleDateString('ru-RU', options);
    },
    getColor(type) {
      switch (type) {
        case 'info':
          return 'blue';
        case 'warning':
          return 'yellow';
        case 'success':
          return 'green';
        case 'error':
          return 'red';
        default:
          return 'gray';
      }
    },
    getIconComponent(type) {
      switch (type) {
        case 'info':
          return InformationCircleIcon;
        case 'warning':
          return ExclamationTriangleIcon;
        case 'success':
          return CheckCircleIcon;
        case 'error':
          return XCircleIcon;
        default:
          return InformationCircleIcon;
      }
    },
  },
};
</script>

<style scoped>
/* Добавьте дополнительные стили по необходимости */
</style>
