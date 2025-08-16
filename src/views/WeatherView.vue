<template>
  <div class="container">
    <div class="header">
      <h1>WEATHER APP</h1>
      <div class="search-bar">
        <input type="text" v-model="city" placeholder="Enter city name" class="search-input" />
        <button @click="searchByCity" class="search-button">Search</button>
        <br /><br />
        Please implement "Search Weather by City".
      </div>
    </div>

    <!-- 显示天气数据的部分 -->
    <main>
      <div v-if="weatherData">
        <h2>{{ weatherData.name }}, {{ weatherData.sys.country }}</h2>
        <div>
          <img :src="iconUrl" alt="Weather Icon" />
          <p>{{ temperature }} °C</p>
        </div>
        <span>{{ weatherData.weather[0].description }}</span>
      </div>
    </main>
  </div>
</template>

<script>
import axios from 'axios'

const apikey = '2c33627ba5ba9aaa261909b17ca4915a'

export default {
  name: 'WeatherView',
  data() {
    return {
      city: '',
      weatherData: null,
      hourlyForecast: [],
      dailyForecast: []
    }
  },
  computed: {
    // 计算摄氏温度
    temperature() {
      return this.weatherData ? Math.floor(this.weatherData.main.temp - 273) : null
    },
    // 获取天气图标URL
    iconUrl() {
      return this.weatherData
        ? `https://api.openweathermap.org/img/w/${this.weatherData.weather[0].icon}.png`
        : null
    }
  },
  // 组件挂载时获取当前位置天气
  mounted() {
    this.fetchCurrentLocationWeather()
  },
  methods: {
    // 获取当前位置天气
    async fetchCurrentLocationWeather() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords
          const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}`
          await this.fetchWeatherData(url)
        })
      }
    },

    // 通过城市名搜索天气
    async searchByCity() {
      if (this.city.trim()) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${apikey}`
        await this.fetchWeatherData(url)
      }
    },

    // 获取天气数据
    async fetchWeatherData(url) {
      try {
        const response = await axios.get(url)
        this.weatherData = response.data
      } catch (error) {
        console.error('Error fetching weather data:', error)
      }
    }
  }
}
</script>
