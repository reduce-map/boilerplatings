<template>
  <!-- Recent activity table -->
  <div>
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <h2 class="mx-auto max-w-2xl text-base font-semibold leading-6 text-gray-900 lg:mx-0 lg:max-w-none">
        Recent activity
      </h2>
    </div>
    <div class="mt-6 overflow-hidden border-t border-gray-100">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
          <table class="w-full text-left">
            <thead class="sr-only">
              <tr>
                <th>Amount</th>
                <th class="hidden sm:table-cell">Client</th>
                <th>More details</th>
              </tr>
            </thead>
            <tbody>
              <template v-for="day in days" :key="day.dateTime">
                <tr class="text-sm leading-6 text-gray-900">
                  <!--                <th scope="colgroup" colspan="3" class="relative isolate py-2 font-semibold">-->
                  <th scope="colgroup" colspan="3" class="relative isolate font-semibold">
                    <time :datetime="day.dateTime">{{ day.date }}</time>
                    <div class="absolute inset-y-0 right-full -z-10 w-screen border-b border-gray-200 bg-gray-50" />
                    <div class="absolute inset-y-0 left-0 -z-10 w-screen border-b border-gray-200 bg-gray-50" />
                  </th>
                </tr>
                <tr v-for="log in day.eventLogs" :key="log.id">
                  <td class="hidden pr-6 sm:table-cell">
                    <div class="text-sm leading-6 text-gray-900">{{ log.itemName }}</div>
                    <div class="mt-1 text-xs leading-5 text-gray-500">{{ log.additionalInfo }}</div>
                  </td>
                  <td class="relative pr-6">
                    <div class="flex gap-x-6 py-0.5 items-center">
                      <component
                        v-if="logEventStylesAndIcons[log.eventType]"
                        :is="logEventStylesAndIcons[log.eventType].icon"
                        class="hidden h-6 w-5 flex-none text-gray-400 sm:block"
                        aria-hidden="true"
                      />
                      <div class="flex-auto">
                        <div class="flex items-start gap-x-6">
                          <div class="text-sm font-medium leading-6 text-gray-900">{{ log.amount }}</div>
                          <div
                            v-if="logEventStylesAndIcons[log.eventType]"
                            :class="[
                              logEventStylesAndIcons[log.eventType].style,
                              'rounded-md py-1 px-2 text-xs font-medium ring-1 ring-inset',
                            ]"
                          >
                            {{ LogEvents[log.eventType] }}
                          </div>
                        </div>
                        <div v-if="log.details" class="mt-1 text-xs leading-5 text-amber-700 font-bold">
                          {{ log.details }}
                        </div>
                      </div>
                    </div>
                    <div class="absolute bottom-0 right-full h-px w-screen bg-gray-100" />
                    <div class="absolute bottom-0 left-0 h-px w-screen bg-gray-100" />
                  </td>

                  <!--                <td class="text-right">-->
                  <!--                  <div class="flex justify-end">-->
                  <!--                    <a href="#" class="text-sm font-medium leading-6 text-red-400 hover:text-red-600"-->
                  <!--                    >View<span class="hidden sm:inline"> transaction</span-->
                  <!--                    ><span class="sr-only"-->
                  <!--                    >, invoice #{{ log.id }}, {{ log.itemName }}</span-->
                  <!--                    ></a-->
                  <!--                    >-->
                  <!--                  </div>-->
                  <!--                  <div class="mt-1 text-xs leading-5 text-gray-500">-->
                  <!--                    Invoice <span class="text-gray-900">#{{ log.id }}</span>-->
                  <!--                  </div>-->
                  <!--                </td>-->
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  DocumentTextIcon,
  TrashIcon,
  ShoppingCartIcon,
  XCircleIcon,
  EyeIcon,
  MagnifyingGlassIcon,
  ExclamationCircleIcon,
  ShieldExclamationIcon,
  InformationCircleIcon,
} from '@heroicons/vue/20/solid';

const LogEvents = {
  LIST_ITEM_ON_SALE: 'List item on sale',
  DELIST_ITEM_FROM_SALE: 'Delist item from sale',
  PLACE_BUY_ORDER: 'Place buy order',
  CANCEL_BUY_ORDER: 'Cancel buy order',
  ANALYZE_ITEM: 'Analyze item',
  FIND_ITEMS_TO_SALE: 'Find items to sale',
  CANNOT_PLACE_BUY_ORDER: 'Can`t place buy order',
  STEAM_REQUEST_ERROR: 'Ошибки от запросов к стиму',
  INTERNAL_ACCOUNT_ERROR: 'Bнутренние ошибки с аккаунтом',
  UNKNOWN_ERROR: 'Неизвестная ошибка',
};

const logEventStylesAndIcons = {
  LIST_ITEM_ON_SALE: {
    style: 'text-green-600 bg-green-100',
    icon: DocumentTextIcon,
  },
  DELIST_ITEM_FROM_SALE: {
    style: 'text-yellow-600 bg-yellow-100',
    icon: TrashIcon,
  },
  PLACE_BUY_ORDER: {
    style: 'text-blue-600 bg-blue-100',
    icon: ShoppingCartIcon,
  },
  CANCEL_BUY_ORDER: {
    style: 'text-red-600 bg-red-100',
    icon: XCircleIcon,
  },
  ANALYZE_ITEM: {
    style: 'text-purple-600 bg-purple-100',
    icon: EyeIcon,
  },
  FIND_ITEMS_TO_SALE: {
    style: 'text-indigo-600 bg-indigo-100',
    icon: MagnifyingGlassIcon,
  },
  CANNOT_PLACE_BUY_ORDER: {
    style: 'text-orange-600 bg-orange-100',
    icon: ExclamationCircleIcon,
  },
  STEAM_REQUEST_ERROR: {
    style: 'text-red-600 bg-red-100',
    icon: ShieldExclamationIcon,
  },
  INTERNAL_ACCOUNT_ERROR: {
    style: 'text-red-600 bg-red-100',
    icon: ExclamationCircleIcon,
  },
  UNKNOWN_ERROR: {
    style: 'text-red-600 bg-red-100',
    icon: InformationCircleIcon,
  },
};

