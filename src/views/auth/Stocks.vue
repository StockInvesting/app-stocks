<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable vue/block-lang -->
<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { ref, onMounted, watch } from 'vue'
import { createChart } from 'lightweight-charts'
import { getStocksList, getStockQuote, getCompanyInfo, getStockCandles } from '~/composables/finnhub'
import { analyzeStockRisk } from '~/composables/stockAi'

// State
const searchQuery = ref('')
const showResults = ref(false)
const searchResults = ref([])
const selectedSymbol = ref('')
const selectedInterval = ref('1D')
const selectedCategory = ref<'stock' | 'etf' | 'adr' | 'reit'>('stock')
const selectedRiskLevel = ref<'Low' | 'Medium' | 'High'>('Medium')
const priceChartContainer = ref(null)
const volumeChartContainer = ref(null)
const error = ref('')
const loading = ref(false)
const marketData = ref({
  symbol: '',
  price: 0,
  change: 0,
  changePercent: 0,
  high: 0,
  low: 0,
  volume: 0,
  previousClose: 0
})
const companyInfo = ref({
  marketCap: 0,
  peRatio: 0,
  high52: 0,
  low52: 0,
  description: '',
  industry: '',
  sector: ''
})
const riskAnalysis = ref(null)

const intervals = ['1D', '5D', '1M', '3M', '1Y']

// Methods
const handleCategoryChange = async () => {
  searchQuery.value = ''
  searchResults.value = []
  showResults.value = false
  await loadStocks()
}

const loadStocks = async () => {
  try {
    const stocks = await getStocksList(selectedCategory.value)
    searchResults.value = stocks
  } catch (error) {
    console.error('Error loading stocks:', error)
  }
}

const searchStocks = async () => {
  if (searchQuery.value.length < 2) {
    showResults.value = false
    return
  }

  try {
    const stocks = await getStocksList(selectedCategory.value)
    const query = searchQuery.value.toLowerCase()
    searchResults.value = stocks.filter(stock =>
      stock.symbol.toLowerCase().includes(query) ||
      stock.name.toLowerCase().includes(query)
    )
    showResults.value = true
  } catch (error) {
    console.error('Error searching stocks:', error)
  }
}

const selectStock = async (stock) => {
  selectedSymbol.value = stock.symbol
  searchQuery.value = stock.symbol
  showResults.value = false
  await Promise.all([
    fetchMarketData(),
    fetchChartData(),
    updateRiskAnalysis()
  ])
}

const toggleInterval = () => {
  const currentIndex = intervals.indexOf(selectedInterval.value)
  const nextIndex = (currentIndex + 1) % intervals.length
  selectedInterval.value = intervals[nextIndex]
  fetchChartData()
}

const fetchMarketData = async () => {
  try {
    loading.value = true
    const [quoteData, companyData] = await Promise.all([
      getStockQuote(selectedSymbol.value),
      getCompanyInfo(selectedSymbol.value)
    ])
    marketData.value = quoteData
    companyInfo.value = companyData
  } catch (error) {
    console.error('Error fetching market data:', error)
  } finally {
    loading.value = false
  }
}

const fetchChartData = async () => {
  try {
    loading.value = true
    const data = await getStockCandles(selectedSymbol.value, selectedInterval.value)
    updateCharts(data)
  } catch (error) {
    console.error('Error fetching chart data:', error)
  } finally {
    loading.value = false
  }
}

const updateCharts = (data) => {
  if (!priceChartContainer.value || !volumeChartContainer.value) return

  // Clear previous charts
  priceChartContainer.value.innerHTML = ''
  volumeChartContainer.value.innerHTML = ''

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
  })

  const priceSeries = priceChart.addCandlestickSeries({
    upColor: '#26a69a',
    downColor: '#ef5350',
    borderVisible: false,
    wickUpColor: '#26a69a',
    wickDownColor: '#ef5350',
  })

  priceSeries.setData(data)

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
  })

  const volumeSeries = volumeChart.addHistogramSeries({
    color: '#26a69a',
    priceFormat: {
      type: 'volume',
    },
  })

  volumeSeries.setData(data.map(item => ({
    time: item.time,
    value: item.volume,
    color: item.close >= item.open ? '#26a69a' : '#ef5350'
  })))
}

