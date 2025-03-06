<!-- eslint-disable vue/block-lang -->
<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup>
import { ref, onMounted, watch } from 'vue';
import { createChart } from 'lightweight-charts';
import { searchCoins, getCoinData, getMarketChart } from '~/composables/externalApi';

const searchQuery = ref('');
const showResults = ref(false);
const searchResults = ref([]);
const selectedSymbol = ref('bitcoin');
const selectedInterval = ref('1D');
const priceChartContainer = ref(null);
const volumeChartContainer = ref(null);
const error = ref('');
const loading = ref(false);
const marketData = ref({
  price: 0,
  priceChange24h: 0,
  high24h: 0,
  low24h: 0
});

const intervals = ['1H', '4H', '1D', '1W', '1M'];

const toggleInterval = () => {
  const currentIndex = intervals.indexOf(selectedInterval.value);
  const nextIndex = (currentIndex + 1) % intervals.length;
  selectedInterval.value = intervals[nextIndex];
  fetchChartData();
};

const handleError = (e) => {
  const errorMessage = e?.response?.data?.error || e?.message || 'An error occurred';
  error.value = errorMessage;
  setTimeout(() => {
    error.value = '';
  }, 5000);
};

const searchSymbols = async () => {
  if (searchQuery.value.length < 2) {
    showResults.value = false;
    return;
  }

  try {
    const response = await searchCoins(searchQuery.value);
    searchResults.value = response.data.coins.slice(0, 10);
    showResults.value = true;
  } catch (e) {
    handleError(e);
  }
};

const selectSymbol = (result) => {
  selectedSymbol.value = result.id;
  searchQuery.value = result.symbol.toUpperCase();
  showResults.value = false;
  fetchChartData();
  fetchMarketData();
};

const fetchMarketData = async () => {
  try {
    loading.value = true;
    const response = await getCoinData(selectedSymbol.value);
    const data = response.data;
    marketData.value = {
      price: data.market_data.current_price.usd,
      priceChange24h: data.market_data.price_change_percentage_24h,
      high24h: data.market_data.high_24h.usd,
      low24h: data.market_data.low_24h.usd
    };
  } catch (e) {
    handleError(e);
  } finally {
    loading.value = false;
  }
};

const fetchChartData = async () => {
  try {
    loading.value = true;
    const days = selectedInterval.value === '1H' ? 1 :
      selectedInterval.value === '4H' ? 1 :
        selectedInterval.value === '1D' ? 7 :
          selectedInterval.value === '1W' ? 30 : 90;

    const response = await getMarketChart(selectedSymbol.value, days);

    const priceData = response.data.prices.map((item) => ({
      time: item[0] / 1000,
      value: item[1]
    }));

    const volumeData = response.data.total_volumes.map((item) => ({
      time: item[0] / 1000,
      value: item[1]
    }));

    updateCharts(priceData, volumeData);
  } catch (e) {
    handleError(e);
  } finally {
    loading.value = false;
  }
};

const updateCharts = (priceData, volumeData) => {
  if (!priceChartContainer.value || !volumeChartContainer.value) return;

  // Clear previous charts
  priceChartContainer.value.innerHTML = '';
  volumeChartContainer.value.innerHTML = '';

  // Create price chart
  const priceChart = createChart(priceChartContainer.value, {
    layout: {
      background: { color: '#ffffff' },
      textColor: '#333',
    },
    grid: {
      vertLines: { color: '#f0f0f0' },
      horzLines: { color: '#f0f0f0' },
    },
    width: priceChartContainer.value.clientWidth,
    height: 400,
  });

  const priceSeries = priceChart.addSeries({
    color: '#10B981',
    lineWidth: 2,
  });
  priceSeries.setData(priceData);

  // Create volume chart
  const volumeChart = createChart(volumeChartContainer.value, {
    layout: {
      background: { color: '#ffffff' },
      textColor: '#333',
    },
    grid: {
      vertLines: { color: '#f0f0f0' },
      horzLines: { color: '#f0f0f0' },
    },
    width: volumeChartContainer.value.clientWidth,
    height: 400,
  });

  const volumeSeries = volumeChart.addCustomSeries({
    color: '#10B981',
    priceFormat: {
      type: 'volume',
    },
  });
  volumeSeries.setData(volumeData);
};

onMounted(() => {
  fetchChartData();
  fetchMarketData();

  // Update charts on window resize
  window.addEventListener('resize', () => {
    if (priceChartContainer.value && volumeChartContainer.value) {
      updateCharts([], []); // This will trigger a re-render with the new size
      fetchChartData(); // Fetch fresh data
    }
  });
});

watch(selectedInterval, () => {
  fetchChartData();
});
</script>
<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h2 class="text-2xl font-bold text-gray-900">Trading Charts</h2>
      <div class="flex space-x-4">
        <div class="w-64">
          <input type="text" v-model="searchQuery" @input="searchSymbols" placeholder="Search cryptocurrency..."
            class="input-field" />
          <div v-if="showResults" class="absolute mt-1 w-64 bg-white rounded-md shadow-lg z-50">
            <ul class="max-h-60 overflow-auto rounded-md py-1">
              <li v-for="result in searchResults" :key="result.symbol" @click="selectSymbol(result)"
                class="px-4 py-2 hover:bg-emerald-50 cursor-pointer">
                {{ result.symbol.toUpperCase() }} - {{ result.name }}
              </li>
            </ul>
          </div>
        </div>
        <button @click="toggleInterval" class="btn-primary flex items-center space-x-2">
          <span>{{ selectedInterval }}</span>
        </button>
      </div>
    </div>

    <div v-if="error" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
      <span class="block sm:inline">{{ error }}</span>
    </div>

    <div v-if="loading" class="flex justify-center py-8">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
    </div>

    <div v-else>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Chart 1: Price Chart -->
        <div class="bg-white rounded-lg shadow-lg p-4">
          <h3 class="text-lg font-semibold mb-4">Price Chart - {{ selectedSymbol.toUpperCase() }}</h3>
          <div ref="priceChartContainer" class="w-full h-[400px]"></div>
        </div>

        <!-- Chart 2: Volume Chart -->
        <div class="bg-white rounded-lg shadow-lg p-4">
          <h3 class="text-lg font-semibold mb-4">Volume Chart - {{ selectedSymbol.toUpperCase() }}</h3>
          <div ref="volumeChartContainer" class="w-full h-[400px]"></div>
        </div>
      </div>

      <!-- Trading Information -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div class="bg-white rounded-lg shadow-lg p-6">
          <h3 class="text-lg font-semibold mb-4">Market Overview</h3>
          <div class="space-y-4">
            <div class="flex justify-between">
              <span class="text-gray-600">Price</span>
              <span class="font-semibold">${{ marketData.price?.toFixed(2) }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">24h Change</span>
              <span :class="marketData.priceChange24h >= 0 ? 'text-green-600' : 'text-red-600'">
                {{ marketData.priceChange24h?.toFixed(2) }}%
              </span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">24h High</span>
              <span class="font-semibold">${{ marketData.high24h?.toFixed(2) }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">24h Low</span>
              <span class="font-semibold">${{ marketData.low24h?.toFixed(2) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.input-field {
  @apply w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none;
}

.btn-primary {
  @apply bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition-colors;
}
</style>
