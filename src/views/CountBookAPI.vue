<template>
  <div class="container mt-4">
    <h1 class="mb-4">Count Book API</h1>

    <!-- 加载状态 -->
    <div v-if="loading" class="text-center">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <p>Loading authors data...</p>
    </div>

    <!-- 错误状态 -->
    <div v-if="error" class="alert alert-danger">
      {{ error }}
    </div>

    <!-- API响应数据 -->
    <div v-if="apiResponse" class="api-response">
      <h3>API Response:</h3>
      <pre class="bg-light p-3 border rounded">{{ JSON.stringify(apiResponse, null, 2) }}</pre>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
// 直接导入 JSON 文件
import authorsData from '@/assets/json/authors.json'

const authors = ref([])
const loading = ref(false)
const error = ref(null)
const apiResponse = ref(null)
const authorsCount = ref(0)
const totalBooks = ref(0)

const calculateStats = () => {
  authorsCount.value = authors.value.length
  totalBooks.value = authors.value.reduce((total, author) => {
    return total + author.famousWorks.length
  }, 0)
}

const getApiData = async () => {
  loading.value = true
  error.value = null

  try {
    // 直接使用导入的数据，不需要 fetch
    authors.value = authorsData

    calculateStats()

    // 构建API响应格式
    apiResponse.value = {
      success: true,
      data: {
        authorsCount: authorsCount.value,
        totalBooks: totalBooks.value,
        authors: authors.value.map((author) => ({
          name: author.name,
          bookCount: author.famousWorks.length
        }))
      },
      timestamp: new Date().toISOString()
    }
  } catch (err) {
    error.value = `Error loading authors data: ${err.message}`
    console.error('Error loading authors data:', err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  getApiData()
})

defineExpose({
  getApiData
})
</script>

<style scoped>
.api-response {
  margin-top: 20px;
}

pre {
  max-height: 400px;
  overflow-y: auto;
  font-size: 0.9em;
}

.container {
  max-width: 1200px;
}
</style>
