<template>
  <Form :model="formItem" :label-width="150">
    <!--  <Form :model="formItem" :label-width="150" class="dark-theme">-->
    <FormItem label="Старт при открытии">
      <Switch v-model="formItem.start" true-color="olive" />
    </FormItem>
    <FormItem label="Выбор сервера">
      <Select v-model="formItem.server" :capture="true">
        <Option value="1">Сервер 1</Option>
        <Option value="2">Сервер 2</Option>
        <Option value="3">Сервер 3</Option>
      </Select>
    </FormItem>
    <FormItem label="Обновить заказы">
      <Input v-model="formItem.updateOrdersTime" placeholder="Введите время" />
    </FormItem>
    <FormItem label="Поиск на продажу">
      <Input v-model="formItem.searchSaleTime" placeholder="Введите время" />
    </FormItem>
    <FormItem label="Обновить на продаже">
      <Input v-model="formItem.updateSaleTime" placeholder="Введите время" />
    </FormItem>
    <FormItem label="Задержка (мс)">
      <InputNumber v-model="formItem.delay" />
    </FormItem>
    <Divider orientation="left">
      <span class="text-white">CS GO</span>
    </Divider>
    <FormItem label="Продавать с наклейками (нашивками)">
      <Switch v-model="formItem.sellWithStickers" true-color="olive" />
    </FormItem>
    <FormItem label="Процент наценки">
      <Input v-model="formItem.markupPercentage" type="number" max="100" min="0" />
    </FormItem>
    <FormItem label="Не продавать, если сумма наклеек">
      <Input v-model="formItem.stickerSumLimit" type="number" />
    </FormItem>
    <FormItem label="Не продавать, если стрик больше">
      <Input v-model="formItem.streakLimit" type="number" />
    </FormItem>
    <FormItem label="Прокси">
      <Input v-model="formItem.proxy" type="text" />
    </FormItem>
  </Form>
</template>

<script>
export default {
  data() {
    return {
      formItem: {
        start: true,
        server: '2',
        updateOrdersTime: '13:11',
        searchSaleTime: '13:12',
        updateSaleTime: '13:12',
        delay: 0,
        sellWithStickers: true,
        markupPercentage: '5%',
        stickerSumLimit: 5700,
        streakLimit: 0,
        proxy: '',
      },
    };
  },
};
</script>

<style>
.dark-theme {
  background-color: #1f2937;
  color: #ffffff;
  padding: 20px;
}
.ivu-select-selected-value {
  color: #000;
}
.dark-theme .ivu-form-item {
  margin-bottom: 12px;
}
.dark-theme .ivu-form-item-label {
  color: #ffffff;
}
.dark-theme .ivu-input,
.dark-theme .ivu-select,
.dark-theme .ivu-switch,
.dark-theme .ivu-input-number,
.dark-theme .ivu-button {
  background-color: #1f1f1f;
  color: #ffffff;
  border-color: #3a3a3a;
}
.dark-theme .ivu-input:focus,
.dark-theme .ivu-select:focus,
.dark-theme .ivu-switch:focus,
.dark-theme .ivu-input-number:focus {
  border-color: #4a4a4a;
}
</style>