const selectRiskLevel = async (risk) => {
  selectedRiskLevel.value = risk
  await updateRiskAnalysis()
}

const updateRiskAnalysis = async () => {
  if (!selectedSymbol.value) return

  try {
    const analysis = await analyzeStockRisk({
      symbol: selectedSymbol.value,
      investmentAmount: 10000, // Default investment amount
      riskLevel: selectedRiskLevel.value,
      category: selectedCategory.value
    })
    riskAnalysis.value = analysis
  } catch (error) {
    console.error('Error updating risk analysis:', error)
  }
}

const startBot = () => {
  if (!riskAnalysis.value) return

  // Emit event to parent component or use a store to manage bots
  console.log('Starting bot with configuration:', {
    symbol: selectedSymbol.value,
    category: selectedCategory.value,
    riskLevel: selectedRiskLevel.value,
    analysis: riskAnalysis.value
  })
}

// Formatting helpers
const formatPrice = (price) => {
  return price?.toFixed(2) ?? '0.00'
}

const formatVolume = (volume) => {
  if (volume >= 1000000) {
    return `${(volume / 1000000).toFixed(2)}M`
  }
  if (volume >= 1000) {
    return `${(volume / 1000).toFixed(2)}K`
  }
  return volume?.toString() ?? '0'
}

const formatMarketCap = (marketCap) => {
  if (marketCap >= 1000000000000) {
    return `$${(marketCap / 1000000000000).toFixed(2)}T`
  }
  if (marketCap >= 1000000000) {
    return `$${(marketCap / 1000000000).toFixed(2)}B`
  }
  if (marketCap >= 1000000) {
    return `$${(marketCap / 1000000000).toFixed(2)}M`
  }
  return `$${marketCap?.toFixed(2) ?? '0.00'}`
}

// Lifecycle
onMounted(() => {
  loadStocks()

  // Update charts on window resize
  window.addEventListener('resize', () => {
    if (priceChartContainer.value && volumeChartContainer.value) {
      fetchChartData()
    }
  })
})

watch(selectedInterval, () => {
  fetchChartData()
})
</script>

