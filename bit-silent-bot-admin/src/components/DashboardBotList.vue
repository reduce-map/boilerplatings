<template>
  <p>
    <i>
      👁️ May be almost everything can be represented as a tree 👁️
    </i>
  </p>
  <Tree
    :data="data"
    :render="renderContent"
    @on-contextmenu="handleContextMenu"
    class="demo-tree-render"
  >
    <template #contextMenu>
      <DropdownItem @click="handleContextMenuEdit">Edit</DropdownItem>
      <DropdownItem @click="handleContextMenuDelete" style="color: #ed4014"
        >Delete</DropdownItem
      >
    </template>
  </Tree>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Icon, Button } from "view-ui-plus";
import { useRouter } from "vue-router";

interface TreeNode {
  title: string;
  expand?: boolean;
  contextmenu?: boolean;
  id?: number;
  children?: TreeNode[];
}

const data = ref<TreeNode[]>([
  {
    title: "Trading Bots",
    expand: true,
    contextmenu: true,
    children: [
      {
        title: "Crypto Trading Bots",
        expand: true,
        children: [
          { title: "FTMO Bot", id: 25 },
          { title: "Lazy Trading Bot", id: 1 },
          { title: "Data Aggregation Bot", id: 2 },
          { title: "Arbitrage Bot", id: 11 },
          { title: "Market Making Bot", id: 12 },
        ],
      },
      {
        title: "Fiat Trading Bots",
        children: [
          { title: "Stock Trading Bot", id: 3 },
          { title: "Forex Trading Bot", id: 4 },
          { title: "Options Trading Bot", id: 13 },
          { title: "Futures Trading Bot", id: 14 },
        ],
      },
    ],
  },
  {
    title: "Data Collection Bots",
    expand: true,
    children: [
      {
        title: "Scrapers",
        expand: true,
        children: [
          { title: "Amazon Scraper", id: 5 },
          { title: "eBay Scraper", id: 6 },
          { title: "AliExpress Scraper", id: 15 },
          { title: "Walmart Scraper", id: 16 },
        ],
      },
      {
        title: "Integration Bots",
        children: [
          { title: "n8n Bots", id: 7 },
          { title: "Zapier Bots", id: 8 },
          { title: "Integromat Bots", id: 17 },
          { title: "IFTTT Bots", id: 18 },
        ],
      },
    ],
  },
  {
    title: "AI Personalized Bots",
    children: [
      { title: "News Aggregation Bot", id: 9 },
      { title: "Discount Tracking Bot", id: 10 },
      { title: "Sentiment Analysis Bot", id: 19 },
      { title: "Customer Service Bot", id: 20 },
    ],
  },
  {
    title: "Other Bots",
    children: [
      { title: "Weather Forecast Bot", id: 21 },
      { title: "Traffic Analysis Bot", id: 22 },
      { title: "Sports Stats Bot", id: 23 },
      { title: "Health Monitoring Bot", id: 24 },
    ],
  },
]);

const router = useRouter();

function handleClick(id: number) {
  router.push({ path: `/bot/${id}` });
}

function handleContextMenuEdit() {
  console.log("Edit");
}

function handleContextMenuDelete() {
  console.log("Delete");
}

function handleContextMenu() {
  console.log("Context menu");
}

const buttonProps = {
  type: "default",
  size: "small",
};

function renderContent(h: any, { root, node, data }: any) {
  return h(
    "span",
    {
      style: {
        display: "inline-block",
        width: "100%",
      },
    },
    [
      h(
        "span",
        {
          class: { clickable: data.id },
          onClick: () => {
            data.id && handleClick(data.id);
          },
          style: data.id
            ? { color: "blue", cursor: "pointer", textDecoration: "underline" }
            : {},
        },
        [
          h(Icon, {
            type: data.id ? "md-ionitron" : "logo-bitcoin",
            style: {
              marginRight: "8px",
            },
          }),
          h("span", data.title),
        ],
      ),
      h(
        "span",
        {
          style: {
            display: "inline-block",
            float: "right",
            marginLeft: "16px",
          },
        },
        [
          h(Button, {
            ...buttonProps,
            icon: "ios-add",
            style: {
              marginRight: "8px",
            },
            onClick: () => {
              append(data);
            },
          }),
          h(Button, {
            ...buttonProps,
            icon: "ios-remove",
            onClick: () => {
              remove(root, node, data);
            },
          }),
        ],
      ),
    ],
  );
}

function append(data: TreeNode) {
  const children = data.children || [];
  children.push({
    title: "appended node",
    expand: true,
  });
  data.children = children;
}

function remove(root: any, node: any, data: TreeNode) {
  const parentKey = root.find((el: any) => el === node).parent;
  const parent = root.find((el: any) => el.nodeKey === parentKey).node;
  const index = parent.children.indexOf(data);
  parent.children.splice(index, 1);
}
</script>

<style scoped>
.demo-tree-render .ivu-tree-title {
  width: 100%;
}

.clickable {
  color: blue;
  cursor: pointer;
  text-decoration: underline;
}
</style>
