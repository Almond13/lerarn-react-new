import React, { useState, useEffect } from 'react'
import axios from 'axios'
import SearchLocation from './pages/SearchLocation'

function App() {
  const DailyWeatherContents = () => {
    const URL = 'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst'
    const apiKey =
      'GZESRP566LcNCPwNTe8yrfgMuVauLZgkpYOaXUmzc1uZawXViCMz+hKr2tfC9o0iQcr94cgHCXNr3ghe8Tu3FQ=='
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)

    const getBaseDate = () => {
      const today = new Date()
      const yesterday = new Date(today.setDate(today.getDate() - 1))

      const year = yesterday.getFullYear()
      const month = (yesterday.getMonth() + 1).toString().padStart(2, '0')
      const day = today.getDate().toString().padStart(2, '0')

      return `${year + month + day}`
    }
    const currentBaseDate = getBaseDate()

    useEffect(() => {
      // API 데이터 호출
      const fetchData = async () => {
        setLoading(true)
        try {
          const response = await axios.get(URL, {
            params: {
              serviceKey: apiKey,
              numOfRows: 290,
              dataType: 'JSON',
              pageNo: 1,
              base_date: 20231219,
              base_time: '2000',
              nx: gridX,
              ny: gridY
            }
          })
          setData(response.data)
        } catch (e) {
          console.log(e)
        }
        setLoading(false)
      }
      fetchData()
    }, [currentBaseDate])

    // 데이터 필터
    const weatherValue = data?.response?.body?.items?.item?.map((item) => item) || []
    const selectCategories = ['TMP', 'WSD', 'SKY', 'PTY', 'POP', 'PCP', 'SNO', 'TMN', 'TMX']

    const filteredWeatherValue = weatherValue.filter((item) =>
      selectCategories.includes(item.category)
    )

    // 로딩 설정
    if (loading) {
      return <p>대기중</p>
    }
    if (!data) {
      return null
    }

    return <DailyWeatherData data={filteredWeatherValue} />
  }

  const DailyWeatherData = ({ data }) => {
    // 데이터 그릅화 & 형태 변경
    const formattedWeatherData = []
    for (const item of data) {
      const { fcstDate, fcstTime, category, fcstValue } = item

      if (!formattedWeatherData[fcstDate + fcstTime]) {
        formattedWeatherData[fcstDate + fcstTime] = { fcstDate, fcstTime }
      }

      formattedWeatherData[fcstDate + fcstTime][category] = redefinedValue(category, fcstValue)
    }
    const weatherData = Object.values(formattedWeatherData)

    // 출력 형식 정의
    function redefinedValue(category, fcstValue) {
      if (category === 'POP') {
        return fcstValue + '%'
      } else if (category === 'TMP' || category === 'TMN' || category === 'TMX') {
        return fcstValue + `\u00B0`
      } else if (category === 'WSD') {
        return fcstValue + 'm/s'
      } else if (category === 'SKY') {
        if (fcstValue === '1') {
          return '맑음'
        } else if (fcstValue === '3') {
          return '구름 많음'
        } else if (fcstValue === '4') {
          return '흐림'
        } else {
          return fcstValue
        }
      } else if (category === 'PTY') {
        if (fcstValue === '0') {
          return '없음'
        } else if (fcstValue === '1') {
          return '비'
        } else if (fcstValue === '2') {
          return '비 또는 눈'
        } else if (fcstValue === '3') {
          return '눈'
        } else if (fcstValue === '4') {
          return '소나기'
        } else {
          return fcstValue
        }
      } else {
        return fcstValue
      }
    }

    // 강수량과 적설량 출력 여부 정의
    function renderAmount(item) {
      if (item.PCP !== '강수없음') {
        return <p>{item.PCP}</p>
      }

      if (item.SNO !== '적설없음') {
        return <p>{item.SNO}</p>
      }

      if (item.PCP !== '강수없음' && item.SNO !== '적설없음') {
        return (
          <p>
            {item.PCP} / {item.SNO}
          </p>
        )
      }

      return null
    }

    function renderState(item) {
      if (item.PTY === '없음') {
        return <p>{item.SKY}</p>
      }

      return (
        <p>
          {item.SKY} / {item.PTY}
        </p>
      )
    }

    // 최저 & 최고 온도 필터
    const averageData = weatherData.filter((item) => item.TMN || item.TMX)
    const minItem = averageData.map((item) => item.TMN)
    const maxItem = averageData.map((item) => item.TMX)

    // 최저 & 최고 온도 컴포넌트
    const AverageItem = ({ minItem, maxItem }) => (
      <p>
        {minItem} / {maxItem}
      </p>
    )

    // 날씨 컴포넌트
    const WeatherItem = ({ item }) => (
      <div key={item.fcstDate + item.fcstTime}>
        <p>{item.fcstDate}</p>
        <p>{item.fcstTime}</p>
        {renderState(item)}
        <p>{item.TMP}</p>
        <p>{item.WSD}</p>
        <p>{item.POP}</p>
        {renderAmount(item)}
      </div>
    )

    return (
      <div>
        <div>
          <AverageItem minItem={minItem} maxItem={maxItem} />
        </div>
        <div>
          {weatherData.map((item) => (
            <WeatherItem key={item.fcstDate + item.fcstTime} item={item} />
          ))}
        </div>
      </div>
    )
  }

  const [gridX, setGridX] = useState('60')
  const [gridY, setGridY] = useState('127')

  return (
    <div className="App">
      <div>
        <SearchLocation gridSet={{ setGridX, setGridY }} />
        <DailyWeatherContents />
      </div>
    </div>
  )
}

export default App