const days = [
  {
    date: 'Today',
    dateTime: '2023-06-01',
    eventLogs: [
      {
        id: 1,
        itemName: 'AK-47 | Redline (Field-Tested)',
        eventType: 'LIST_ITEM_ON_SALE',
        amount: '$7,600.00 USD',
        details: 'Выставлен на продажу.',
        price: 'Цена на основе истории: $1,200, Цена с учётом конкурентов: $1,180, Разница: 1.7%',
        additionalInfo: 'Причина List item on sale - Пользователь выставил предмет на продажу',
      },
      {
        id: 2,
        itemName: 'AWP | Dragon Lore (Factory New)',
        eventType: 'DELIST_ITEM_FROM_SALE',
        amount: '$8,000.00 USD',
        details: 'Снято с продажи.',
        price: 'Цена на основе истории: $1,300, Цена с учётом конкурентов: $1,280, Разница: 1.5%',
        additionalInfo: 'Причина Delist item from sale - Пользователь снял предмет с продажи',
      },
      {
        id: 3,
        itemName: 'AWP | Dragon Lore (Factory New)',
        eventType: 'PLACE_BUY_ORDER',
        amount: '$1,200.00 USD',
        details: 'Поставлен на покупку.',
        price: 'Цена на основе истории: $1,200, Цена с учётом конкурентов: $1,180, Разница: 1.7%',
        additionalInfo: 'Причина Place buy order - Пользователь поставил предмет на покупку',
      },
      {
        id: 4,
        itemName: 'AWP | Dragon Lore (Factory New)',
        eventType: 'CANCEL_BUY_ORDER',
        amount: '$1,200.00 USD',
        details: 'Отменён заказ на покупку.',
        price: 'Цена на основе истории: $1,200, Цена с учётом конкурентов: $1,180, Разница: 1.7%',
        additionalInfo: 'Причина Cancel buy order - Пользователь отменил заказ на покупку',
      },
      {
        id: 5,
        itemName: 'AWP | Dragon Lore (Factory New)',
        eventType: 'ANALYZE_ITEM',
        amount: '$1,200.00 USD',
        details: 'Предмет проанализирован.',
        price: 'Цена на основе истории: $1,200, Цена с учётом конкурентов: $1,180, Разница: 1.7%',
        additionalInfo: 'Причина Analyze item - Пользователь проанализировал предмет',
      },
      {
        id: 6,
        itemName: 'AWP | Dragon Lore (Factory New)',
        eventType: 'FIND_ITEMS_TO_SALE',
        amount: '$1,200.00 USD',
        details: 'Найден предмет для продажи.',
        price: 'Цена на основе истории: $1,200, Цена с учётом конкурентов: $1,180, Разница: 1.7%',
        additionalInfo: 'Причина Find items to sale - Пользователь нашёл предмет для продажи',
      },
      {
        id: 7,
        itemName: 'AWP | Dragon Lore (Factory New)',
        eventType: 'CANNOT_PLACE_BUY_ORDER',
        amount: '$1,200.00 USD',
        details: 'Не удалось поставить на покупку.',
        price: 'Цена на основе истории: $1,200, Цена с учётом конкурентов: $1,180, Разница: 1.7%',
        additionalInfo: 'Причина Cannot place buy order - Не удалось поставить на покупку',
      },
      {
        id: 8,
        itemName: 'AWP | Dragon Lore (Factory New)',
        eventType: 'STEAM_REQUEST_ERROR',
        amount: '$1,200.00 USD',
        details: 'Ошибка запроса к Steam.',
        price: 'Цена на основе истории: $1,200, Цена с учётом конкурентов: $1,180, Разница: 1.7%',
        additionalInfo: 'Причина Steam request error - Ошибка запроса к Steam',
      },
      {
        id: 9,
        itemName: 'AWP | Dragon Lore (Factory New)',
        eventType: 'INTERNAL_ACCOUNT_ERROR',
        amount: '$1,200.00 USD',
        details: 'Внутренняя ошибка аккаунта.',
        price: 'Цена на основе истории: $1,200, Цена с учётом конкурентов: $1,180, Разница: 1.7%',
        additionalInfo: 'Причина Internal account error - Внутренняя ошибка аккаунта',
      },
      {
        id: 10,
        itemName: 'AWP | Dragon Lore (Factory New)',
        eventType: 'UNKNOWN_ERROR',
        amount: '$1,200.00 USD',
        details: 'Произошла неизвестная ошибка.',
        price: 'Цена на основе истории: $1,200, Цена с учётом конкурентов: $1,180, Разница: 1.7%',
        additionalInfo: 'Причина Unknown error - Произошла неизвестная ошибка',
      },
    ],
  },
  {
    date: 'Yesterday',
    dateTime: '2023-05-31',
    eventLogs: [
      {
        id: 11,
        itemName: 'AWP | Dragon Lore (Factory New)',
        eventType: 'LIST_ITEM_ON_SALE',
        amount: '$1,200.00 USD',
        details: 'Выставлен на продажу.',
        price: 'Цена на основе истории: $1,200, Цена с учётом конкурентов: $1,180, Разница: 1.7%',
        additionalInfo: 'Причина List item on sale - Пользователь выставил предмет на продажу',
      },
    ],
  },
];
</script>
