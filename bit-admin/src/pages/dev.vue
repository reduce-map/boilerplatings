<template>
  <app-layout>
    <div class="holder bg-gray-700/10 px-4 py-4 sm:flex-row sm:items-center sm:px-6 lg:px-8">
      <h2 class="mb-4">Under development</h2>

      <grid-exchanger-exchanges
        v-if="retailData.length && authStore.companyName"
        :initialData="retailData"
        :exportFileName="`${authStore.companyName}-cash-retail`"
      />
      companyName {{ authStore.companyName }}
      <grid-exchanger-exchanges
        v-if="wholesaleData.length && authStore.companyName"
        :initialData="wholesaleData"
        :exportFileName="`${authStore.companyName}-cash-wholesale`"
      />
    </div>
  </app-layout>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import AppLayout from '@/components/app-layout.vue';
import GridExchangerExchanges from '@/components/ag-grids/grid-exchanger-exchanges.vue';
import ExchangerService from '@/services/exchanger-service.js';
import { useAuthStore } from '@/store/auth.js';
import { getAllCurrenciesWithFlags, getCountriesWithMultipleCurrencies } from '@/utils';

const authStore = useAuthStore();

const retailData = ref([]);
const wholesaleData = ref([]);

console.log(getCountriesWithMultipleCurrencies());
console.log(getAllCurrenciesWithFlags());

const fetchData = async () => {
  try {
    const retailResponse = await ExchangerService.getExchangeCashRetail();
    const wholesaleResponse = await ExchangerService.getExchangeCashWholesale();

    console.log(retailResponse.data);

    retailData.value = retailResponse.data;
    wholesaleData.value = wholesaleResponse.data;
  } catch (error) {
    console.error('Error fetching exchange data:', error);
  }
};

onMounted(() => {
  fetchData();
});
</script>