<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h2 class="text-2xl font-bold text-gray-900">US Stock Trading</h2>
      <div class="flex space-x-4">
        <!-- Category Selection -->
        <select
          v-model="selectedCategory"
          @change="handleCategoryChange"
          class="input-field w-40"
        >
          <option value="stock">Stocks</option>
          <option value="etf">ETFs</option>
          <option value="adr">ADRs</option>
          <option value="reit">REITs</option>
        </select>

        <!-- Search Input -->
        <div class="w-64 relative">
          <input
            type="text"
            v-model="searchQuery"
            @input="searchStocks"
            :placeholder="`Search ${selectedCategory}s...`"
            class="input-field"
          />
          <div v-if="showResults" class="absolute mt-1 w-full bg-white rounded-md shadow-lg z-50">
            <ul class="max-h-60 overflow-auto rounded-md py-1">
              <li
                v-for="stock in searchResults"
                :key="stock.symbol"
                @click="selectStock(stock)"
                class="px-4 py-2 hover:bg-emerald-50 cursor-pointer"
              >
                <div class="flex justify-between items-center">
                  <div>
                    <span class="font-medium">{{ stock.symbol }}</span>
                    <p class="text-sm text-gray-500 truncate">{{ stock.name }}</p>
                  </div>
                  <span class="text-xs text-gray-400 uppercase">{{ stock.type }}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <!-- Interval Selection -->
        <button
          @click="toggleInterval"
          class="btn-primary flex items-center space-x-2"
        >
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
        <!-- Price Chart -->
        <div class="bg-white rounded-lg shadow-lg p-4">
          <h3 class="text-lg font-semibold mb-4">Price Chart - {{ selectedSymbol }}</h3>
          <div ref="priceChartContainer" class="w-full h-[400px]"></div>
        </div>

        <!-- Volume Chart -->
        <div class="bg-white rounded-lg shadow-lg p-4">
          <h3 class="text-lg font-semibold mb-4">Volume Chart - {{ selectedSymbol }}</h3>
          <div ref="volumeChartContainer" class="w-full h-[400px]"></div>
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <!-- Market Overview -->
        <div class="bg-white rounded-lg shadow-lg p-6">
          <h3 class="text-lg font-semibold mb-4">Market Overview</h3>
          <div class="space-y-4">
            <div class="flex justify-between">
              <span class="text-gray-600">Price</span>
              <span class="font-semibold">${{ formatPrice(marketData.price) }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Change</span>
              <span :class="marketData.change >= 0 ? 'text-green-600' : 'text-red-600'">
                {{ formatPrice(marketData.change) }} ({{ formatPrice(marketData.changePercent) }}%)
              </span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Day High</span>
              <span class="font-semibold">${{ formatPrice(marketData.high) }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Day Low</span>
              <span class="font-semibold">${{ formatPrice(marketData.low) }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Volume</span>
              <span class="font-semibold">{{ formatVolume(marketData.volume) }}</span>
            </div>
          </div>
        </div>

        <!-- Company Info -->
        <div class="bg-white rounded-lg shadow-lg p-6">
          <h3 class="text-lg font-semibold mb-4">Company Info</h3>
          <div class="space-y-4">
            <div class="flex justify-between">
              <span class="text-gray-600">Market Cap</span>
              <span class="font-semibold">{{ formatMarketCap(companyInfo.marketCap) }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">P/E Ratio</span>
              <span class="font-semibold">{{ formatPrice(companyInfo.peRatio) }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">52W High</span>
              <span class="font-semibold">${{ formatPrice(companyInfo.high52) }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">52W Low</span>
              <span class="font-semibold">${{ formatPrice(companyInfo.low52) }}</span>
            </div>
          </div>
        </div>

        <!-- Trading Bot -->
        <div class="bg-white rounded-lg shadow-lg p-6">
          <h3 class="text-lg font-semibold mb-4">Trading Bot</h3>
          <div class="space-y-4">
            <div class="grid grid-cols-3 gap-2">
              <button
                v-for="risk in ['Low', 'Medium', 'High']"
                :key="risk"
                @click="selectRiskLevel(risk)"
                :class="[
                  'px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                  selectedRiskLevel === risk
                    ? 'bg-emerald-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                ]"
              >
                {{ risk }} Risk
              </button>
            </div>

            <div v-if="riskAnalysis" class="space-y-4">
              <div class="flex justify-between">
                <span class="text-gray-600">Entry Price</span>
                <span class="font-semibold">${{ formatPrice(riskAnalysis.entryPrice) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Target Price</span>
                <span class="font-semibold">${{ formatPrice(riskAnalysis.exitPrice) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Stop Loss</span>
                <span class="font-semibold text-red-600">${{ formatPrice(riskAnalysis.stopLoss) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Potential Profit</span>
                <span class="text-green-600">{{ formatPrice(riskAnalysis.targetProfit) }}%</span>
              </div>
              <p class="text-sm text-gray-600">{{ riskAnalysis.explanation }}</p>
            </div>

            <button
              @click="startBot"
              :disabled="!riskAnalysis"
              class="w-full py-2 px-4 rounded-lg text-white transition-colors"
              :class="riskAnalysis ? 'bg-emerald-500 hover:bg-emerald-600' : 'bg-gray-300 cursor-not-allowed'"
            >
              Start Trading Bot
            </button>
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
