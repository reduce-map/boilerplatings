<script setup>
import AppLayout from '@/components/app-layout.vue';
import { useRoute } from 'vue-router';

import DashboardGrid from '@/components/dashboard-grid.vue';

const route = useRoute();
</script>

<template>
  <app-layout>
    <div class="sign-out-container">
      <p>exchange-page</p>

      <!--      <dashboard-grid />-->

      <p>{{ JSON.stringify(route.params.id) }}</p>
      <p>{{ JSON.stringify(route) }}</p>
    </div>
  </app-layout>
</template>
