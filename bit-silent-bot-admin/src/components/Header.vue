<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import {
  Icon,
  NumberInfo,
  Button,
  Avatar,
  Dropdown,
  DropdownMenu,
  DropdownItem,
} from "view-ui-plus";

const theme = ref("light");
const toggleTheme = () => {
  theme.value = theme.value === "light" ? "dark" : "light";
};

const { locale } = useI18n();
const languages = ref([
  { label: "English", value: "en-US" },
  { label: "Українська", value: "uk-UA" },
]);

const handleLanguageChange = (value: string) => {
  locale.value = value;
};

const orders = 579157.13;
const balance = 85213.25;
const additionalBalance = 2083.18;
const onSale = 12324.32;
const total = 87296.43;
</script>

<template>
  <div class="header">
    <div class="left-section">
      <Dropdown placement="top-end">
        <Avatar icon="ios-person" size="large" />
        <Icon type="ios-arrow-down"></Icon>

        <template #list>
          <DropdownMenu>
            <DropdownItem name="profile">Profile</DropdownItem>
            <DropdownItem name="logout">Logout</DropdownItem>
          </DropdownMenu>
        </template>
      </Dropdown>
      <Select
        v-model="locale"
        @on-change="handleLanguageChange"
        style="width: 200px"
      >
        <Option v-for="lang in languages" :key="lang.value" :value="lang.value">
          {{ lang.label }}
        </Option>
      </Select>
    </div>
    <div class="center-section">
      <NumberInfo sub-title="Order Total" sub-total="12.1" gap="0" status="up">
        <template #total>
          <CountUp :end="orders" :duration="0.3" :start="(2 * orders) / 3" />
        </template>
      </NumberInfo>
      <NumberInfo
        gap="0"
        sub-title="Balance"
        status="up"
        :sub-total="additionalBalance"
      >
        <template #total>
          <CountUp :end="balance" :duration="0.6" :start="balance / 2" />
        </template>
      </NumberInfo>

      <Icon type="md-add" class="icon" />

      <NumberInfo
        sub-title="On Sale"
        status="down"
        :total="onSale.toFixed(2)"
        :sub-total="additionalBalance"
        gap="0"
      />

      <span class="equals">=</span>

      <NumberInfo
        sub-title="Total"
        status="up"
        gap="0"
        :total="total.toFixed(2)"
        :sub-total="additionalBalance"
      />
    </div>
    <div class="right-section">
      <Button type="error" size="small" class="stop-button"
        >Stop All Bots</Button
      >
      <Icon
        type="md-sunny"
        size="20"
        @click="toggleTheme"
        v-if="theme === 'dark'"
      />
      <Icon type="md-moon" size="20" @click="toggleTheme" v-else />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header {
  //height: var(--header-height);
  display: flex;
  //align-items: stretch;
  flex-wrap: wrap;
  align-items: center;

  .left-section,
  .center-section,
  .right-section {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    height: auto;
  }

  .left-section {
    gap: 10px;
  }

  .center-section {
    gap: 20px;
  }

  .right-section {
    gap: 10px;
    margin-left: auto;
  }

  .stop-button {
    margin-left: 20px;
  }

  .icon {
    font-size: 24px;
  }

  .equals {
    margin: 0 10px;
    font-size: 24px;
    font-weight: bold;
  }
}

.vertical-divider {
  position: relative;
  width: 3px;
  margin: 0 10px;
  height: var(--header-height);

  &:after {
    content: "";
    height: 100%;
    position: absolute;
    background-color: #333;
    width: 100%;
    left: 0;
    top: 0;
  }
}

@media (max-width: 1024px) {
  .header {
    //flex-direction: column;
    //align-items: center;
    //height: auto;

    .center-section {
      //flex-direction: row;
      //flex-wrap: wrap;
    }

    .equals,
    .icon,
    .vertical-divider {
      display: none;
    }
  }
}
</style>
