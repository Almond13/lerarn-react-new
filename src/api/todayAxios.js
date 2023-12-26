import axios from 'axios'
const apiKey = process.env.REACT_APP_SHORT_WEATHER_KEY

const todayAxios = axios.create({
  baseURL: 'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/',
  params: {
    serviceKey: apiKey,
    dataType: 'JSON',
    pageNo: 1
  }
})

export default todayAxios
