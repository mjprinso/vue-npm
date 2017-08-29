import Datepicker from 'vuejs-datepicker'
import LineChart from '@/components/chart/LineChart'
import { dateToYear, dateToMonth, dateToWeek, dateToDay, dateBeautify } from '@/utils/dateFormatter'
import * as format from '@/utils/downloadFormatter'
import {getDownloads} from '@/utils/services'

export default {
  name: 'npmcharts2',
  data () {
    return {
      msg: 'npm package\'s download stats vuejs App',
      rawData: '',
      downloads: [],
      downloadsYear: [],
      downloadsMonth: [],
      downloadsWeek: [],
      labels: [],
      labelsYear: [],
      labelsMonth: [],
      labelsWeek: [],
      totalDownloads: '',
      bootstrapStyling: true,
      btn: true,
      btnIcon: 'fa fa-calendar',
      periodStart: '',
      periodEnd: '',
      periodEndheck: new Date(),
      errorEnd: false,
      packageName: '',
      packageInfo: '',
      startDate: '',
      endDate: '',
      loaded: false,
      loadStats: true,
      error: false,
      errorMessage: false,
      errDate: false,
      errRange: false,
      disabled: {}
    }
  },
  components: {
    'LineChart': LineChart,
    'Datepicker': Datepicker
  },
  computed: {
    _endDate () {
      return dateToDay(this.periodEnd)
    },
    _startDate () {
      return dateToDay(this.periodStart)
    },
    period () {
      return `${this._startDate}:${this._endDate}`
    },
    formattedPeriod () {
      return this.periodStart ? `${dateBeautify(this._startDate)} to ${dateBeautify(this._endDate)}` : 'last-month'
    },
    disableDate () {
      this.disabled.from = this.periodEndheck
      if (this.periodStart !== '' || this.periodStart !== undefined) {
        this.disabled.to = this.periodStart
      }
      return this.disabled
    }
  },
  methods: {
    getPackageStats (pack, start, end) {
      this.resetLoaders()
      if (start === undefined || end === undefined || start === '' || end === '') {
        this.errDate = true
        this.loadStats = true
      } else if (start > end) {
        this.errRange = true
        this.loadStats = true
      } else if (end > this.periodEndheck) {
        this.errorEnd = true
        this.loadStats = true
      } else {
        this.errDate = false
        var data = { period: this.period, pack: pack }
        getDownloads(data).then(response => {
          this.rawData = response.data.downloads
          this.downloads = response.data.downloads.map(entry => entry.downloads)
          this.labels = response.data.downloads.map(entry => entry.day)
          this.packageInfo = response.data.package
          this.totalDownloads = this.downloads.reduce((total, download) => total + download)
          this.groupDataByDate()
          this.loaded = true
          this.loadStats = true
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
    },
    groupDataByDate () {
      this.formatYear()
      this.formatMonth()
      this.formatWeek()
    },
    formatYear () {
      this.labelsYear = this.rawData
        .map(entry => dateToYear(entry.day))
        .reduce(format.removeDuplicate, [])
      this.downloadsYear = format.groupData(this.rawData, dateToYear)
    },
    formatMonth () {
      this.labelsMonth = this.rawData
        .map(entry => dateToMonth(entry.day))
        .reduce(format.removeDuplicate, [])
      this.downloadsMonth = format.groupData(this.rawData, dateToMonth)
    },
    formatWeek () {
      this.labelsWeek = this.rawData
        .map(entry => dateToWeek(entry.day))
        .reduce(format.removeDuplicate, [])
      this.downloadsWeek = format.groupData(this.rawData, dateToWeek)
    },
    resetLoaders () {
      this.errDate = false
      this.errRange = false
      this.loaded = false
      this.loadStats = false
      this.error = false
    }
  }
}
