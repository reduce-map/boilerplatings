<template>
  <!--  <layout-stacked>-->
  <div class="waterfall-layout mx-auto max-w-7xl">
    <Card class="widget">
      <Form :model="formItem" :label-width="200">
        <FormItem label="Автоматический перезаход в Steam">
          <Switch v-model="formItem.autoReenterSteam" />
        </FormItem>
        <FormItem label="Автоинкремент заказа">
          <Switch v-model="formItem.autoIncrementOrder" />
        </FormItem>
        <FormItem label="Удалять неподтвержденные">
          <Switch v-model="formItem.deleteUnconfirmed" />
        </FormItem>
        <FormItem label="Игнор отсутствующих">
          <Switch v-model="formItem.ignoreAbsent" />
        </FormItem>
        <FormItem label="Не продавать трейдабельные">
          <Switch v-model="formItem.noSellTradable" />
        </FormItem>
        <FormItem label="Анализ перед заказом">
          <Switch v-model="formItem.analyzeBeforeOrder" />
        </FormItem>
        <FormItem label="Анализ перед продажей">
          <Switch v-model="formItem.analyzeBeforeSale" />
        </FormItem>
        <FormItem label="Проверять флоат">
          <Switch v-model="formItem.checkFloat" />
        </FormItem>
        <FormItem label="Сервис анализа скинов">
          <Select v-model="formItem.skinAnalysisService">
            <Option value="1">Сервер 1</Option>
            <Option value="2">Сервер 2</Option>
          </Select>
        </FormItem>
      </Form>
    </Card>

    <Card class="widget">
      <Form :model="formItem" :label-width="200">
        <Divider orientation="left">Расчет цен</Divider>
        <FormItem label="Желаемый процент профита">
          <Input v-model="formItem.desiredProfitPercent" type="number" suffix="%" />
        </FormItem>
        <FormItem label="Минимальное значение профита">
          <Input v-model="formItem.minProfitValue" type="number" suffix="%" />
        </FormItem>
        <FormItem label="Точное значение профита">
          <Input v-model="formItem.exactProfitValue" type="number" />
        </FormItem>
        <FormItem label="Период анализа">
          <Input v-model="formItem.analysisPeriod" type="number" />
        </FormItem>
        <FormItem label="Процент коридора">
          <Input v-model="formItem.corridorPercent" type="number" />
        </FormItem>
        <FormItem label="Алгоритм продажи">
          <Select v-model="formItem.sellAlgorithm">
            <Option value="max">Максимальный</Option>
            <Option value="min">Минимальный</Option>
          </Select>
        </FormItem>
        <FormItem label="Алгоритм покупки">
          <Select v-model="formItem.buyAlgorithm">
            <Option value="max">Максимальный</Option>
            <Option value="min">Минимальный</Option>
          </Select>
        </FormItem>
        <FormItem label="Процент от заказа">
          <Input v-model="formItem.orderPercent" type="number" />
        </FormItem>
      </Form>
    </Card>

    <Card class="widget">
      <Form :model="formItem" :label-width="200">
        <Divider orientation="left">Снятие/размещение заказов</Divider>
        <FormItem label="Если на продаже больше чем в заказе">
          <Switch v-model="formItem.moreOnSaleThanInOrder" />
        </FormItem>
        <FormItem label="Если баланс упал на указанный %">
          <Input v-model="formItem.balanceDropPercent" type="number" suffix="%" />
        </FormItem>
        <FormItem label="Время включения всех заказов в работу">
          <TimePicker v-model="formItem.orderStartTime" />
        </FormItem>
        <FormItem label="Уведомление в telegram если количество предметов на продажу равно">
          <Switch v-model="formItem.telegramNotifyOnEqualItems" />
        </FormItem>
        <FormItem label="Размещать больше 1000 заказов">
          <Switch v-model="formItem.placeMoreThan1000Orders" />
        </FormItem>
        <FormItem label="Максимальное количество предметов при анализе заказов">
          <Input v-model="formItem.maxItemsInOrderAnalysis" type="number" />
        </FormItem>
      </Form>
    </Card>

    <Card class="widget">
      <Form :model="formItem" :label-width="200">
        <Divider orientation="left">Автоматический перерасчет</Divider>
        <FormItem label="Время актуализации цен">
          <TimePicker v-model="formItem.priceUpdateTime" format="HH:mm" />
        </FormItem>
        <Button @click="updatePrices">Запустить актуализацию цен</Button>
        <FormItem label="Удалять заказ по алгоритму">
          <Select v-model="formItem.deleteOrderAlgorithm">
            <Option value="sell">Продажи</Option>
            <Option value="buy">Покупки</Option>
          </Select>
        </FormItem>
        <FormItem label="Обновлять цены по алгоритму">
          <Select v-model="formItem.updatePricesAlgorithm">
            <Option value="sell">Продажи</Option>
            <Option value="buy">Покупки</Option>
          </Select>
        </FormItem>
        <FormItem label="Играть в копеечку">
          <Switch v-model="formItem.playWithPenny" />
        </FormItem>
        <FormItem label="Снимать с продажи через дней">
          <Input v-model="formItem.removeFromSaleAfterDays" type="number" />
        </FormItem>
        <FormItem label="Не пересчитывать с наклейками">
          <Switch v-model="formItem.noRecountWithStickers" />
        </FormItem>
        <FormItem label="Игнорировать заказы">
          <Switch v-model="formItem.ignoreOrders" />
        </FormItem>
      </Form>
      <Form :model="formItem" :label-width="200">
        <Divider orientation="left">Работа с базой</Divider>
        <Button @click="importBaseFromFile">Импорт базы из файла</Button>
      </Form>
    </Card>

    <Card class="widget wide">
      <Divider orientation="left">Example</Divider>
      <Form :model="exampleForm" :label-width="200">
        <FormItem label="TreeSelect">
          <TreeSelect v-model="exampleForm.treeSelect" :data="treeData" />
        </FormItem>
        <FormItem label="City">
          <Select v-model="exampleForm.city">
            <Option value="New York">New York</Option>
            <Option value="Los Angeles">Los Angeles</Option>
            <Option value="Chicago">Chicago</Option>
          </Select>
        </FormItem>
        <FormItem label="TagSelect">
          <TagSelect v-model="exampleForm.tagSelect">
            <TagSelectOption name="tag1" color="magenta">Steam bot</TagSelectOption>
            <TagSelectOption name="tag2" color="red">Crypto bot</TagSelectOption>
            <TagSelectOption name="tag3" color="green">Option 3</TagSelectOption>
            <TagSelectOption name="tag4" color="blue">Option 4</TagSelectOption>
            <TagSelectOption name="tag5" color="purple">Option 5</TagSelectOption>
            <TagSelectOption name="tag6" color="orange">Option 6</TagSelectOption>
          </TagSelect>
        </FormItem>
        <FormItem label="InputNumber">
          <InputNumber v-model="exampleForm.inputNumber" />
        </FormItem>
        <FormItem label="Transfer">
          <Transfer
            :data="data"
            :target-keys="targetKeys"
            :list-style="listStyle"
            :render-format="render"
            :operations="['To left', 'To right']"
            filterable
            @on-change="handleChange"
          >
            <div :style="{ float: 'right', margin: '5px' }">
              <Button size="small" @click="reloadMockData">Refresh</Button>
            </div>
          </Transfer>
        </FormItem>
        <FormItem label="Cascader">
          <Cascader v-model="exampleForm.cascader" :data="cascaderData" />
        </FormItem>
        <FormItem label="DatePicker">
          <DatePicker v-model="exampleForm.datePicker" />
        </FormItem>
        <FormItem label="DatePicker">
          <Space size="large" wrap>
            <DatePicker v-model="exampleForm.datePicker" />
            <DatePicker type="date" :options="options1" placeholder="Select date" style="width: 200px" />
            <DatePicker
              type="daterange"
              :options="options2"
              placement="bottom-end"
              placeholder="Select date"
              style="width: 200px"
            />
          </Space>
        </FormItem>
      </Form>
    </Card>
  </div>
  <!--  </layout-stacked>-->
