<template>
  <div class="layout">
    <Layout :style="{ minHeight: '100vh' }">
      <Sider collapsible :collapsed-width="78" v-model="isCollapsed" >
        <Menu
          :active-name="activeMenuItem"
          theme="dark"
          width="auto"
          :class="menuitemClasses"
        >
          <MenuItem name="dashboard" :to="{ name: 'dashboard' }">
            <Icon type="ios-navigate" />
            <span>Dashboard</span>
          </MenuItem>
          <MenuItem name="bot" :to="{ name: 'bot', params: { id: 27 } }">
            <Icon type="md-ionitron" />
            <span>Bot</span>
          </MenuItem>
          <MenuItem name="reports" :to="{ name: 'reports' }">
            <Icon type="ios-paper" />
            <span>Reports</span>
          </MenuItem>
          <MenuItem name="settings" :to="{ name: 'settings' }">
            <Icon type="ios-settings" />
            <span>Settings</span>
          </MenuItem>
          <MenuItem name="coingecko" :to="{ name: 'coingecko' }">
            <Icon type="logo-bitcoin" />
            <span>Coingecko</span>
          </MenuItem>
          <Submenu name="settings">
            <template #title>
              <Icon type="ios-paper" />
              内容管理
            </template>
            <MenuGroup title="Settings">
              <MenuItem name="settings" :to="{ name: 'settings' }">
                <Icon type="ios-settings" />
                <span>Settings</span>
              </MenuItem>
            </MenuGroup>
          </Submenu>
        </Menu>
      </Sider>
      <Layout>
        <!--        Leave here for MVP. LEAD -->
        <!--        https://www.iviewui.com/view-ui-plus/component/layout/layout#left -->
        <!--        <Header></Header>-->
        <Content>
          <!--        Leave here for MVP. LEAD -->
          <!--          <Breadcrumb :style="{ margin: '16px 0' }">-->
          <!--            <BreadcrumbItem>Home</BreadcrumbItem>-->
          <!--            <BreadcrumbItem>Components</BreadcrumbItem>-->
          <!--            <BreadcrumbItem>Layout</BreadcrumbItem>-->
          <!--          </Breadcrumb>-->
          <Card>
            <slot></slot>
          </Card>
        </Content>
      </Layout>
    </Layout>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import {
  Layout,
  Sider,
  Menu,
  MenuItem,
  Icon,
  Content,
  Card,
} from "view-ui-plus";
import { useRoute } from "vue-router";

const isCollapsed = ref(true);
const route = useRoute();

const activeMenuItem = computed(() => route.name);

const menuitemClasses = computed(() => [
  "menu-item",
  isCollapsed.value ? "collapsed-menu" : "",
]);
</script>

<style lang="scss" scoped>
.menu-item span {
  display: inline-block;
  overflow: hidden;
  width: calc(100% - 30px);
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: bottom;
  transition: width 0.2s ease 0.2s;
}
.menu-item i {
  transform: translateX(0px);
  transition:
    font-size 0.2s ease,
    transform 0.2s ease;
  vertical-align: middle;
  font-size: 16px;
}
.collapsed-menu span {
  width: 0;
  transition: width 0.2s ease;
}
.collapsed-menu i {
  transform: translateX(5px);
  transition:
    font-size 0.2s ease 0.2s,
    transform 0.2s ease 0.2s;
  vertical-align: middle;
  font-size: 22px;
}
.dev-run-preview .dev-run-preview-edit {
  display: none;
}
</style>
