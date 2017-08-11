<template>
    <div>        
        <div class="logos">
            <br>
            <center>
                <img src="../../assets/logo.png" class="vlogo">
                <img src="../../assets/npm.png" class="vlogo">
            </center>
        </div>
        
        <h4 class="text-center">{{msg}}</h4> 
        <br>
        <div class="row">
          <div class="col-md-4 col-sm-12 col-xs-12 col-md-offset-4">
            <form role="form" @submit.prevent="getPackageStats(packageName)">
              <div class="input-group">
                  <input type="text" id="search" v-model="packageName" class="form-control" placeholder="Type npm package name" required>
                  <span class="input-group-btn">
                    <button type="submit" class="btn btn-success btn-md" v-if="loadStats">
                        <i class="fa fa-search"></i>
                    </button>
                    <button type="button" disabled class="btn btn-success btn-md" v-else>
                        <i class="fa fa-spinner fa-spin"></i>
                    </button>
                </span>
              </div> <!-- form-group -->
            </form>
            <br>
            <div class="row" v-if="error">
              <div class="alert alert-danger fade in">
                <h4><i class="fa fa-warning fa-lg">&nbsp; </i>Ooops</h4>
                <h5>{{ errorMessage }} </h5>  
              </div>
            </div>

          </div>
          
        </div>

        
        <div class="row" v-if="loaded">
          <h5 class="title text-center">{{ packageNameSel }} downloads per day from {{ periodStart }} to {{periodEnd}}</h5>
          <hr>
          <div class="col-md-10 col-md-offset-1 col-sm-12 col-xs-12">
            <LineChart :chartData="downloads" :chartLabels="labels" style="height:40px;"></LineChart>
          </div>
        </div>
      </div>
</template>

<script>
import axios from 'axios'
import LineChart from '@/components/npm-chart/LineChart'

export default {
  name: 'npmcharts',
  data () {
    return {
      msg: 'Welcome to Vue.js npm packages chart App',
      downloads: [],
      labels: [],
      period: 'last-month',
      periodStart: '',
      periodEnd: '',
      packageName: '',
      packageNameSel: '',
      loaded: false,
      loadStats: true,
      error: false
    }
  },
  components: {
    'LineChart': LineChart
  },
  computed: {},
  methods: {
    getPackageStats (packageName) {
      this.loaded = false
      this.loadStats = false
      this.error = false
      axios.get(`https://api.npmjs.org/downloads/range/${this.period}/${packageName}`)
      .then(response => {
        this.downloads = response.data.downloads.map(download => download.downloads)
        this.labels = response.data.downloads.map(download => download.day)
        this.packageName = response.data.package
        this.periodStart = response.data.start
        this.periodEnd = response.data.end
        this.loaded = true
        this.loadStats = true
        this.packageNameSel = packageName
      })
      .catch(err => {
        this.loadStats = true
        this.loaded = false
        if (err.response === undefined) {
          this.errorMessage = 'Network error'
          this.error = true
        } else {
          this.errorMessage = err.response.data.error
          this.error = true
        }
      })
    }
  }
}
</script>

<style>
 
</style>