</template>

<script>
import SettingsComponent from '@/components/profile-component.vue';
// import LayoutStacked from '@/layouts/layout-stacked.vue';

export default {
  components: {
    // LayoutStacked
    SettingsComponent,
  },
  data() {
    return {
      data: this.getMockData(),
      targetKeys: this.getTargetKeys(),
      listStyle: {
        width: '250px',
        height: '300px',
      },

      items: [
        {
          imageUrl: 'https://source.unsplash.com/random/300x200?sig=1',
          title: 'Item 1',
          description: 'Description for item 1',
        },
        {
          imageUrl: 'https://source.unsplash.com/random/300x200?sig=2',
          title: 'Item 2',
          description: 'Description for item 2',
        },
        {
          imageUrl: 'https://source.unsplash.com/random/300x200?sig=2',
          title: 'Item 2',
          description: 'Description for item 2',
        },
        {
          imageUrl: 'https://source.unsplash.com/random/300x200?sig=2',
          title: 'Item 2',
          description: 'Description for item 2',
        },
        {
          imageUrl: 'https://source.unsplash.com/random/300x200?sig=2',
          title: 'Item 2',
          description: 'Description for item 2',
        },
        {
          imageUrl: 'https://source.unsplash.com/random/300x200?sig=2',
          title: 'Item 2',
          description: 'Description for item 2',
        },
        {
          imageUrl: 'https://source.unsplash.com/random/300x200?sig=2',
          title: 'Item 2',
          description: 'Description for item 2',
        },
        {
          imageUrl: 'https://source.unsplash.com/random/300x200?sig=2',
          title: 'Item 2',
          description: 'Description for item 2',
        },
        {
          imageUrl: 'https://source.unsplash.com/random/300x200?sig=2',
          title: 'Item 2',
          description: 'Description for item 2',
        },
        {
          imageUrl: 'https://source.unsplash.com/random/300x200?sig=2',
          title: 'Item 2',
          description: 'Description for item 2',
        },
        {
          imageUrl: 'https://source.unsplash.com/random/300x200?sig=2',
          title: 'Item 2',
          description: 'Description for item 2',
        },
        {
          imageUrl: 'https://source.unsplash.com/random/300x200?sig=2',
          title: 'Item 2',
          description: 'Description for item 2',
        },
      ],
      exampleForm: {
        treeSelect: ['Node1', 'Child Node1'], // Значение по умолчанию для TreeSelect
        city: 'New York', // Значение по умолчанию для City
        tagSelect: ['Tag1', 'Tag2'], // Значение по умолчанию для TagSelect
        upload: [], // Оставьте пустым, если загрузка файлов не требуется
        inputNumber: 5, // Значение по умолчанию для InputNumber
        transfer: [1, 2], // Значение по умолчанию для Transfer
        cascader: ['option1', 'child1'], // Значение по умолчанию для Cascader
        datePicker: new Date(), // Значение по умолчанию для DatePicker (текущая дата)
      },
      treeData: [
        {
          title: 'Node1',
          expand: true,
          children: [
            {
              title: 'Child Node1',
            },
          ],
        },
        {
          title: 'Node2',
          children: [
            {
              title: 'Child Node2',
            },
          ],
        },
      ],
      transferData: [
        { key: 1, label: 'Option 1' },
        { key: 2, label: 'Option 2' },
        { key: 3, label: 'Option 3' },
      ],
      cascaderData: [
        {
          value: 'option1',
          label: 'Option 1',
          children: [
            {
              value: 'child1',
              label: 'Child 1',
            },
          ],
        },
        {
          value: 'option2',
          label: 'Option 2',
          children: [
            {
              value: 'child2',
              label: 'Child 2',
            },
          ],
        },
      ],
      formItem: {
        autoReenterSteam: false,
        autoIncrementOrder: false,
        deleteUnconfirmed: true,
        ignoreAbsent: true,
        noSellTradable: false,
        analyzeBeforeOrder: true,
        analyzeBeforeSale: true,
        checkFloat: false,
        skinAnalysisService: '1',
        desiredProfitPercent: 4,
        minProfitValue: 1.3,
        exactProfitValue: 0.01,
        analysisPeriod: 4,
        corridorPercent: 20,
        sellAlgorithm: 'max',
        buyAlgorithm: 'max',
        orderPercent: 0,
        moreOnSaleThanInOrder: false,
        balanceDropPercent: 50,
        orderStartTime: '16:00',
        telegramNotifyOnEqualItems: false,
        placeMoreThan1000Orders: false,
        maxItemsInOrderAnalysis: 0,
        priceUpdateTime: '03:00',
        deleteOrderAlgorithm: 'sell',
        updatePricesAlgorithm: 'sell',
        playWithPenny: false,
        removeFromSaleAfterDays: 15,
        noRecountWithStickers: false,
        ignoreOrders: true,
      },

      options1: {
        shortcuts: [
          {
            text: 'Today',
            value() {
              return new Date();
            },
            onClick: (picker) => {
              this.$Message.info('Click today');
            },
          },
          {
            text: 'Yesterday',
            value() {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              return date;
            },
            onClick: (picker) => {
              this.$Message.info('Click yesterday');
            },
          },
          {
            text: 'One week',
            value() {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              return date;
            },
            onClick: (picker) => {
              this.$Message.info('Click a week ago');
            },
          },
        ],
      },
      options2: {
        shortcuts: [
          {
            text: '1 week',
            value() {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              return [start, end];
            },
          },
          {
            text: '1 month',
            value() {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              return [start, end];
            },
          },
          {
            text: '3 months',
            value() {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              return [start, end];
            },
          },
        ],
      },
    };
  },
  methods: {
    updatePrices() {
      console.log('Prices updated');
    },
    importBaseFromFile() {
      console.log('Base imported from file');
    },

    getMockData() {
      let mockData = [];
      for (let i = 1; i <= 20; i++) {
        mockData.push({
          key: i.toString(),
          label: 'Content ' + i,
          description: 'The desc of content  ' + i,
          disabled: Math.random() * 3 < 1,
        });
      }
      return mockData;
    },
    getTargetKeys() {
      return this.getMockData()
        .filter(() => Math.random() * 2 > 1)
        .map((item) => item.key);
    },
    handleChange(newTargetKeys) {
      this.targetKeys = newTargetKeys;
    },
    render(item) {
      return item.label + ' - ' + item.description;
    },
    reloadMockData() {
      this.data = this.getMockData();
      this.targetKeys = this.getTargetKeys();
    },
  },
};
</script>

<style>
.waterfall-layout {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.widget {
  flex: 1;
  min-width: 300px;
  min-height: 600px; /* Установите фиксированную высоту для всех виджетов */
  @apply mb-4;
}

.widget.wide {
  flex: 2; /* Виджет будет занимать два места */
  min-width: 500px;
}
</style>
