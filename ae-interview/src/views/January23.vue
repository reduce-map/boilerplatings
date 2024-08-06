<template>
    <div class="home-view">
        <h1>
            January 23
        </h1>

        <p>Latitude, Longitude</p>
        <p>{{ geoData.latitude }} {{ geoData.longitude }}</p>

        <Chart :chart-data="chartData" />
        <GmapMap
            :center="{ lat: geoData.latitude, lng: geoData.longitude }"
            :zoom="8"
            map-type-id="terrain"
            style="width: 500px; height: 300px"
            @click="updateGeoData"
        />
    </div>
</template>

<script>
// import { mapActions, mapGetters } from 'vuex'
import WeatherService from '@/services/weather-service'
import Chart from '@/components/chart.vue'

export default {
    name: 'January23',
    components: {
        Chart,
    },
    data() {
        return {
            chartData: {},
            geoData: {
                latitude: 52.2,
                longitude: 4.5,
            },
            weatherData: {},
        }
    },
    watch: {
        geoData: {
            immediate: true,
            // deep: true,
            handler: 'fetch',
        },
    },
    async mounted() {
        await this.fetch()
    },
    methods: {
        // ...mapActions('images', [
        //     'getImageDetails',
        //     'getNextImageDetails',
        //     'getPrevImageDetails',
        // ]),
        async fetch() {
            if (this.isGeoValid(this.geoData)) {
                this.weatherData = await WeatherService.getWeather(
                    this.buildWeatherUrl(this.geoData)
                )
                console.log(`
                    weatherData updated
                    ${this.weatherData}
                `)

                this.chartData = {
                    datasets: this.getChartDataSets(this.weatherData.hourly),
                    labels: this.weatherData.hourly.time,
                }
            } else {
                console.log(`
                    Check pls latitude and longitude
                    ${this.weatherData}
                `)
            }
        },
        async updateGeoData(event) {
            this.geoData.latitude = Number(event?.latLng?.lat().toFixed(2))
            this.geoData.longitude = Number(event?.latLng?.lng().toFixed(2))
        },

        // utils -> move after pure
        buildWeatherUrl({ latitude, longitude }) {
            const options = '&hourly=temperature_2m,apparent_temperature,rain'
            return `/forecast?latitude=${latitude}&longitude=${longitude}${options}`
        },
        isGeoValid({ latitude, longitude }) {
            // const isValidReq = [this.geoData.latitude, this.geoData.longitude].filter(e => !!e).length > 0
            return !!latitude && !!longitude
        },

        getChartDataSets(hourlyData) {
            return Object.keys(hourlyData)
                .filter(type => type !== 'time')
                .map(key => {
                    const color = this.getRandomColor()
                    console.log(color)
                    return {
                        label: key,
                        backgroundColor: color,
                        data: hourlyData[key],
                    }
                })
        },

        getRandomColor() {
            const letters = '0123456789ABCDEF'
            let color = '#'
            for (let i = 0; i < 5; i++) {
                color += letters[Math.floor(Math.random() * 16)]
            }
            return color
        },
    },
}
</script>
