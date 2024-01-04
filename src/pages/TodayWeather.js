import React, { useState, useEffect } from 'react'
import { useGrid } from '../contexts/GridContext'
import todayAxios from '../api/todayAxios'
import '../styles/todayCss.css'

const TodayWeather = () => {
  const { gridX, setGridX, gridY, setGridY } = useGrid()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)

  const today = new Date()
  const twoDigitsHour = today.getHours().toString().padStart(2, '0')
  const currentHours = twoDigitsHour.padEnd(4, '0')
  const getBaseDate = () => {
    const yesterday = new Date(today.setDate(today.getDate() - 1))

    const year = yesterday.getFullYear()
    const month = (yesterday.getMonth() + 1).toString().padStart(2, '0')
    const day = today.getDate().toString().padStart(2, '0')

    return `${year + month + day}`
  }
  const currentBaseDate = getBaseDate()

  // API 데이터 호출
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const response = await todayAxios.get('getVilageFcst', {
          params: {
            numOfRows: 290,
            base_date: currentBaseDate,
            base_time: '2300',
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
  }, [currentBaseDate, gridX, gridY])

  // 로딩 설정
  if (loading) {
    return <p>대기중</p>
  }
  if (!data) {
    return null
  }

  // 데이터 필터
  const weatherValue = data?.response?.body?.items?.item?.map((item) => item) || []
  const selectCategories = ['TMP', 'WSD', 'SKY', 'PTY', 'POP', 'PCP', 'SNO', 'TMN', 'TMX']
  const filteredWeatherValue = weatherValue.filter((item) =>
    selectCategories.includes(item.category)
  )

  // 전달받은 데이터 처리
  const DailyWeatherContents = () => {
    // 데이터 그릅화 & 형태 변경
    const formattedWeatherData = []
    for (const item of filteredWeatherValue) {
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
        return Math.floor(fcstValue) + `\u00B0`
      } else if (category === 'WSD') {
        return fcstValue + 'm/s'
      } else if (category === 'SKY') {
        if (fcstValue === '1') {
          return (
            <>
              <img src="/images/sunny.png" alt="sunny" title="맑음" width={50} height={50} />
              <p>맑음</p>
            </>
          )
        } else if (fcstValue === '3') {
          return (
            <>
              <img
                src="/images/lot_clouds.png"
                alt="clouds"
                title="구름 많음"
                width={50}
                height={50}
              />
              <p>구름 많음</p>
            </>
          )
        } else if (fcstValue === '4') {
          return (
            <>
              <img src="/images/cloudy_gray.png" alt="cloudy" title="흐림" width={50} height={50} />
              <p>흐림</p>
            </>
          )
        } else {
          return fcstValue
        }
      } else if (category === 'PTY') {
        if (fcstValue === '0') {
          return '없음'
        } else if (fcstValue === '1') {
          return (
            <>
              <img src="/images/rain.png" alt="rain" title="비" width={50} height={50} />
              <p>비</p>
            </>
          )
        } else if (fcstValue === '2') {
          return (
            <>
              <img
                src="/images/rain_or_snow.png"
                alt="rain_or_snow"
                title="비 또는 눈"
                width={50}
                height={50}
              />
              <p>비 또는 눈</p>
            </>
          )
        } else if (fcstValue === '3') {
          return (
            <>
              <img src="/images/snow.png" alt="snow" title="눈" width={50} height={50} />
              <p>눈</p>
            </>
          )
        } else if (fcstValue === '4') {
          return (
            <>
              <img src="/images/shower.png" alt="shower" title="소나기" width={50} height={50} />
              <p>소나기</p>
            </>
          )
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
        return <>{item.PCP}</>
      }

      if (item.SNO !== '적설없음') {
        return <>{item.SNO}</>
      }

      if (item.PCP !== '강수없음' && item.SNO !== '적설없음') {
        return (
          <>
            {item.PCP} / {item.SNO}
          </>
        )
      }

      return null
    }

    // 기상 상태 (하늘 상태와 강수 형태)
    function renderState(item) {
      if (item.PTY === '없음') {
        return <>{item.SKY}</>
      } else {
        return <>{item.PTY}</>
      }
    }

    // 시간 형식 변경
    function formattedTime(item) {
      return <>{parseInt(item.fcstTime.slice(0, 2), 10)}</>
    }

    // 현재 시간의 온도와 기상상태
    const CurrentState = () => {
      const currentTmp = weatherData
        .filter((item) => item.fcstTime === currentHours)
        .map((item) => item.TMP)

      const currentSky = weatherData
        .filter((item) => item.fcstTime === currentHours)
        .map((item) =>
          item.PTY === '없음'
            ? item.SKY.props.children[1].props.children
            : item.PTY.props.children[1].props.children
        )

      return (
        <>
          <h2>{currentTmp}</h2>
          <p>{currentSky}</p>
        </>
      )
    }

    // 최저 & 최고 온도 컴포넌트
    const AverageItem = () => {
      const minItem = weatherData.map((item) => item.TMN)
      const maxItem = weatherData.map((item) => item.TMX)

      return (
        <p>
          최저 <span>{minItem}</span> / 최고 <span>{maxItem}</span>
        </p>
      )
    }

    // 날씨 컴포넌트
    const WeatherItem = ({ item }) => {
      const current = item.fcstTime === currentHours ? 'current' : ''
      return (
        <div key={item.fcstDate + item.fcstTime} className={`weather-item ${current}`}>
          <p>{formattedTime(item)}시</p>
          <div>{renderState(item)}</div>
          <p>{item.TMP}</p>
          <p>
            강수 확률 <br />
            {item.POP}
          </p>
          {renderAmount(item) !== null && <p>{renderAmount(item)}</p>}
          <p>
            풍속 <br />
            {item.WSD}
          </p>
        </div>
      )
    }

    // 요일 변환 컴포넌트
    const TodayLabel = () => {
      if (!weatherData || weatherData.length === 0 || !weatherData[0].fcstDate) {
        return <p>대기중</p>
      }

      const dateObj = weatherData[0].fcstDate
      const formattedDay = new Date(
        dateObj.slice(0, 4),
        dateObj.slice(4, 6) - 1,
        dateObj.slice(6, 8)
      )
      const days = ['일', '월', '화', '수', '목', '금', '토']
      const getDay = days[formattedDay.getDay()]

      return (
        <>
          <h4>
            {parseInt(dateObj.slice(6, 8), 10)}일 {getDay}요일
          </h4>
        </>
      )
    }

    return (
      <div className="today-weather-wrap">
        <div className="label-wrap">
          <div>
            <TodayLabel />
          </div>
          <div>
            <CurrentState />
          </div>
          <div>
            <AverageItem />
          </div>
        </div>
        <div className="weather-item-wrap">
          {weatherData.map((item) => (
            <WeatherItem key={item.fcstDate + item.fcstTime} item={item} />
          ))}
        </div>
      </div>
    )
  }

  return (
    <>
      <DailyWeatherContents />
    </>
  )
}

export default TodayWeather
