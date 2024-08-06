<template>
  <div class="flex flex-wrap items-center">
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
        {
          id: 5,
          date: Date.now() - 10800000,
          messageHtml: '<a href="#">Тестовое сообщение</a>',
          type: 'info',
        },
        {
          id: 6,
          date: Date.now() - 14400000,
          messageHtml: '<a href="#">Ошибка подключения</a>',
          type: 'error',
        },
        {
          id: 7,
          date: Date.now() - 18000000,
          messageHtml: '<a href="#">Внимание: низкий баланс</a>',
          type: 'warning',
        },
        {
          id: 8,
          date: Date.now() - 21600000,
          messageHtml: '<a href="#">Операция выполнена успешно</a>',
          type: 'success',
        },
        {
          id: 9,
          date: Date.now() - 25200000,
          messageHtml: '<a href="#">Тестовое сообщение</a>',
          type: 'info',
        },
        {
          id: 10,
          date: Date.now() - 28800000,
          messageHtml: '<a href="#">Ошибка подключения</a>',
          type: 'error',
        },
        {
          id: 11,
          date: Date.now() - 32400000,
          messageHtml: '<a href="#">Внимание: низкий баланс</a>',
          type: 'warning',
        },
        {
          id: 12,
          date: Date.now() - 36000000,
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
