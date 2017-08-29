import axios from 'axios'
var base = 'https://api.npmjs.org/downloads/range/'

export function getDownloads (data) {
  return axios({
    method: 'get',
    url: base + data.period + '/' + data.pack
  })
}
